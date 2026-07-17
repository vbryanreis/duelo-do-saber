import test from "node:test";
import assert from "node:assert/strict";
import { AudioManager } from "../src/services/audio-manager.js";

class FakeInteractionTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }

  dispatch(type) {
    for (const listener of this.listeners.get(type) || []) listener();
  }
}

class AllowedAudio {
  constructor() {
    this.paused = true;
    this.playCalls = 0;
  }

  play() {
    this.playCalls += 1;
    this.paused = false;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }
}

class InitiallyBlockedAudio extends AllowedAudio {
  play() {
    this.playCalls += 1;
    if (this.playCalls === 1) return Promise.reject(new Error("Autoplay bloqueado"));
    this.paused = false;
    return Promise.resolve();
  }
}

const settings = () => ({ music: 0.45, effects: 0.7 });
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

test("inicia a música imediatamente quando o navegador permite autoplay", async () => {
  const target = new FakeInteractionTarget();
  const manager = new AudioManager(settings(), { AudioClass: AllowedAudio, interactionTarget: target });

  manager.play("menu.mp3");
  await flushPromises();

  assert.equal(manager.audio.playCalls, 1);
  assert.equal(manager.audio.paused, false);
  assert.equal(manager.unlockArmed, false);
});

test("retoma automaticamente na primeira interação quando o autoplay é bloqueado", async () => {
  const target = new FakeInteractionTarget();
  const manager = new AudioManager(settings(), { AudioClass: InitiallyBlockedAudio, interactionTarget: target });

  manager.play("menu.mp3");
  await flushPromises();
  assert.equal(manager.audio.paused, true);
  assert.equal(manager.unlockArmed, true);

  target.dispatch("pointerdown");
  await flushPromises();

  assert.equal(manager.audio.playCalls, 2);
  assert.equal(manager.audio.paused, false);
  assert.equal(manager.unlockArmed, false);
});

test("não retoma a música por interação enquanto estiver mutada", async () => {
  const target = new FakeInteractionTarget();
  const manager = new AudioManager(settings(), { AudioClass: InitiallyBlockedAudio, interactionTarget: target });

  manager.play("menu.mp3");
  await flushPromises();
  manager.toggle();
  target.dispatch("keydown");
  await flushPromises();

  assert.equal(manager.enabled, false);
  assert.equal(manager.audio.playCalls, 1);
  assert.equal(manager.audio.paused, true);
});
