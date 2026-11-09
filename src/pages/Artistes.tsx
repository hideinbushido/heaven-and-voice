import * as React from "react";
import { useGsap, gsap, ScrollTrigger, reduceMotion } from "@/lib/use-gsap";
import { MEMBERS } from "@/data";
import { NameReveal } from "@/components/ui/name-reveal";
import { LenisCtx } from "@/lib/lenis-ctx";
import { cn } from "@/lib/utils";

const WIPE: Record<string, string> = { l: "inset(0% 0% 0% 100%)", u: "inset(100% 0% 0% 0%)", d: "inset(0% 0% 100% 0%)", f: "inset(0% 100% 0% 0%)" };
const FULL = "inset(0% 0% 0% 0%)";

function Screen({ m, on, prev }: { m: (typeof MEMBERS)[number]; on: boolean; prev: boolean }) {
  const parts =
    m.L === "a" ? (<><div className="b1 ph light" data-w="l" data-ph="Portrait buste · fond ivoire" /><div className="b2 ph light" data-w="u" data-ph="Plan serré · fond ivoire" /></>)
    : m.L === "b" ? (<><div className="cu ph" data-w="f" data-ph="Très gros plan (regard) · à fournir" /><div className="pn" data-w="l"><div className="b1 ph light" data-ph="Portrait · fond ivoire" /></div></>)
    : (<><div className="cu ph" data-w="f" data-ph="Profil en très gros plan · à fournir" /><div className="k1" data-w="d" /><div className="b1 ph light" data-w="u" data-ph="Portrait buste · fond ivoire" /></>);
  return (
    <article className={cn("mb", `L-${m.L}`, on && "on", prev && "prev")} aria-label={`${m.f} ${m.l}, ${m.r.join(", ")}`} aria-hidden={!on}>
      {parts}
      <h2 className="mb-name">
        <NameReveal text={m.f.toUpperCase()} play={on} delay={0.35} />
        <NameReveal text={m.l.toUpperCase()} play={on} delay={0.5} indent line />
      </h2>
      <div className="mb-roles lab"><ul>{m.r.map((x) => <li key={x}>{x}</li>)}</ul><span className="sn">(    SN    )</span></div>
    </article>
  );
}

export default function Artistes() {
  const root = React.useRef<HTMLDivElement>(null);
  const lenis = React.useContext(LenisCtx);
  const [cur, setCur] = React.useState(0);
  const prevRef = React.useRef(-1);
  const [prev, setPrev] = React.useState(-1);
  const st = React.useRef<ScrollTrigger | null>(null);
  const [introOn, setIntroOn] = React.useState(false);
  React.useEffect(() => { const id = setTimeout(() => setIntroOn(true), 250); return () => clearTimeout(id); }, []);

  useGsap(root, (reduce) => {
    st.current = ScrollTrigger.create({ trigger: ".t-scene", start: "top top", end: "bottom bottom",
      onUpdate: (s) => setCur(Math.min(MEMBERS.length - 1, Math.floor(s.progress * MEMBERS.length))) });
    if (reduce) return;
    gsap.to(".ar-bg", { scale: 1.1, ease: "none", scrollTrigger: { trigger: ".ar-intro", start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".collab-g > *", { opacity: 0, y: 40, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".collab-g", start: "top 85%" } });
  });

  // transition entre deux membres : l'écran puis ses blocs glissent
  React.useLayoutEffect(() => {
    const p = prevRef.current; setPrev(p); prevRef.current = cur;
    const el = root.current?.querySelectorAll<HTMLElement>(".mb")[cur];
    if (!el) return;
    const parts = el.querySelectorAll<HTMLElement>("[data-w]");
    if (p < 0 || reduceMotion()) { gsap.set([el, ...parts], { clipPath: FULL }); return; }
    gsap.fromTo(el, { clipPath: cur > p ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }, { clipPath: FULL, duration: 0.85, ease: "expo.inOut", overwrite: true });
    parts.forEach((b, j) => gsap.fromTo(b, { clipPath: WIPE[b.dataset.w || "u"] }, { clipPath: FULL, duration: 1, ease: "expo.inOut", delay: 0.2 + j * 0.12, overwrite: true }));
    gsap.fromTo(el.querySelector(".mb-roles"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.75, ease: "power2.out", overwrite: true });
  }, [cur]);

  const goTo = (i: number) => {
    const s = st.current; if (!s) return;
    const y = s.start + (s.end - s.start) * ((i + 0.5) / MEMBERS.length);
    lenis ? lenis.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div ref={root} className="bg-night-950">
      <section className="ar-intro relative grid h-[100svh] place-items-center overflow-hidden" aria-label="Nos artistes">
        <img src="m/six.jpg" alt="" className="ar-bg absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.3)_brightness(.6)] [object-position:50%_30%]" />
        <div className="absolute inset-0 mix-blend-multiply bg-[radial-gradient(80%_70%_at_50%_45%,#2C5BD6,#0A1836_55%,#02050D)]" />
        <div className="grain absolute inset-0" />
        <div className="wrap absolute inset-x-0 top-[96px] flex justify-between border-b border-gold/30 pb-3"><span className="lab text-ivory/75">Heaven &amp; Voice</span><span className="lab text-ivory/75">6 membres permanents</span></div>
        <h1 className="relative z-10 text-center font-display text-[clamp(52px,11vw,200px)] font-light leading-[.92] tracking-[-.015em]">
          <NameReveal text="NOS" play={introOn} className="justify-center" /><br />
          <NameReveal text="ARTISTES" play={introOn} delay={0.2} className="justify-center" />
        </h1>
        <div className="wrap absolute inset-x-0 bottom-20 flex justify-between"><span className="lab text-ivory/75">Noms fictifs · photos à fournir</span><span className="lab text-ivory/75">Faites défiler ↓</span></div>
      </section>

      <section className="t-scene relative h-[720vh]" aria-label="Les six membres">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-night-950">
          {MEMBERS.map((m, i) => <Screen key={m.f} m={m} on={i === cur} prev={i === prev && i !== cur} />)}
          <div className="wrap pointer-events-none absolute inset-x-0 top-[84px] z-10 flex justify-between"><span className="lab text-ivory/75">Heaven &amp; Voice · Nos artistes</span>
            <span className="lab text-gold">{String(cur + 1).padStart(2, "0")} / 06</span></div>
          <div className="wrap absolute inset-x-0 bottom-16 z-10 flex items-end justify-between gap-4">
            <div className="flex gap-1">
              {MEMBERS.map((m, i) => (
                <button key={m.f} onClick={() => goTo(i)} aria-label={`${m.f} ${m.l}`} className={cn("lab w-[42px] border-t-2 pt-2 text-left transition-colors max-md:w-[30px]", i === cur ? "border-gold text-gold" : "border-ivory/20 text-ivory/45")}>{String(i + 1).padStart(2, "0")}</button>
              ))}
            </div>
            <span className="lab text-ivory/50 max-md:hidden">Survolez un nom</span>
          </div>
        </div>
      </section>

      <section className="wrap py-28" aria-label="Artistes collaborateurs">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(40px,5.6vw,96px)] font-light leading-[.92] tracking-[-.015em] text-ivory">Les <span className="font-serif font-light normal-case italic"><span className="gold-chrome">invités</span></span></h2>
          <p className="max-w-[460px] font-sans text-[15px] leading-relaxed text-ivory/70">Selon le projet, le collectif s'entoure de musiciens, de voix supplémentaires et de solistes.</p>
        </div>
        <div className="collab-g grid grid-cols-2 gap-[6px] md:grid-cols-4">{[1, 2, 3, 4].map((i) => <div key={i} className="ph light aspect-[3/4]" data-ph="Collaborateur · à venir" />)}</div>
      </section>
    </div>
  );
}
