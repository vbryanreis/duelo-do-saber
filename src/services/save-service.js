const KEY = "duelo-do-saber.save.v1";

export function initialSave() {
  return {
    version: 1,
    profile: { name: "Duelista", level: 1, xp: 0, coins: 0 },
    campaign: { unlocked: 1, completed: {}, best: {}, difficulty: "medium" },
    packages: [],
    history: [],
    weaknesses: {},
    rewards: [],
    settings: { music: 0.45, effects: 0.7, textScale: 1, highContrast: false, reducedMotion: false }
  };
}

export class SaveService {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
    this.data = this.#load();
  }

  #load() {
    try {
      const parsed = JSON.parse(this.storage?.getItem(KEY));
      return parsed?.version === 1 ? { ...initialSave(), ...parsed, settings: { ...initialSave().settings, ...parsed.settings } } : initialSave();
    } catch {
      return initialSave();
    }
  }

  persist() {
    this.storage?.setItem(KEY, JSON.stringify(this.data));
    return this.data;
  }

  reset() {
    this.data = initialSave();
    return this.persist();
  }

  installPackage(pack) {
    const copy = structuredClone(pack);
    this.data.packages = this.data.packages.filter((item) => item.package_id !== copy.package_id);
    this.data.packages.push(copy);
    return this.persist();
  }

  recordAnswer({ question, selected, correct, mode, regionId }) {
    const event = { questionId: question.id, subject: question.subject, topic: question.topic, selected, correct, mode, regionId, at: new Date().toISOString() };
    this.data.history.push(event);
    this.data.history = this.data.history.slice(-1000);
    if (!correct) {
      const current = this.data.weaknesses[question.id] || { priority: 0, errors: 0, doubts: 0 };
      this.data.weaknesses[question.id] = { ...current, priority: Math.min(10, current.priority + 3), errors: current.errors + 1, lastAt: event.at };
    } else if (this.data.weaknesses[question.id]) {
      this.data.weaknesses[question.id].priority = Math.max(0, this.data.weaknesses[question.id].priority - 1);
    }
    return this.persist();
  }

  flagQuestion(questionId) {
    const current = this.data.weaknesses[questionId] || { priority: 0, errors: 0, doubts: 0 };
    this.data.weaknesses[questionId] = { ...current, priority: Math.min(10, current.priority + 1), doubts: current.doubts + 1, lastAt: new Date().toISOString() };
    return this.persist();
  }

  finishDuel(region, snapshot, won, mode) {
    const accuracy = snapshot.presented ? Math.round((snapshot.correct / snapshot.presented) * 100) : 0;
    if (won) {
      const xp = 80 + snapshot.correct * 15 + snapshot.bestStreak * 5;
      const coins = 40 + snapshot.correct * 5;
      this.data.profile.xp += xp;
      this.data.profile.coins += coins;
      this.data.profile.level = 1 + Math.floor(this.data.profile.xp / 500);
      if (mode === "campaign") {
        this.data.campaign.completed[region.id] = true;
        this.data.campaign.unlocked = Math.min(5, Math.max(this.data.campaign.unlocked, region.order + 1));
        if (!this.data.rewards.includes(region.reward)) this.data.rewards.push(region.reward);
      }
    }
    const previous = this.data.campaign.best[region.id];
    if (!previous || accuracy > previous.accuracy) this.data.campaign.best[region.id] = { accuracy, playerHp: snapshot.playerHp, bestStreak: snapshot.bestStreak };
    this.persist();
    return { accuracy, level: this.data.profile.level };
  }
}
