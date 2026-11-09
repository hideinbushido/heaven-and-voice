import * as React from "react";
import { LiquidMetal } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

/* Bouton en or liquide (d'après « Liquid Metal Button », 21st.dev / Paper Shaders) */
type Props = { children: React.ReactNode; href?: string; onClick?: () => void; size?: "sm" | "md" | "lg"; className?: string; type?: "button" | "submit" };
export function LiquidMetalButton({ children, href, onClick, size = "md", className, type = "button" }: Props) {
  const [hover, setHover] = React.useState(false);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const h = size === "sm" ? "h-10 px-5 text-[11px]" : size === "lg" ? "h-[60px] px-9 text-[13px]" : "h-12 px-7 text-[12px]";
  const inner = (
    <>
      {/* anneau en or liquide (shader) */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <LiquidMetal style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          colorBack="#4A3D26" colorTint="#F1E6CC" shape="none" repetition={1.6} softness={0.45}
          shiftRed={0.1} shiftBlue={0.03} distortion={0.08} contour={0} angle={hover ? 120 : 70}
          speed={reduce ? 0 : hover ? 2 : 0.7} scale={1} />
      </span>
      {/* surface en métal brossé, en relief */}
      <span className={cn("metal pointer-events-none absolute inset-[3px] rounded-full !shadow-[inset_0_1px_0_rgba(255,255,255,.85),inset_0_-2px_0_rgba(60,32,4,.5)] transition-[filter] duration-300", hover && "brightness-110")} />
      <span className="relative z-[1] flex items-center gap-2 font-ui font-semibold uppercase tracking-[.14em] text-night-950 [text-shadow:0_1px_0_rgba(255,240,200,.55)]">{children}</span>
    </>
  );
  const cls = cn("group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full transition-transform duration-150 ease-out active:translate-y-px active:scale-[.985] shadow-[0_14px_40px_-14px_rgba(201,180,140,.7)]", h, className);
  const ev = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), onFocus: () => setHover(true), onBlur: () => setHover(false) };
  return href ? <a href={href} className={cls} {...ev}>{inner}</a> : <button type={type} onClick={onClick} className={cls} {...ev}>{inner}</button>;
}
