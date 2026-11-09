/* Petites notes de voix au survol du menu (Web Audio, volume bas, coupables). */
let ctx: AudioContext | null = null;
export let soundOn = true;
export const setSound = (v: boolean) => { soundOn = v; try { localStorage.setItem("hv-son", v ? "1" : "0"); } catch {} };
try { const v = localStorage.getItem("hv-son"); if (v === "0") soundOn = false; } catch {}
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) soundOn = false;
export function wake() { try { ctx = ctx || new AudioContext(); if (ctx.state === "suspended") ctx.resume(); } catch {} }
// gamme pentatonique de do : ça sonne juste dans n'importe quel ordre
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
export function note(i: number) {
  if (!soundOn || !ctx || ctx.state !== "running") return;
  const t = ctx.currentTime, f = SCALE[i % SCALE.length];
  const out = ctx.createGain(); out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(0.05, t + 0.05); out.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
  const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800; lp.connect(out); out.connect(ctx.destination);
  // trois voix légèrement désaccordées = un petit chœur
  [-6, 0, 7].forEach((cents) => {
    const o = ctx!.createOscillator(); o.type = "triangle"; o.frequency.value = f; o.detune.value = cents;
    const vib = ctx!.createOscillator(); vib.frequency.value = 5.2; const vg = ctx!.createGain(); vg.gain.value = 3; vib.connect(vg); vg.connect(o.detune);
    o.connect(lp); o.start(t); vib.start(t); o.stop(t + 1.2); vib.stop(t + 1.2);
  });
}
