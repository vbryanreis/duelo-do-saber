export class AudioManager {
  constructor(settings) {
    this.settings = settings;
    this.audio = new Audio();
    this.audio.loop = true;
    this.current = "";
    this.enabled = true;
  }

  play(track) {
    if (!track) return;
    if (this.current === track) {
      if (this.enabled && this.audio.paused) this.audio.play().catch(() => {});
      return;
    }
    this.current = track;
    this.audio.src = encodeURI(track);
    this.audio.volume = this.settings.music;
    if (this.enabled) this.audio.play().catch(() => {});
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
    if (this.enabled) this.audio.play().catch(() => {});
    else this.audio.pause();
    return this.enabled;
  }
}
