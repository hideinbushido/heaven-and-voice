import * as React from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";
import { reduceMotion } from "@/lib/use-gsap";

/** Fond en dégradé animé (Mesh Gradient, Paper Shaders / 21st.dev) */
export function MeshBg({ colors, className, speed = 0.25, distortion = 0.9, swirl = 0.35 }: { colors: string[]; className?: string; speed?: number; distortion?: number; swirl?: number }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <MeshGradient style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} colors={colors} distortion={distortion} swirl={swirl} grainMixer={0.15} grainOverlay={0.12} speed={reduceMotion() ? 0 : speed} />
    </div>
  );
}

export function Kicker({ n, children, className }: { n?: string; children: React.ReactNode; className?: string }) {
  return <div className={cn("lab flex items-center gap-3 text-mist", className)}>{n && <span className="text-gold">{n}</span>}<span className="h-px w-8 bg-gold/50" />{children}</div>;
}

export function Marquee({ children, className, speed = 30 }: { children: React.ReactNode; className?: string; speed?: number }) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div className="flex shrink-0 whitespace-nowrap" style={{ animation: `marquee ${speed}s linear infinite` }}>{children}{children}</div>
    </div>
  );
}

/** Texte qui s'allume mot à mot au défilement (Utopia) */
export function RevealWords({ text, className }: { text: string; className?: string }) {
  return <p className={cn("reveal", className)}>{text.split(" ").map((w, i) => <span key={i} className="inline-block opacity-20 [margin-right:.26em]" data-w>{w}</span>)}</p>;
}
