import * as React from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/* Animations de texte, chacune d'après un composant de 21st.dev (mécanique reprise, rendu à nos couleurs). */
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = [0.16, 1, 0.3, 1] as const;

/** Stroke Draw Type (@isaiahbjork) : le contour se dessine, puis la lettre se remplit. */
export function StrokeDraw({ text, className, delay = 0.2 }: { text: string; className?: string; delay?: number }) {
  const ref = React.useRef<SVGTextElement>(null);
  const [box, setBox] = React.useState({ w: 1000, h: 200, y: 160 });
  React.useLayoutEffect(() => {
    const t = ref.current; if (!t) return;
    const fit = () => { const b = t.getBBox(); setBox({ w: Math.ceil(b.width + 8), h: Math.ceil(b.height), y: Math.ceil(-b.y) }); };
    fit(); document.fonts?.ready.then(fit);
  }, [text]);
  const r = reduced();
  return (
    <svg className={cn("block h-auto w-full overflow-visible", className)} viewBox={`0 0 ${box.w} ${box.h}`} role="img" aria-label={text}>
      <text ref={ref} x="4" y={box.y} className="fx-stroke" style={{ font: "inherit", fontSize: 200, letterSpacing: "inherit" }}
        fill="currentColor" stroke="currentColor" strokeWidth={1.4}
        strokeDasharray="900" strokeDashoffset={r ? 0 : 900}
        fillOpacity={r ? 1 : 0}>
        {!r && <animate attributeName="stroke-dashoffset" from="900" to="0" dur="2.2s" begin={`${delay}s`} fill="freeze" calcMode="spline" keySplines=".16 1 .3 1" keyTimes="0;1" />}
        {!r && <animate attributeName="fill-opacity" from="0" to="1" dur="1.1s" begin={`${delay + 1.5}s`} fill="freeze" />}
        {text}
      </text>
    </svg>
  );
}

/** Fluid Text Morph (@dhileepkumargm) : un mot se fond dans le suivant (flou + seuil). */
export function TextMorph({ words, className, every = 2600 }: { words: string[]; className?: string; every?: number }) {
  const [i, setI] = React.useState(0);
  const a = React.useRef<HTMLSpanElement>(null), b = React.useRef<HTMLSpanElement>(null);
  const id = React.useId().replace(/:/g, "");
  const iRef = React.useRef(0); iRef.current = i;
  const key = words.join("|");
  React.useEffect(() => {
    if (reduced()) return;
    let raf = 0, t0 = performance.now(), cur = iRef.current;
    const morph = 0.9;
    const tick = (t: number) => {
      const e = (t - t0) / 1000; const hold = every / 1000;
      const A = a.current!, B = b.current!;
      if (e > hold) {
        const f = Math.min(1, (e - hold) / morph);
        const set = (el: HTMLElement, v: number) => { el.style.filter = v <= 0.001 ? "" : `blur(${Math.min(8 / v - 8, 100)}px)`; el.style.opacity = `${Math.pow(v, 0.4) * 100}%`; };
        set(B, f); set(A, 1 - f);
        if (f >= 1) { cur = (cur + 1) % words.length; setI(cur); t0 = t; A.style.filter = ""; A.style.opacity = "100%"; B.style.opacity = "0%"; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, every]);
  return (
    <span className={cn("relative inline-grid", className)} style={{ filter: `url(#${id})` }} aria-live="off">
      <svg className="absolute h-0 w-0" aria-hidden><filter id={id}><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" /></filter></svg>
      <span ref={a} className="col-start-1 row-start-1">{words[i]}</span>
      <span ref={b} className="col-start-1 row-start-1" style={{ opacity: 0 }} aria-hidden>{words[(i + 1) % words.length]}</span>
      {/* largeur stable : le mot le plus long, invisible */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>{[...words].sort((x, y) => y.length - x.length)[0]}</span>
    </span>
  );
}

/** Word Pull Up (@dillionverma) : les mots remontent un par un. */
export function WordPullUp({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[.08em] align-bottom [margin-right:.24em]">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={inView || reduced() ? { y: "0%" } : {}} transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.08 }}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

/** Vertical Cut Reveal (@cnippet-dev) : les lettres montent à travers une découpe, depuis le centre. */
export function VerticalCut({ text, className, delay = 0.2 }: { text: string; className?: string; delay?: number }) {
  const chars = Array.from(text); const mid = (chars.length - 1) / 2;
  return (
    <span className={cn("inline-flex flex-wrap justify-center", className)} aria-label={text}>
      {chars.map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[.1em]">
          <motion.span className="inline-block" initial={reduced() ? false : { y: "105%" }} animate={{ y: "0%" }}
            transition={{ type: "spring", stiffness: 190, damping: 26, delay: delay + Math.abs(i - mid) * 0.035 }}>{c === " " ? " " : c}</motion.span>
        </span>
      ))}
    </span>
  );
}

/** Layered Text (@xubohuah) : copies empilées en profondeur, qui s'écartent au survol. */
export function LayeredText({ text, className, layers = 5 }: { text: string; className?: string; layers?: number }) {
  const [hover, setHover] = React.useState(false);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { const id = setTimeout(() => setOn(true), 300); return () => clearTimeout(id); }, []);
  const spread = hover ? 1.6 : on ? 1 : 0;
  return (
    <span className={cn("relative inline-block", className)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label={text}>
      {Array.from({ length: layers }).map((_, k) => (
        <span key={k} aria-hidden className="absolute left-0 top-0 select-none text-transparent transition-transform duration-700 ease-out"
          style={{ WebkitTextStroke: "1px rgba(201,180,140,.55)", opacity: 1 - (k + 1) / (layers + 1), transform: `translate(${(k + 1) * 0.045 * spread}em, ${(k + 1) * 0.05 * spread}em)`, transitionDelay: `${k * 40}ms`, zIndex: -k - 1 }}>{text}</span>
      ))}
      <span className="relative">{text}</span>
    </span>
  );
}

/** Motion Blur Text (@asanshay) : chaque lettre arrive avec un flou de vitesse horizontal. */
export function MotionBlurText({ text, className }: { text: string; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  const blur = React.useRef<SVGFEGaussianBlurElement>(null);
  React.useEffect(() => {
    if (reduced() || !blur.current) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const f = Math.min(1, (t - t0) / 900); const e = 1 - Math.pow(1 - f, 3); blur.current?.setAttribute("stdDeviation", `${(1 - e) * 26} 0`); if (f < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [text]);
  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      <svg className="absolute h-0 w-0" aria-hidden><filter id={id} x="-50%" width="200%"><feGaussianBlur ref={blur} stdDeviation="0 0" /></filter></svg>
      <span className="inline-flex" style={{ filter: `url(#${id})` }} aria-hidden>
        {Array.from(text).map((c, i) => (
          <motion.span key={text + i} className="inline-block" initial={reduced() ? false : { x: "1.4em", opacity: 0 }} animate={{ x: "0em", opacity: 1 }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.035 }}>{c === " " ? " " : c}</motion.span>
        ))}
      </span>
    </span>
  );
}

/** Text Shimmer Wave (@ibelick) : les lettres ondulent comme une onde sonore, un reflet les traverse. */
export function ShimmerWave({ text, className }: { text: string; className?: string }) {
  const r = reduced();
  return (
    <span className={cn("inline-flex", className)} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden className="fx-wave inline-block" style={r ? undefined : { animationDelay: `${i * 0.07}s` }}>{c === " " ? " " : c}</span>
      ))}
    </span>
  );
}

/** Text Rotate (@danielpetho) : un mot remplace l'autre, lettre par lettre, avec un ressort. */
export function TextRotate({ words, className, every = 2200 }: { words: string[]; className?: string; every?: number }) {
  const [i, setI] = React.useState(0);
  const n = words.length;
  React.useEffect(() => { if (reduced()) return; const id = setInterval(() => setI((x) => (x + 1) % n), every); return () => clearInterval(id); }, [n, every]);
  const w = words[i];
  return (
    <motion.span layout className={cn("relative inline-flex overflow-hidden pb-[.12em] align-bottom", className)} transition={{ type: "spring", damping: 30, stiffness: 300 }} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={w} className="inline-flex" aria-label={w}>
          {Array.from(w).map((c, k) => (
            <motion.span key={k} aria-hidden className="inline-block" initial={{ y: "110%" }} animate={{ y: "0%" }} exit={{ y: "-120%" }}
              transition={{ type: "spring", damping: 26, stiffness: 380, delay: k * 0.025 }}>{c === " " ? " " : c}</motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/** Text Highlight (@animbits) : un surligneur passe derrière les mots. */
export function Highlight({ children, className, delay = 0.6 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={cn("box-decoration-clone bg-no-repeat px-[.08em] [background-image:linear-gradient(transparent_58%,rgba(201,180,140,.38)_58%,rgba(201,180,140,.38)_92%,transparent_92%)]", className)}
      style={{ backgroundSize: inView || reduced() ? "100% 100%" : "0% 100%", transition: `background-size 1.2s cubic-bezier(.77,0,.175,1) ${delay}s` }}>{children}</span>
  );
}

/** Gradual Spacing (@dillionverma) : l'espacement des lettres s'ouvre à l'apparition. */
export function GradualSpacing({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={cn("inline-flex", className)} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <motion.span key={i} aria-hidden className="inline-block" initial={reduced() ? false : { opacity: 0, x: -18 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: delay + i * 0.03 }}>{c === " " ? " " : c}</motion.span>
      ))}
    </span>
  );
}
