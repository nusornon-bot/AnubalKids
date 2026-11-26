import { Language, VoicePersona } from '../types';

// Global mute state
let isGlobalAudioMuted = false;
type MuteListener = (muted: boolean) => void;
const muteListeners = new Set<MuteListener>();

export function isAudioMuted(): boolean {
  return isGlobalAudioMuted;
}

export function setAudioMuted(muted: boolean): void {
  isGlobalAudioMuted = muted;
  soundEffects.setMuted(muted);
  if (muted) {
    stopSpeaking();
  }
  muteListeners.forEach((listener) => {
    try {
      listener(muted);
    } catch {
      // ignore
    }
  });
}

export function toggleAudioMute(): boolean {
  const next = !isGlobalAudioMuted;
  setAudioMuted(next);
  return next;
}

export function subscribeAudioMute(listener: MuteListener): () => void {
  muteListeners.add(listener);
  return () => {
    muteListeners.delete(listener);
  };
}

// Web Audio API Sound Effects Synthesizer
class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  getMuted(): boolean {
    return this.muted;
  }

  play(soundName: string, volume = 0.5) {
    if (soundName === 'success' || soundName === 'correct') {
      this.playSuccess(volume);
    } else if (soundName === 'incorrect') {
      this.playIncorrect(volume);
    } else if (soundName === 'victory') {
      this.playVictory(volume);
    } else {
      this.playTap(volume);
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Handled silently if browser policy requires user gesture
      });
    }
  }

  // Pre-unlock AudioContext on first user interaction (touch/click)
  unlockAudio() {
    this.initCtx();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play countdown tick during dwell
  playTick(progress: number, volume = 0.5) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch rises as dwell progress nears 1.0 (420Hz to 820Hz)
      const freq = 420 + Math.max(0, Math.min(1, progress)) * 400;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const peakGain = Math.max(0.001, volume * 0.15);
      gain.gain.setValueAtTime(peakGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // AudioContext fails gracefully
    }
  }

  // Play joyful success bell (C5, E5, G5, C6 arpeggio)
  playSuccess(volume = 0.6) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.09);

        // Safe non-zero start for Web Audio exponential ramps
        gain.gain.setValueAtTime(0.0001, now + index * 0.09);
        const peakGain = Math.max(0.001, volume * 0.25);
        gain.gain.linearRampToValueAtTime(peakGain, now + index * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.09 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.09);
        osc.stop(now + index * 0.09 + 0.4);
      });
    } catch {
      // AudioContext fails gracefully
    }
  }

  // Play gentle retry sound (E4 down to C4 gentle "uh-oh")
  playIncorrect(volume = 0.5) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [330, 260];

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.14);

        const peakGain = Math.max(0.001, volume * 0.2);
        gain.gain.setValueAtTime(peakGain, now + index * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.14 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.14);
        osc.stop(now + index * 0.14 + 0.2);
      });
    } catch {
      // AudioContext fails gracefully
    }
  }

  // Play victory celebration fanfare
  playVictory(volume = 0.7) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5];
      const times = [0, 0.12, 0.24, 0.36, 0.48, 0.65];
      const durations = [0.1, 0.1, 0.1, 0.1, 0.15, 0.5];

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + times[i]);

        const peakGain = Math.max(0.001, volume * 0.3);
        gain.gain.setValueAtTime(peakGain, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + times[i] + durations[i]);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + times[i]);
        osc.stop(now + times[i] + durations[i] + 0.05);
      });
    } catch {
      // AudioContext fails gracefully
    }
  }

  // Play triumphant level up chime (rising arpeggio for Adaptive Difficulty)
  playLevelUp(volume = 0.6) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      const times = [0, 0.08, 0.16, 0.24, 0.36];

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + times[i]);

        const peakGain = Math.max(0.001, volume * 0.25);
        gain.gain.setValueAtTime(0.0001, now + times[i]);
        gain.gain.linearRampToValueAtTime(peakGain, now + times[i] + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + times[i] + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + times[i]);
        osc.stop(now + times[i] + 0.35);
      });
    } catch {
      // AudioContext fails gracefully
    }
  }

  // Play gentle encouraging level adjust down sound
  playLevelDown(volume = 0.4) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 392]; // A4 down to G4 (soft, warm, gentle)

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.12);

        const peakGain = Math.max(0.001, volume * 0.15);
        gain.gain.setValueAtTime(peakGain, now + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + 0.22);
      });
    } catch {
      // AudioContext fails gracefully
    }
  }

  // Play pleasant tap sound for UI buttons
  playTap(volume = 0.4) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      const peakGain = Math.max(0.001, volume * 0.18);
      gain.gain.setValueAtTime(peakGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // AudioContext fails gracefully
    }
  }

  playCorrect(volume = 0.6) {
    this.playSuccess(volume);
  }

  // Realistic synthesized animal calls (Meow, Bark, Squeak, Trumpet, Cluck, Croak, Roar, etc.)
  playAnimalSound(soundType: string, volume = 0.7) {
    if (this.muted || isGlobalAudioMuted || volume <= 0.01) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const type = (soundType || '').toLowerCase();

      if (type === 'cat') {
        // Meow: pitch bends 520 -> 840 -> 460 Hz
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.16);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.42);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(volume * 0.28, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.46);
      } else if (type === 'dog') {
        // Bark bark: two quick low-pitched punchy bursts
        [0, 0.16].forEach((offset) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(260, now + offset);
          osc.frequency.exponentialRampToValueAtTime(140, now + offset + 0.1);

          gain.gain.setValueAtTime(volume * 0.26, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.11);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(750, now + offset);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
      } else if (type === 'rabbit') {
        // Cheerful bunny hop / squeak: 3 playful blips
        [0, 0.09, 0.18].forEach((offset, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const f = 640 + idx * 160;
          osc.frequency.setValueAtTime(f, now + offset);
          osc.frequency.exponentialRampToValueAtTime(f + 240, now + offset + 0.07);

          gain.gain.setValueAtTime(volume * 0.22, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.08);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
      } else if (type === 'elephant') {
        // Trumpet: Brassy sliding sawtooth wave 220Hz up to 480Hz
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.18);
        osc.frequency.setValueAtTime(450, now + 0.32);
        osc.frequency.exponentialRampToValueAtTime(310, now + 0.5);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, now);
        filter.Q.setValueAtTime(3.5, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(volume * 0.32, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.53);
      } else if (type === 'chicken') {
        // Rooster / Hen crow: "Kok-kok-koo!"
        const notes = [650, 780, 680, 920];
        const times = [0, 0.08, 0.16, 0.26];
        const lens = [0.06, 0.06, 0.08, 0.24];
        notes.forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + times[i]);
          if (i === 3) {
            osc.frequency.exponentialRampToValueAtTime(780, now + times[i] + lens[i]);
          }
          gain.gain.setValueAtTime(volume * 0.26, now + times[i]);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + times[i] + lens[i]);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + times[i]);
          osc.stop(now + times[i] + lens[i] + 0.01);
        });
      } else if (type === 'chick') {
        // Peep peep: 2 rapid sweet chirps
        [0, 0.12].forEach((offset) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1750, now + offset);
          osc.frequency.exponentialRampToValueAtTime(1250, now + offset + 0.07);

          gain.gain.setValueAtTime(volume * 0.22, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.08);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
      } else if (type === 'frog') {
        // Ribbit: low buzzy croak
        [0, 0.14].forEach((offset) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now + offset);
          osc.frequency.exponentialRampToValueAtTime(190, now + offset + 0.05);
          osc.frequency.exponentialRampToValueAtTime(110, now + offset + 0.1);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(450, now + offset);
          filter.Q.setValueAtTime(4, now + offset);

          gain.gain.setValueAtTime(volume * 0.28, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.11);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
      } else if (type === 'lion' || type === 'bear') {
        // Roar / Growl: Low rumbling frequency
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(75, now + 0.42);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(volume * 0.32, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.46);
      } else if (type === 'duck') {
        // Quack: nasal bandpass sawtooth
        [0, 0.15].forEach((offset) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(290, now + offset);
          osc.frequency.exponentialRampToValueAtTime(210, now + offset + 0.11);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(700, now + offset);
          filter.Q.setValueAtTime(3.5, now + offset);

          gain.gain.setValueAtTime(volume * 0.28, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.12);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.13);
        });
      } else if (type === 'bee') {
        // Buzz: high buzzy tone
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(230, now);
        osc.frequency.linearRampToValueAtTime(270, now + 0.15);
        osc.frequency.linearRampToValueAtTime(210, now + 0.32);

        gain.gain.setValueAtTime(volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'fish' || type === 'dolphin') {
        // Water bubbles or dolphin chirp: bubbling ascending glissando
        [0, 0.08, 0.16].forEach((offset, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const f = 400 + idx * 240;
          osc.frequency.setValueAtTime(f, now + offset);
          osc.frequency.exponentialRampToValueAtTime(f + 350, now + offset + 0.06);

          gain.gain.setValueAtTime(volume * 0.22, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.07);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.08);
        });
      } else if (type === 'monkey') {
        // Ooh-ooh aah-aah!
        const notes = [360, 480, 680];
        const times = [0, 0.1, 0.22];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + times[idx]);
          osc.frequency.exponentialRampToValueAtTime(freq + 120, now + times[idx] + 0.08);
          gain.gain.setValueAtTime(volume * 0.26, now + times[idx]);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + times[idx] + 0.09);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + times[idx]);
          osc.stop(now + times[idx] + 0.1);
        });
      } else {
        // Default gentle cheerful animal chime
        this.playSuccess(volume);
      }
    } catch {
      // AudioContext fails gracefully
    }
  }
}

export const soundEffects = new SoundEffectsService();

// Voice Cache & Event Listener
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (cachedVoices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    loadVoices();
  }
  return cachedVoices;
}

// Retain active utterance to prevent Chrome garbage-collection mid-speech bug
let activeUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: ReturnType<typeof setInterval> | null = null;

function clearKeepAliveTimer() {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

/**
 * Sanitize text for natural and educational pronunciation:
 * - Strips decorative emojis that would otherwise be awkwardly read by TTS engines (e.g. "red apple", "black question mark")
 * - Converts mathematical operations into clear spoken words for the respective language
 */
export function sanitizeSpokenText(text: string, lang: Language = 'th'): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove common decorative emoji characters & pictographs
  cleaned = cleaned.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ' '
  );

  // 2. Clean mathematical operators into spoken words based on language
  if (lang === 'th') {
    cleaned = cleaned
      .replace(/\s*\+\s*/g, ' บวก ')
      .replace(/\s*-\s*/g, ' ลบ ')
      .replace(/\s*[×*]\s*/g, ' คูณ ')
      .replace(/\s*[÷/]\s*/g, ' หาร ')
      .replace(/\s*=\s*\?/g, ' เท่ากับเท่าไร')
      .replace(/\s*=\s*/g, ' เท่ากับ ')
      .replace(/[?？]/g, ' ');
  } else if (lang === 'zh') {
    cleaned = cleaned
      .replace(/\s*\+\s*/g, ' 加 ')
      .replace(/\s*-\s*/g, ' 减 ')
      .replace(/\s*[×*]\s*/g, ' 乘 ')
      .replace(/\s*[÷/]\s*/g, ' 除以 ')
      .replace(/\s*=\s*\?/g, ' 等于多少')
      .replace(/\s*=\s*/g, ' 等于 ')
      .replace(/[?？]/g, ' ');
  } else {
    cleaned = cleaned
      .replace(/\s*\+\s*/g, ' plus ')
      .replace(/\s*-\s*/g, ' minus ')
      .replace(/\s*[×*]\s*/g, ' times ')
      .replace(/\s*[÷/]\s*/g, ' divided by ')
      .replace(/\s*=\s*\?/g, ' equals what')
      .replace(/\s*=\s*/g, ' equals ')
      .replace(/[?？]/g, ' ');
  }

  // 3. Remove stray punctuation noise and collapse multiple whitespaces
  cleaned = cleaned
    .replace(/["'“”‘’«»#@$%^*()_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Intelligent voice selection that matches language and preferred persona
 */
function findBestVoice(langLocale: string, persona: VoicePersona): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (voices.length === 0) return null;

  const langCode = langLocale.toLowerCase().slice(0, 2);
  const matchingVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith(langCode)
  );

  if (matchingVoices.length === 0) return null;

  const isMalePersona = persona === 'adult_male' || persona === 'child_boy';
  const isFemalePersona = persona === 'adult_female' || persona === 'child_girl';

  // Keyword markers for voice matching
  const maleKeywords = ['male', 'niwat', 'david', 'guy', 'mark', 'george', 'paul', 'ชาย'];
  const femaleKeywords = ['female', 'premwadee', 'narisa', 'kanya', 'zira', 'jenny', 'samantha', 'victoria', 'หญิง'];

  if (isMalePersona) {
    const maleVoice = matchingVoices.find((v) =>
      maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (maleVoice) return maleVoice;
  } else if (isFemalePersona) {
    const femaleVoice = matchingVoices.find((v) =>
      femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (femaleVoice) return femaleVoice;
  }

  // Default to first matching language voice (or system default)
  const defaultLangVoice = matchingVoices.find((v) => v.default) || matchingVoices[0];
  return defaultLangVoice || null;
}

/**
 * High-quality Text-To-Speech with phonetic cleanup, persona modulation, and volume control
 */
export function speakText(
  rawText: string,
  lang: Language = 'th',
  persona: VoicePersona = 'adult_female',
  volume = 1
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  if (isGlobalAudioMuted || volume <= 0.01) {
    stopSpeaking();
    return;
  }

  const cleanText = sanitizeSpokenText(rawText, lang);
  if (!cleanText) return;

  try {
    // Stop any in-progress speech
    window.speechSynthesis.cancel();

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    activeUtterance = utterance;

    // Set ISO language locale
    let langLocale = 'th-TH';
    if (lang === 'zh') langLocale = 'zh-CN';
    else if (lang === 'en') langLocale = 'en-US';
    utterance.lang = langLocale;

    // Persona tuning for child engagement
    switch (persona) {
      case 'child_boy':
        utterance.pitch = 1.35;
        utterance.rate = 1.02;
        break;
      case 'child_girl':
        utterance.pitch = 1.45;
        utterance.rate = 0.98;
        break;
      case 'adult_male':
        utterance.pitch = 0.88;
        utterance.rate = 0.95;
        break;
      case 'adult_female':
      default:
        // Warm and gentle teacher voice
        utterance.pitch = 1.12;
        utterance.rate = 0.92;
        break;
    }

    utterance.volume = Math.max(0, Math.min(1, volume));

    // Match voice persona
    const bestVoice = findBestVoice(langLocale, persona);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => {
      activeUtterance = null;
      clearKeepAliveTimer();
    };
    utterance.onerror = () => {
      activeUtterance = null;
      clearKeepAliveTimer();
    };

    // Small delay ensures previous cancel() is flushed in Chromium / WebKit
    setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);

          // Maintain keep-alive ping to prevent Chrome from prematurely stopping speech
          clearKeepAliveTimer();
          keepAliveTimer = setInterval(() => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
              window.speechSynthesis.pause();
              window.speechSynthesis.resume();
            } else {
              clearKeepAliveTimer();
            }
          }, 8000);
        }
      } catch (err) {
        console.warn('Speech synthesis speak error:', err);
        activeUtterance = null;
        clearKeepAliveTimer();
      }
    }, 15);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    activeUtterance = null;
    clearKeepAliveTimer();
  }
}

export function stopSpeaking() {
  clearKeepAliveTimer();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch {
      // Graceful cancel
    }
  }
}

export function unlockAudioAndSpeech() {
  soundEffects.unlockAudio();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      if (cachedVoices.length === 0) {
        cachedVoices = window.speechSynthesis.getVoices();
      }
    } catch {
      // ignore
    }
  }
}

// Auto-unlock audio and speech on first interaction in document
if (typeof window !== 'undefined') {
  const handleFirstInteraction = () => {
    unlockAudioAndSpeech();
    window.removeEventListener('pointerdown', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
  };
  window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
  window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
  window.addEventListener('keydown', handleFirstInteraction, { passive: true });
}
