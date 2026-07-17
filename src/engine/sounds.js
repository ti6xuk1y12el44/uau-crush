let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, duration = 0.12, type = "sine", vol = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

export function playMatch() {
  playTone(523, 0.1, "sine", 0.12);
  setTimeout(() => playTone(659, 0.1, "sine", 0.12), 60);
  setTimeout(() => playTone(784, 0.12, "sine", 0.1), 120);
}

export function playCombo() {
  playTone(587, 0.08, "triangle", 0.15);
  setTimeout(() => playTone(740, 0.08, "triangle", 0.15), 50);
  setTimeout(() => playTone(880, 0.08, "triangle", 0.15), 100);
  setTimeout(() => playTone(1047, 0.15, "triangle", 0.12), 150);
}

export function playSwap() {
  playTone(400, 0.06, "sine", 0.08);
}

export function playInvalid() {
  playTone(200, 0.1, "square", 0.06);
  setTimeout(() => playTone(180, 0.12, "square", 0.05), 80);
}

export function playSelect() {
  playTone(600, 0.05, "sine", 0.06);
}

export function playWin() {
  const notes = [523, 659, 784, 1047, 784, 1047];
  notes.forEach((n, i) => setTimeout(() => playTone(n, 0.18, "sine", 0.12), i * 120));
}

export function playLose() {
  playTone(400, 0.2, "sawtooth", 0.06);
  setTimeout(() => playTone(350, 0.2, "sawtooth", 0.06), 150);
  setTimeout(() => playTone(300, 0.3, "sawtooth", 0.05), 300);
}

export function playPowerUp() {
  playTone(440, 0.06, "square", 0.1);
  setTimeout(() => playTone(660, 0.06, "square", 0.1), 50);
  setTimeout(() => playTone(880, 0.1, "square", 0.08), 100);
  setTimeout(() => playTone(1100, 0.15, "triangle", 0.1), 150);
}

export function playStar() {
  playTone(800, 0.1, "sine", 0.1);
  setTimeout(() => playTone(1000, 0.1, "sine", 0.1), 100);
  setTimeout(() => playTone(1200, 0.15, "sine", 0.08), 200);
}