import test from "node:test";
import assert from "node:assert/strict";
import { initialSave, SaveService } from "../src/services/save-service.js";
import { DEMO_PACK } from "../src/data/demo-pack.js";

class MemoryStorage {
  value = null;
  getItem() { return this.value; }
  setItem(_key, value) { this.value = value; }
}

test("um save novo não contém matéria demonstrativa nem libera conteúdo", () => {
  const data = initialSave();
  assert.deepEqual(data.packages, []);
  assert.equal(data.campaign.packageId, undefined);
});

test("salva uma resposta errada no Baralho das Fraquezas", () => {
  const service = new SaveService(new MemoryStorage());
  const question = DEMO_PACK.questions[0];
  service.recordAnswer({ question, selected: "E", correct: false, mode: "quick", regionId: "aurora-gardens" });
  assert.equal(service.data.history.length, 1);
  assert.equal(service.data.weaknesses[question.id].errors, 1);
  assert.equal(service.data.weaknesses[question.id].priority, 3);
});

test("vitória em campanha desbloqueia a região seguinte", () => {
  const service = new SaveService(new MemoryStorage());
  const region = { id: "aurora-gardens", order: 1, reward: "Moldura teste" };
  service.finishDuel(region, { presented: 8, correct: 8, bestStreak: 8, playerHp: 8000 }, true, "campaign");
  assert.equal(service.data.campaign.unlocked, 2);
  assert.equal(service.data.campaign.completed[region.id], true);
  assert.ok(service.data.rewards.includes("Moldura teste"));
});
