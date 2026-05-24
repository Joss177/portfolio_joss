/**
 * Procedural Thunderstorm Audio Synthesizer using Web Audio API.
 * Synthesizes falling rain and random lightning rumbles pure mathematically.
 * No external static assets required. Safe, lightweight and offline-friendly.
 */
class StormAudioEngine {
  private ctx: AudioContext | null = null;
  private rainNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private rainGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  constructor() {
    // Lazy initialized on user click interaction to bypass browser policies
  }

  private initContext() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public startRain() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.rainNode) return;

      const bufferSize = 4096;
      this.rainNode = this.ctx.createScriptProcessor(bufferSize, 1, 1);

      let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;

      this.rainNode.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;

          // Ruido ROSA — lluvia natural suave
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          b6 = white * 0.115926;

          output[i] = pink * 0.18;
        }
      };

      // Filtro 1: Gotas suaves (bajamos boost y frecuencia)
      const dropFilter = this.ctx.createBiquadFilter();
      dropFilter.type = 'peaking';
      dropFilter.frequency.value = 2800;
      dropFilter.Q.value = 0.5;
      dropFilter.gain.value = 3; // Antes 8 — más suave

      // Filtro 2: Cortar graves innecesarios
      const highpass = this.ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 400;

      // Filtro 3: Suavizar altas frecuencias
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 8000;

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Lluvia suave con fade-in lento
      this.rainGain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 2.0);

      this.rainNode.connect(highpass);
      highpass.connect(dropFilter);
      dropFilter.connect(lowpass);
      lowpass.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

    } catch (err) {
      console.error('Failed to start procedural rain:', err);
    }
  }



  public stopRain() {
    if (this.rainGain && this.ctx) {
      this.rainGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.0);
      setTimeout(() => {
        if (this.rainNode) {
          this.rainNode.disconnect();
          this.rainNode = null;
        }
        if (this.rainGain) {
          this.rainGain.disconnect();
          this.rainGain = null;
        }
      }, 1100);
    }
  }

  public triggerThunder() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // ---- 1. CHISPAS ELÉCTRICAS (más fuertes y numerosas) ----
      const sparkCount = 6 + Math.floor(Math.random() * 5);
      for (let s = 0; s < sparkCount; s++) {
        const osc = this.ctx.createOscillator();
        const sparkGain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100 + Math.random() * 900, now + s * 0.08);
        osc.frequency.exponentialRampToValueAtTime(10, now + s * 0.08 + 0.15);

        const sparkFilter = this.ctx.createBiquadFilter();
        sparkFilter.type = 'highpass';
        sparkFilter.frequency.value = 2000;

        sparkGain.gain.setValueAtTime(0, now);
        // Chispas más fuertes
        sparkGain.gain.linearRampToValueAtTime(0.18 + Math.random() * 0.15, now + s * 0.08);
        sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + s * 0.08 + 0.15);

        osc.connect(sparkFilter);
        sparkFilter.connect(sparkGain);
        sparkGain.connect(this.masterGain);

        osc.start(now + s * 0.08);
        osc.stop(now + s * 0.08 + 0.16);
      }

      // ---- 2. RETUMBO PROFUNDO (más fuerte y grave) ----
      const rumbleDur = 3.5 + Math.random() * 3.5;
      const rumbleGain = this.ctx.createGain();
      rumbleGain.gain.setValueAtTime(0, now);
      // Impacto inicial mucho más fuerte
      rumbleGain.gain.linearRampToValueAtTime(0.85 + Math.random() * 0.15, now + 0.1);

      let tOffset = 0.2;
      while (tOffset < rumbleDur) {
        const nextGain = (0.15 + Math.random() * 0.35) * (1.0 - tOffset / rumbleDur);
        rumbleGain.gain.linearRampToValueAtTime(nextGain, now + tOffset);
        tOffset += 0.2 + Math.random() * 0.4;
      }
      rumbleGain.gain.linearRampToValueAtTime(0.0001, now + rumbleDur);

      const rumbleNoise = this.ctx.createScriptProcessor(4096, 1, 1);
      let noiseOut = 0.0;
      rumbleNoise.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < 4096; i++) {
          const white = Math.random() * 2 - 1;
          noiseOut = 0.995 * noiseOut + 0.005 * white;
          output[i] = noiseOut;
        }
      };

      // Más grave y profundo
      const lowpass1 = this.ctx.createBiquadFilter();
      lowpass1.type = 'lowpass';
      lowpass1.frequency.setValueAtTime(100, now);
      lowpass1.frequency.exponentialRampToValueAtTime(55, now + rumbleDur);

      const lowpass2 = this.ctx.createBiquadFilter();
      lowpass2.type = 'lowpass';
      lowpass2.frequency.setValueAtTime(120, now);

      rumbleNoise.connect(lowpass1);
      lowpass1.connect(lowpass2);
      lowpass2.connect(rumbleGain);
      rumbleGain.connect(this.masterGain);

      setTimeout(() => {
        rumbleNoise.disconnect();
        lowpass1.disconnect();
        lowpass2.disconnect();
        rumbleGain.disconnect();
      }, (rumbleDur + 1.5) * 1000);

    } catch (err) {
      console.error('Failed to trigger procedural thunder:', err);
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const vol = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setTargetAtTime(vol * 0.5, this.ctx.currentTime, 0.1);
    }
  }
}

export const stormAudio = new StormAudioEngine();
