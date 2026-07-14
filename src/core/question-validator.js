const DIFFICULTIES = new Set(["easy", "medium", "hard"]);
const STYLES = new Set([
  "concept", "memorization", "literalness", "interpretation", "comparison",
  "application", "practical_case", "calculation", "exception", "trick",
  "association", "sequence", "interdisciplinary"
]);
const ALT_IDS = ["A", "B", "C", "D", "E"];

export function validateQuestionPack(pack) {
  const errors = [];
  const warnings = [];
  if (!pack || typeof pack !== "object" || Array.isArray(pack)) {
    return { valid: false, errors: ["A raiz do arquivo deve ser um objeto JSON."], warnings, validQuestions: [] };
  }
  if (pack.format_version !== "1.0") errors.push("format_version deve ser '1.0'.");
  for (const field of ["package_id", "title", "language", "generated_at"]) {
    if (typeof pack[field] !== "string" || !pack[field].trim()) errors.push(`Campo obrigatório ausente: ${field}.`);
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(pack.package_id || "")) errors.push("package_id deve usar letras minúsculas, números e hífens.");
  if (!Array.isArray(pack.subjects) || pack.subjects.length === 0) errors.push("subjects deve conter ao menos uma matéria.");
  if (!Array.isArray(pack.questions) || pack.questions.length === 0) errors.push("questions deve conter ao menos uma questão.");

  const seenIds = new Set();
  const prompts = new Set();
  const validQuestions = [];
  for (const [index, question] of (pack.questions || []).entries()) {
    const prefix = `Questão ${index + 1}`;
    const questionErrors = [];
    if (!question?.id || !/^[a-z0-9][a-z0-9-]*$/.test(question.id)) questionErrors.push(`${prefix}: id inválido.`);
    if (seenIds.has(question?.id)) questionErrors.push(`${prefix}: id duplicado '${question.id}'.`);
    seenIds.add(question?.id);
    for (const field of ["subject", "topic", "prompt", "correct_explanation"]) {
      if (typeof question?.[field] !== "string" || !question[field].trim()) questionErrors.push(`${prefix}: campo ${field} ausente.`);
    }
    if (!DIFFICULTIES.has(question?.difficulty)) questionErrors.push(`${prefix}: difficulty inválida.`);
    if (!Array.isArray(question?.styles) || question.styles.length === 0 || question.styles.some((style) => !STYLES.has(style))) {
      questionErrors.push(`${prefix}: styles ausente ou inválido.`);
    }
    if (!Array.isArray(question?.alternatives) || question.alternatives.length !== 5) {
      questionErrors.push(`${prefix}: deve haver exatamente cinco alternativas.`);
    } else {
      const ids = question.alternatives.map((item) => item?.id);
      if (ALT_IDS.some((id) => !ids.includes(id)) || new Set(ids).size !== 5) questionErrors.push(`${prefix}: alternativas devem usar A, B, C, D e E sem repetição.`);
      for (const alternative of question.alternatives) {
        for (const field of ["card_name", "description", "explanation"]) {
          if (typeof alternative?.[field] !== "string" || !alternative[field].trim()) questionErrors.push(`${prefix}/${alternative?.id || "?"}: ${field} ausente.`);
        }
        if ((alternative?.card_name || "").length > 80) warnings.push(`${prefix}/${alternative.id}: nome da carta tem mais de 80 caracteres.`);
      }
      const normalized = question.alternatives.map((item) => item.description?.trim().toLocaleLowerCase("pt-BR"));
      if (new Set(normalized).size !== normalized.length) warnings.push(`${prefix}: há alternativas repetidas.`);
    }
    if (!ALT_IDS.includes(question?.correct_alternative)) questionErrors.push(`${prefix}: correct_alternative inválida.`);
    if (!question?.hint) warnings.push(`${prefix}: dica ausente; Consulta Arcana não estará disponível.`);
    if (!question?.source_reference) warnings.push(`${prefix}: referência de origem ausente.`);
    const normalizedPrompt = question?.prompt?.trim().toLocaleLowerCase("pt-BR");
    if (prompts.has(normalizedPrompt)) warnings.push(`${prefix}: possível enunciado duplicado.`);
    prompts.add(normalizedPrompt);
    errors.push(...questionErrors);
    if (questionErrors.length === 0) validQuestions.push(question);
  }

  const counts = Object.fromEntries([...DIFFICULTIES].map((key) => [key, validQuestions.filter((q) => q.difficulty === key).length]));
  if (validQuestions.length < 40) warnings.push(`Pacote com ${validQuestions.length} questões: abaixo do mínimo recomendado de 40 para a campanha completa.`);
  if (counts.hard < 8) warnings.push(`A região final recomenda ao menos 8 questões difíceis; foram encontradas ${counts.hard}.`);
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    validQuestions,
    summary: { total: pack.questions?.length || 0, valid: validQuestions.length, invalid: (pack.questions?.length || 0) - validQuestions.length, difficulty: counts }
  };
}
