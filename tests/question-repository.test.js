import test from "node:test";
import assert from "node:assert/strict";
import { QuestionRepository } from "../src/core/question-repository.js";
import { REGIONS } from "../src/config/regions.js";
import { DEMO_PACK } from "../src/data/demo-pack.js";

test("evita repetição imediata quando há alternativas", () => {
  const repository = new QuestionRepository(DEMO_PACK.questions, 42);
  const first = repository.next(REGIONS[0]);
  const second = repository.next(REGIONS[0]);
  assert.notEqual(first.id, second.id);
});

test("prioriza dificuldade adequada à região", () => {
  const repository = new QuestionRepository(DEMO_PACK.questions, 42);
  const selected = repository.next(REGIONS[4]);
  assert.equal(selected.difficulty, "hard");
});
