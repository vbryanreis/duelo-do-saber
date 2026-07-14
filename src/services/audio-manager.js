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

  lifeDrain() {
    if (!this.enabled || !this.settings.effects) return;
    const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Context) return;
    this.context ||= new Context();
    const now = this.context.currentTime;
    const level = Math.max(0.001, this.settings.effects * 0.09);
    for (let i = 0; i < 26; i += 1) {
      const start = now + i * 0.045;
      const blip = this.context.createOscillator();
      const gain = this.context.createGain();
      blip.type = "square";
      blip.frequency.setValueAtTime(940 - i * 27, start);
      gain.gain.setValueAtTime(level, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.04);
      blip.connect(gain).connect(this.context.destination);
      blip.start(start);
      blip.stop(start + 0.045);
    }
    const end = now + 26 * 0.045;
    const thud = this.context.createOscillator();
    const thudGain = this.context.createGain();
    thud.type = "sawtooth";
    thud.frequency.setValueAtTime(150, end);
    thud.frequency.exponentialRampToValueAtTime(42, end + 0.5);
    thudGain.gain.setValueAtTime(level * 2.4, end);
    thudGain.gain.exponentialRampToValueAtTime(0.001, end + 0.55);
    thud.connect(thudGain).connect(this.context.destination);
    thud.start(end);
    thud.stop(end + 0.6);
  }

  voice(clip) {
    if (!clip || !this.enabled || !this.settings.effects) return;
    this.voiceAudio ||= new Audio();
    this.voiceAudio.pause();
    this.voiceAudio.src = encodeURI(clip);
    this.voiceAudio.volume = Math.min(1, Math.max(0.4, this.settings.effects));
    this.voiceAudio.play().catch(() => {});
  }

  stopVoice() {
    if (this.voiceAudio) this.voiceAudio.pause();
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.audio.play().catch(() => {});
    else this.audio.pause();
    return this.enabled;
  }
}
