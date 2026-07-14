import test from "node:test";
import assert from "node:assert/strict";
import { BattleEngine, MAX_HP } from "../src/core/battle-engine.js";
import { DEMO_PACK } from "../src/data/demo-pack.js";

const question = DEMO_PACK.questions[0];
const correct = question.correct_alternative;
const wrong = question.alternatives.find((item) => item.id !== correct).id;

test("inicia ambos os duelistas com 8.000 PV", () => {
  const engine = new BattleEngine("medium");
  assert.equal(engine.playerHp, MAX_HP);
  assert.equal(engine.rivalHp, MAX_HP);
});

test("acerto causa sempre 1.000 de dano e concede energia", () => {
  for (const difficulty of ["easy", "medium", "hard"]) {
    const engine = new BattleEngine(difficulty);
    const result = engine.resolveAnswer(question, correct);
    assert.equal(result.damage, 1000);
    assert.equal(engine.rivalHp, 7000);
    assert.equal(engine.energy, 1);
  }
});

test("erro aplica dano conforme a dificuldade", () => {
  for (const [difficulty, expected] of [["easy", 1000], ["medium", 2000], ["hard", 4000]]) {
    const engine = new BattleEngine(difficulty);
    const result = engine.resolveAnswer(question, wrong);
    assert.equal(result.damage, expected);
    assert.equal(engine.playerHp, 8000 - expected);
    assert.equal(engine.rivalHp, 8000);
  }
});

test("rival só é derrotado no oitavo acerto", () => {
  const engine = new BattleEngine("easy");
  for (let index = 0; index < 7; index += 1) engine.resolveAnswer(question, correct);
  assert.equal(engine.status, "active");
  assert.equal(engine.rivalHp, 1000);
  engine.resolveAnswer(question, correct);
  assert.equal(engine.status, "won");
  assert.equal(engine.correct, 8);
});

test("escudo reduz o próximo dano por erro em 50%", () => {
  const engine = new BattleEngine("hard");
  engine.energy = 2;
  engine.useAbility("shield", question);
  const result = engine.resolveAnswer(question, wrong);
  assert.equal(result.damage, 2000);
  assert.equal(engine.playerHp, 6000);
});

test("Visão do Sábio nunca elimina a alternativa correta", () => {
  const engine = new BattleEngine("medium");
  engine.energy = 2;
  const result = engine.useAbility("vision", question, () => 0);
  assert.notEqual(result.eliminated, correct);
});

test("Segunda Chance impede o dano da primeira escolha errada", () => {
  const engine = new BattleEngine("medium");
  engine.energy = 3;
  engine.useAbility("secondChance", question);
  const first = engine.resolveAnswer(question, wrong);
  assert.equal(first.secondChance, true);
  assert.equal(engine.playerHp, 8000);
  const second = engine.resolveAnswer(question, correct);
  assert.equal(second.isCorrect, true);
  assert.equal(engine.rivalHp, 7000);
});
