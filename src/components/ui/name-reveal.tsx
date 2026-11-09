import * as React from "react";
import { cn } from "@/lib/utils";

/* Random Letter Swap (@danielpetho, 21st.dev) revu en rouleaux — noms de l'équipe : chaque lettre est un petit rouleau (comme un tableau d'affichage)
   qui défile à travers d'autres lettres avant de s'arrêter, de gauche à droite.
   Au survol, le nom rejoue son rouleau, plus vite. Un trait champagne se trace dessous. */
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEPS = 7;

export function NameReveal({ text, play, delay = 0, className, indent = false, line = false }: { text: string; play: boolean; delay?: number; className?: string; indent?: boolean; line?: boolean }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const letters = Array.from(text);
  const reels = React.useMemo(() => letters.map((ch, i) => {
    if (ch === " ") return [" "];
    const r: string[] = []; for (let k = 0; k < STEPS + (i % 3); k++) r.push(POOL[(i * 7 + k * 11 + text.length) % POOL.length]);
    r.push(ch); return r;
  }), [text]);
  // phase : "idle" (rouleau en haut, invisible) → "run" (défile jusqu'à la lettre)
  const [phase, setPhase] = React.useState<"idle" | "run">("idle");
  const [fast, setFast] = React.useState(false);
  React.useEffect(() => {
    if (!play) { setPhase("idle"); return; }
    setFast(false); setPhase("idle");
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("run")));
    return () => cancelAnimationFrame(id);
  }, [play]);
  const replay = () => {
    if (!play || reduce) return;
    setFast(true); setPhase("idle");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("run")));
  };
  const run = phase === "run";
  return (
    <span className={cn("group/name relative inline-flex", indent && "pl-[.9em]", className)} aria-label={text} onMouseEnter={replay}>
      {letters.map((ch, i) => {
        const reel = reels[i]; const n = reel.length - 1;
        const d = fast ? i * 0.025 : delay + i * 0.055;
        const dur = fast ? 0.55 : 1.05 + i * 0.04;
        return (
          <span key={i} aria-hidden className="relative inline-block h-[1.02em] align-top leading-[1.02em]" style={{ clipPath: "inset(0 -60% 0 -60%)" }}>
            {/* la vraie lettre, invisible, donne la largeur : l'espacement reste juste */}
            <span className="invisible block h-[1.02em]">{ch === " " ? "\u00a0" : ch}</span>
            <span className="absolute left-1/2 top-0 block w-[2em] text-center will-change-transform"
              style={{
                transform: `translateX(-50%) ${reduce ? `translateY(-${(n / (n + 1)) * 100}%)` : run ? `translateY(-${(n / (n + 1)) * 100}%)` : "translateY(0%)"}`,
                transition: reduce || !run ? "none" : `transform ${dur}s cubic-bezier(.16,1,.3,1) ${d}s`,
              }}>
              {reel.map((c, k) => (
                <span key={k} className={cn("block h-[1.02em]", k === n ? "gold-chrome" : "opacity-40")}>{c === " " ? "\u00a0" : c}</span>
              ))}
            </span>
          </span>
        );
      })}
      {line && (
        <span aria-hidden className="absolute -bottom-[.08em] left-0 h-px w-full origin-left bg-gold"
          style={{ transform: run || reduce ? "scaleX(1)" : "scaleX(0)", transition: run ? `transform 1.1s cubic-bezier(.77,0,.175,1) ${delay + letters.length * 0.055 + 0.4}s` : "none" }} />
      )}
    </span>
  );
}
