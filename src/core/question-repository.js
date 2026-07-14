export class QuestionRepository {
  constructor(questions, seed = Date.now()) {
    this.questions = questions;
    this.recent = [];
    this.seed = seed >>> 0;
  }

  next(region, excluded = []) {
    const blocked = new Set([...excluded, ...this.recent.slice(-3)]);
    const score = (question) => {
      let value = 0;
      if (region.difficulties.includes(question.difficulty)) value += 5;
      const styleIndex = region.styles.findIndex((style) => question.styles.includes(style));
      if (styleIndex >= 0) value += Math.max(1, 4 - styleIndex);
      if (!blocked.has(question.id)) value += 6;
      return value;
    };
    const ranked = this.questions.map((question) => ({ question, score: score(question), tie: this.#random() })).sort((a, b) => b.score - a.score || b.tie - a.tie);
    const selected = ranked[0]?.question;
    if (!selected) throw new Error("Não há perguntas disponíveis.");
    this.recent.push(selected.id);
    return selected;
  }

  #random() {
    this.seed = (1664525 * this.seed + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
}
