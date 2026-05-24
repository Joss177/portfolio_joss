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

      if (this.rainNode) return; // Rain is already playing

      // Create procedural rain using standard ScriptProcessorNode (safest fallback for simple generation)
      // Generates pinkish/white noise with low-pass and high-pass filters for realistic rain rustle
      const bufferSize = 4096;
      this.rainNode = this.ctx.createScriptProcessor(bufferSize, 1, 1);
      
      let lastOut = 0.0;
      this.rainNode.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Pink-brown filter: low pass filtering to give rumbling rain atmosphere
          lastOut = 0.95 * lastOut + 0.05 * white;
          output[i] = lastOut * 0.45 + white * 0.05; // Rain sound mixture
        }
      };

      // Add a Bandpass filter to make it sound like rain falling on a canvas tent/leaves
      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'peaking';
      rainFilter.frequency.value = 800;
      rainFilter.Q.value = 1.0;
      rainFilter.gain.value = -3;

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Fade-in rain gently
      this.rainGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 2.0);

      this.rainNode.connect(rainFilter);
      rainFilter.connect(this.rainGain);
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

      // ---- 1. ELECTRIC SPARK / CRACKLE (High Frequency) ----
      const sparkCount = 4 + Math.floor(Math.random() * 4);
      for (let s = 0; s < sparkCount; s++) {
        const osc = this.ctx.createOscillator();
        const sparkGain = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        // Random electric frequency crackles
        osc.frequency.setValueAtTime(100 + Math.random() * 900, now + s * 0.08);
        osc.frequency.exponentialRampToValueAtTime(10, now + s * 0.08 + 0.15);

        const sparkFilter = this.ctx.createBiquadFilter();
        sparkFilter.type = 'highpass';
        sparkFilter.frequency.value = 2000;

        sparkGain.gain.setValueAtTime(0, now);
        sparkGain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.1, now + s * 0.08);
        sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + s * 0.08 + 0.15);

        osc.connect(sparkFilter);
        sparkFilter.connect(sparkGain);
        sparkGain.connect(this.masterGain);

        osc.start(now + s * 0.08);
        osc.stop(now + s * 0.08 + 0.16);
      }

      // ---- 2. LOW FREQUENCY DEEP RUMBLE (The main Thunder block) ----
      const rumbleDur = 3.5 + Math.random() * 3.5;
      const rumbleGain = this.ctx.createGain();
      rumbleGain.gain.setValueAtTime(0, now);
      // Sudden burst of rumble then rolling decay
      rumbleGain.gain.linearRampToValueAtTime(0.5 + Math.random() * 0.4, now + 0.1);
      
      // Roll/vibrate gain to simulate distance and echoing clouds
      let tOffset = 0.2;
      while (tOffset < rumbleDur) {
        const nextGain = (0.1 + Math.random() * 0.3) * (1.0 - tOffset / rumbleDur);
        rumbleGain.gain.linearRampToValueAtTime(nextGain, now + tOffset);
        tOffset += 0.2 + Math.random() * 0.4;
      }
      rumbleGain.gain.linearRampToValueAtTime(0.0001, now + rumbleDur);

      // Procedural rumbling noise generator
      const rumbleNoise = this.ctx.createScriptProcessor(4096, 1, 1);
      let noiseOut = 0.0;
      rumbleNoise.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < 4096; i++) {
          const white = Math.random() * 2 - 1;
          // Brownian low-frequency focus
          noiseOut = 0.995 * noiseOut + 0.005 * white;
          output[i] = noiseOut;
        }
      };

      // Filters to simulate atmospheric damping
      const lowpass1 = this.ctx.createBiquadFilter();
      lowpass1.type = 'lowpass';
      lowpass1.frequency.setValueAtTime(80, now);
      lowpass1.frequency.exponentialRampToValueAtTime(45, now + rumbleDur);
      
      const lowpass2 = this.ctx.createBiquadFilter();
      lowpass2.type = 'lowpass';
      lowpass2.frequency.setValueAtTime(120, now);

      rumbleNoise.connect(lowpass1);
      lowpass1.connect(lowpass2);
      lowpass2.connect(rumbleGain);
      rumbleGain.connect(this.masterGain);

      // Start and clear node
      rumbleNoise.onaudioprocess = rumbleNoise.onaudioprocess; // Bind
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
