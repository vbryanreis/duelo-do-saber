import test from "node:test";
import assert from "node:assert/strict";
import { canStartWithPackages, isPlayableUserPack } from "../src/core/content-access.js";
import { DEMO_PACK } from "../src/data/demo-pack.js";

test("biblioteca vazia não libera os modos de jogo", () => {
  assert.equal(canStartWithPackages([]), false);
});

test("pacote interno de testes não libera os modos de jogo", () => {
  assert.equal(isPlayableUserPack(DEMO_PACK), false);
  assert.equal(canStartWithPackages([DEMO_PACK]), false);
});

test("pacote próprio com questões libera os modos de jogo", () => {
  const imported = { package_id: "minha-materia", questions: [{ id: "q-1" }] };
  assert.equal(isPlayableUserPack(imported), true);
  assert.equal(canStartWithPackages([imported]), true);
});
