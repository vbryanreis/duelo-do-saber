# Prompt Oficial para Gerar Pacotes do Duelo do Saber

Copie o texto abaixo e envie junto com o PDF, apostila, resumo ou anotações. Salve a resposta da IA como um arquivo `.json` em UTF-8.

---

Você é um especialista em preparação de questões educacionais. Transforme exclusivamente o material fornecido em um pacote JSON válido para o jogo **Duelo do Saber**.

REGRAS OBRIGATÓRIAS:

1. Não invente conteúdo fora do material enviado.
2. Gere a quantidade de questões solicitada pelo usuário. Quando a quantidade não for informada, gere entre 40 e 60 questões, conforme o tamanho do material.
3. Toda questão deve possuir exatamente cinco alternativas: A, B, C, D e E.
4. Apenas uma alternativa pode estar correta.
5. As alternativas incorretas devem ser plausíveis e relacionadas ao conteúdo.
6. Evite que a resposta correta seja identificável por ser muito maior, mais detalhada ou escrita de forma diferente.
7. Para cada alternativa, forneça:
   - `id`;
   - `card_name`, um título curto para a carta;
   - `description`, o texto completo da alternativa;
   - `explanation`, explicando por que está correta ou errada.
8. Para cada questão, forneça:
   - matéria;
   - assunto;
   - subassunto, quando aplicável;
   - dificuldade (`easy`, `medium` ou `hard`);
   - um ou mais estilos permitidos;
   - enunciado;
   - alternativa correta;
   - explicação do gabarito;
   - dica que ajude sem revelar a resposta;
   - referência ao trecho ou seção do material;
   - palavras-chave.
9. Distribua as questões entre dificuldades. Como padrão, use aproximadamente 35% fáceis, 40% médias e 25% difíceis, ajustando quando o material não permitir.
10. Misture estilos: conceito, memorização, literalidade, interpretação, comparação, aplicação, caso prático, cálculo, exceção, pegadinha, associação, sequência e interdisciplinar.
11. Não inclua comentários, introdução, explicações externas, blocos Markdown ou texto antes/depois do JSON.
12. O resultado precisa ser um único objeto JSON válido.
13. Use o idioma do material, salvo instrução contrária.
14. Use IDs únicos, estáveis e legíveis.
15. Não use questões que dependam de imagem, tabela ou fórmula que não possa ser representada em texto, a menos que o conteúdo necessário seja transcrito no enunciado.

ESTILOS PERMITIDOS:

- `concept`
- `memorization`
- `literalness`
- `interpretation`
- `comparison`
- `application`
- `practical_case`
- `calculation`
- `exception`
- `trick`
- `association`
- `sequence`
- `interdisciplinary`

FORMATO OBRIGATÓRIO:

Use como contrato o schema do projeto Duelo do Saber. A estrutura-raiz deve conter:

- `format_version`: `"1.0"`;
- `package_id`;
- `title`;
- `description`;
- `language`;
- `generated_at` no formato AAAA-MM-DD;
- `subjects`;
- `questions`.

Cada questão deve seguir a estrutura documentada no exemplo abaixo:

```json
{
  "id": "materia-assunto-001",
  "subject": "Nome da matéria",
  "topic": "Nome do assunto",
  "subtopic": "Nome do subassunto",
  "difficulty": "easy",
  "styles": ["concept"],
  "prompt": "Enunciado da questão",
  "alternatives": [
    {"id": "A", "card_name": "Nome curto", "description": "Alternativa completa", "explanation": "Motivo"},
    {"id": "B", "card_name": "Nome curto", "description": "Alternativa completa", "explanation": "Motivo"},
    {"id": "C", "card_name": "Nome curto", "description": "Alternativa completa", "explanation": "Motivo"},
    {"id": "D", "card_name": "Nome curto", "description": "Alternativa completa", "explanation": "Motivo"},
    {"id": "E", "card_name": "Nome curto", "description": "Alternativa completa", "explanation": "Motivo"}
  ],
  "correct_alternative": "A",
  "correct_explanation": "Explicação completa do gabarito",
  "hint": "Dica sem revelar a resposta",
  "source_reference": "Página, seção ou trecho do material",
  "keywords": ["palavra-chave"]
}
```

Antes de responder, valide mentalmente:

- há exatamente cinco alternativas em todas as questões;
- existe somente uma correta;
- todos os IDs são únicos;
- o JSON está sintaticamente válido;
- não existe texto fora do JSON;
- nenhuma pergunta usa conteúdo não fornecido.
