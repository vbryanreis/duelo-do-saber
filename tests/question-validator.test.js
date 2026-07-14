import test from "node:test";
import assert from "node:assert/strict";
import { DEMO_PACK } from "../src/data/demo-pack.js";
import { validateQuestionPack } from "../src/core/question-validator.js";

test("pacote demonstrativo passa por todas as validações", () => {
  const report = validateQuestionPack(DEMO_PACK);
  assert.equal(report.valid, true);
  assert.equal(report.errors.length, 0);
  assert.equal(report.summary.total, 62);
  assert.ok(report.summary.difficulty.hard >= 8);
});

test("rejeita questão com menos de cinco alternativas", () => {
  const invalid = structuredClone(DEMO_PACK);
  invalid.questions[0].alternatives.pop();
  const report = validateQuestionPack(invalid);
  assert.equal(report.valid, false);
  assert.match(report.errors.join(" "), /exatamente cinco alternativas/);
});

test("rejeita IDs de alternativas que não cobrem A a E", () => {
  const invalid = structuredClone(DEMO_PACK);
  invalid.questions[0].alternatives[4].id = "A";
  const report = validateQuestionPack(invalid);
  assert.equal(report.valid, false);
  assert.match(report.errors.join(" "), /A, B, C, D e E/);
});
