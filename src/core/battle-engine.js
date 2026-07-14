const MAX_HP = 8000;
const HIT_DAMAGE = 1000;
const ENERGY_MAX = 5;
const ERROR_DAMAGE = { easy: 1000, medium: 2000, hard: 4000 };

export const ABILITIES = {
  vision: { name: "Visão do Sábio", cost: 2, limit: 2 },
  hint: { name: "Consulta Arcana", cost: 2, limit: 2 },
  shield: { name: "Escudo da Memória", cost: 2, limit: 1 },
  secondChance: { name: "Segunda Chance", cost: 3, limit: 1 },
  focus: { name: "Concentração Absoluta", cost: 3, limit: 1 }
};

export class BattleEngine {
  constructor(difficulty = "medium") {
    if (!ERROR_DAMAGE[difficulty]) throw new Error("Dificuldade de combate inválida.");
    this.difficulty = difficulty;
    this.playerHp = MAX_HP;
    this.rivalHp = MAX_HP;
    this.energy = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correct = 0;
    this.wrong = 0;
    this.presented = 0;
    this.status = "active";
    this.shieldArmed = false;
    this.secondChanceArmed = false;
    this.awaitingSecondChance = false;
    this.rejectedAlternative = null;
    this.uses = Object.fromEntries(Object.keys(ABILITIES).map((id) => [id, 0]));
  }

  useAbility(id, question, random = Math.random) {
    this.#ensureActive();
    const ability = ABILITIES[id];
    if (!ability) throw new Error("Habilidade desconhecida.");
    if (this.energy < ability.cost) throw new Error("Energia do Saber insuficiente.");
    if (this.uses[id] >= ability.limit) throw new Error("Limite desta habilidade atingido.");
    if (id === "hint" && !question.hint) throw new Error("Esta pergunta não possui uma dica válida.");

    this.energy -= ability.cost;
    this.uses[id] += 1;
    if (id === "vision") {
      const wrong = question.alternatives.filter((item) => item.id !== question.correct_alternative);
      return { id, eliminated: wrong[Math.floor(random() * wrong.length)].id };
    }
    if (id === "hint") return { id, hint: question.hint };
    if (id === "shield") this.shieldArmed = true;
    if (id === "secondChance") this.secondChanceArmed = true;
    if (id === "focus") return { id, skipped: true, addToWeaknesses: true };
    return { id, armed: true };
  }

  resolveAnswer(question, alternativeId) {
    this.#ensureActive();
    if (!question || question.alternatives?.length !== 5) throw new Error("Pergunta inválida para o duelo.");
    if (!question.alternatives.some((item) => item.id === alternativeId)) throw new Error("Alternativa inválida.");
    if (this.awaitingSecondChance && alternativeId === this.rejectedAlternative) {
      throw new Error("Escolha outra carta para usar a Segunda Chance.");
    }

    const isCorrect = alternativeId === question.correct_alternative;
    if (!isCorrect && this.secondChanceArmed && !this.awaitingSecondChance) {
      this.secondChanceArmed = false;
      this.awaitingSecondChance = true;
      this.rejectedAlternative = alternativeId;
      return { isCorrect: false, secondChance: true, damage: 0, status: this.status };
    }

    this.presented += 1;
    this.awaitingSecondChance = false;
    this.rejectedAlternative = null;
    let damage = 0;
    if (isCorrect) {
      damage = HIT_DAMAGE;
      this.rivalHp = Math.max(0, this.rivalHp - damage);
      this.correct += 1;
      this.streak += 1;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
      this.energy = Math.min(ENERGY_MAX, this.energy + 1);
    } else {
      damage = ERROR_DAMAGE[this.difficulty];
      if (this.shieldArmed) {
        damage /= 2;
        this.shieldArmed = false;
      }
      this.playerHp = Math.max(0, this.playerHp - damage);
      this.wrong += 1;
      this.streak = 0;
    }
    if (this.rivalHp === 0) this.status = "won";
    if (this.playerHp === 0) this.status = "lost";

    return {
      isCorrect,
      secondChance: false,
      damage,
      playerHp: this.playerHp,
      rivalHp: this.rivalHp,
      energy: this.energy,
      streak: this.streak,
      combo: this.combo,
      status: this.status
    };
  }

  get combo() {
    if (this.streak >= 8 && this.wrong === 0) return "Duelo Perfeito";
    if (this.streak >= 5) return "Domínio da Matéria";
    if (this.streak >= 3) return "Corrente de Conhecimento";
    if (this.streak >= 2) return "Combo da Mente";
    return "";
  }

  snapshot() {
    return {
      difficulty: this.difficulty,
      playerHp: this.playerHp,
      rivalHp: this.rivalHp,
      energy: this.energy,
      correct: this.correct,
      wrong: this.wrong,
      presented: this.presented,
      streak: this.streak,
      bestStreak: this.bestStreak,
      status: this.status,
      uses: { ...this.uses }
    };
  }

  #ensureActive() {
    if (this.status !== "active") throw new Error("O duelo já terminou.");
  }
}

export { ERROR_DAMAGE, HIT_DAMAGE, MAX_HP };
