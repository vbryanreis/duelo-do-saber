export class AudioManager {
  constructor(settings, { audio = null, AudioClass = globalThis.Audio, interactionTarget = globalThis.document } = {}) {
    this.settings = settings;
    this.audio = audio || new AudioClass();
    this.audio.loop = true;
    this.current = "";
    this.enabled = true;
    this.interactionTarget = interactionTarget;
    this.unlockArmed = false;
    this.unlockEvents = ["pointerdown", "keydown", "touchstart"];
    this.handleInteraction = this.handleInteraction.bind(this);
    this.armAutoplayUnlock();
  }

  play(track) {
    if (!track) return;
    if (this.current === track) {
      if (this.enabled && this.audio.paused) this.startPlayback();
      return;
    }
    this.current = track;
    this.audio.src = encodeURI(track);
    this.audio.volume = this.settings.music;
    this.startPlayback();
  }

  startPlayback() {
    if (!this.enabled || !this.current) return;
    try {
      const playback = this.audio.play();
      if (playback?.then) {
        playback.then(() => this.disarmAutoplayUnlock()).catch(() => this.armAutoplayUnlock());
      } else {
        this.disarmAutoplayUnlock();
      }
    } catch {
      this.armAutoplayUnlock();
    }
  }

  armAutoplayUnlock() {
    if (this.unlockArmed || !this.interactionTarget?.addEventListener) return;
    this.unlockArmed = true;
    for (const eventName of this.unlockEvents) {
      this.interactionTarget.addEventListener(eventName, this.handleInteraction, true);
    }
  }

  disarmAutoplayUnlock() {
    if (!this.unlockArmed || !this.interactionTarget?.removeEventListener) return;
    this.unlockArmed = false;
    for (const eventName of this.unlockEvents) {
      this.interactionTarget.removeEventListener(eventName, this.handleInteraction, true);
    }
  }

  handleInteraction() {
    if (this.context?.state === "suspended") this.context.resume?.().catch(() => {});
    this.startPlayback();
  }

  setVolume(value) {
    this.settings.music = Number(value);
    this.audio.volume = this.settings.music;
  }

  effect(kind = "ui") {
    if (!this.settings.effects) return;
    const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Context) return;
    this.context ||= new Context();
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const frequencies = { correct: 660, wrong: 180, ability: 480, ui: 320 };
    oscillator.type = kind === "wrong" ? "sawtooth" : "sine";
    oscillator.frequency.setValueAtTime(frequencies[kind] || frequencies.ui, this.context.currentTime);
    gain.gain.setValueAtTime(Math.max(0.001, this.settings.effects * 0.12), this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.18);
    oscillator.connect(gain).connect(this.context.destination);
    oscillator.start();
    oscillator.stop(this.context.currentTime + 0.2);
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.startPlayback();
    else this.audio.pause();
    return this.enabled;
  }
}
