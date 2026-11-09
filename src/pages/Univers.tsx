import * as React from "react";
import { MotionBlurText, ShimmerWave } from "@/components/ui/text-fx";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { useGsap, gsap, reduceMotion } from "@/lib/use-gsap";
import { GENRES, TRACKS } from "@/data";
import { MeshBg, Kicker } from "@/components/site";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { cn } from "@/lib/utils";

type G = (typeof GENRES)[number];

function Sleeve({ g, big = false }: { g: G; big?: boolean }) {
  const [c0, c1, c2, c3] = g.colors;
  return (
    <div className={cn("relative aspect-square overflow-hidden", big ? "shadow-[0_50px_100px_-30px_rgba(0,0,0,.95)]" : "")}
      style={{ background: `radial-gradient(120% 90% at 85% 10%, ${c3} 0%, ${c2} 22%, ${c1} 55%, ${c0} 100%)` }}>
      <div className="absolute inset-0 opacity-[.18] mix-blend-overlay [background:repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_6px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.22)_0%,transparent_30%,transparent_70%,rgba(0,0,0,.35)_100%)]" />
      {big ? (
        <>
          <span className="lab absolute left-[6%] top-[6%] text-white/80">Heaven &amp; Voice</span>
          <span className="lab absolute right-[6%] top-[6%] text-white/80">Vol. {g.n}</span>
          <span className="absolute -bottom-[.12em] left-[4%] font-display text-[clamp(90px,14vw,230px)] font-extrabold leading-none tracking-[-.015em] text-white/90 mix-blend-overlay">{g.n}</span>
          <span className="absolute bottom-[8%] right-[6%] max-w-[60%] text-right font-serif text-[clamp(24px,2.6vw,40px)] leading-none text-white">{g.t}</span>
        </>
      ) : (
        <span className="absolute bottom-2 left-2 font-display text-[22px] font-extrabold leading-none tracking-[-.015em] text-white/90">{g.n}</span>
      )}
    </div>
  );
}

function Vinyl({ g, spinning }: { g: G; spinning: boolean }) {
  return (
    <div className="relative aspect-square rounded-full shadow-[0_30px_70px_-20px_rgba(0,0,0,.9)]"
      style={{ background: "repeating-radial-gradient(circle at 50% 50%, #07080B 0 1.2px, #14161C 1.6px 2.6px), #0B0C10" }}>
      <div className="absolute inset-0 rounded-full" style={{ animation: spinning && !reduceMotion() ? "spin 2.4s linear infinite" : "none" }}>
        <div className="absolute inset-[34%] grid place-items-center rounded-full" style={{ background: `radial-gradient(circle, ${g.label} 0%, ${g.colors[2]} 100%)` }}>
          <span className="absolute top-[18%] font-mono text-[clamp(6px,.7vw,9px)] uppercase tracking-[.2em] text-night-950/80">H&amp;V Family</span>
          <span className="font-serif text-[clamp(11px,1.3vw,18px)] leading-none text-night-950">{g.t}</span>
          <span className="absolute bottom-[16%] font-mono text-[clamp(6px,.7vw,9px)] text-night-950/70">33 ⅓</span>
          <span className="absolute h-[9%] w-[9%] rounded-full bg-night-950" />
        </div>
      </div>
      {/* reflets spéculaires fixes : le disque tourne dessous */}
      <div className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen" style={{ background: "conic-gradient(from 40deg, transparent 0deg, rgba(255,255,255,.22) 18deg, transparent 40deg, transparent 180deg, rgba(255,255,255,.16) 200deg, transparent 222deg)" }} />
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
    </div>
  );
}

export default function Univers() {
  const root = React.useRef<HTMLDivElement>(null);
  const [gi, setGi] = React.useState(0);
  const [out, setOut] = React.useState(true);
  const [playing, setPlaying] = React.useState<number | null>(null);
  const [prog, setProg] = React.useState(0);
  const audio = React.useRef<HTMLVideoElement>(null);
  const g = GENRES[gi];

  const pick = (i: number) => {
    if (i === gi) return;
    if (reduceMotion()) { setGi(i); return; }
    setOut(false);
    setTimeout(() => { setGi(i); setOut(true); }, 520);
  };

  const toggle = (i: number) => {
    const t = TRACKS[i]; const v = audio.current; if (!t.src || !v) return;
    if (playing === i) { v.pause(); setPlaying(null); return; }
    v.src = t.src; v.currentTime = t.src.includes("gloria") ? 5 : 0; v.muted = false; v.volume = 0.8;
    v.play().then(() => setPlaying(i)).catch(() => setPlaying(null));
  };
  React.useEffect(() => () => audio.current?.pause(), []);

  useGsap(root, (reduce) => {
    if (reduce) return;
    gsap.from(".u-rack button", { y: 60, opacity: 0, duration: 1.1, stagger: 0.06, ease: "expo.out", delay: 0.3 });
    gsap.from(".trk", { opacity: 0, y: 30, duration: 1, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: ".trks", start: "top 85%" } });
  });

  return (
    <div ref={root} className="bg-night-950">
      <section className="relative min-h-[100svh] overflow-hidden pb-10 pt-[110px]" aria-label="Univers musical">
        <MeshBg colors={[...g.colors]} speed={0.3} distortion={0.95} swirl={0.5} className="transition-opacity duration-500" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,13,.55),transparent_30%,transparent_65%,rgba(2,5,13,.9))]" />
        <div className="grain absolute inset-0" />

        <div className="wrap relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="relative z-10">
            <div className="flex items-center justify-between"><Kicker n={`${g.n} / 06`}>Univers musical</Kicker></div>
            <AnimatePresence mode="wait">
              <motion.div key={g.k} initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(8px)" }} transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}>
                <h1 className="mt-6 font-display text-[clamp(52px,7.6vw,150px)] font-light leading-[.92] tracking-[-.015em]"><span className="gold-chrome"><MotionBlurText key={g.k} text={g.t} /></span></h1>
                <p className="mt-3 font-serif text-[clamp(26px,3vw,46px)] leading-none text-ivory">{g.s}</p>
                <p className="mt-8 max-w-[440px] font-sans text-[17px] leading-relaxed text-ivory/85">{g.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">{g.when.map((w) => <span key={w} className="lab rounded-full border border-white/30 bg-night-950/30 px-3 py-1.5 text-ivory backdrop-blur-sm">{w}</span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto aspect-[1.55/1] w-full max-w-[720px]">
            <motion.div className="absolute right-[2%] top-[4%] w-[56%]" animate={{ x: out ? "0%" : "-62%", rotate: out ? 0 : -40 }} transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}>
              <Vinyl g={g} spinning={out} />
            </motion.div>
            <AnimatePresence mode="popLayout">
              <motion.div key={g.k} className="absolute left-0 top-0 w-[64%]" initial={{ rotateY: -70, x: "-30%", opacity: 0 }} animate={{ rotateY: 0, x: "0%", opacity: 1 }} exit={{ rotateY: 60, x: "-20%", opacity: 0 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ transformPerspective: 1200 }}>
                <Sleeve g={g} big />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="wrap relative z-10 mt-10">
          <div className="lab mb-3 flex justify-between text-ivory/70"><span>Choisissez un disque</span><span className="max-sm:hidden">6 genres · un même collectif</span></div>
          <div className="u-rack grid grid-cols-6 gap-2 max-md:flex max-md:overflow-x-auto max-md:pb-2">
            {GENRES.map((x, i) => (
              <button key={x.k} onClick={() => pick(i)} aria-pressed={i === gi} aria-label={`${x.t} ${x.s}`}
                className={cn("group relative shrink-0 text-left transition-transform duration-500 ease-out max-md:w-[38vw]", i === gi ? "-translate-y-3" : "hover:-translate-y-1.5")}>
                <div className={cn("ring-1 transition-[box-shadow]", i === gi ? "ring-gold shadow-[0_20px_40px_-15px_rgba(201,180,140,.6)]" : "ring-white/10")}><Sleeve g={x} /></div>
                <span className={cn("mt-2 block font-sans text-[13px] font-bold uppercase tracking-[.02em]", i === gi ? "text-gold" : "text-ivory/80")}>{x.t}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap relative py-28" aria-label="Répertoire">
        <div className="mb-12 grid gap-8 md:grid-cols-[minmax(0,.9fr)_minmax(0,1fr)] md:items-end">
          <div><Kicker n="—">Répertoire</Kicker><h2 className="mt-5 font-display text-[clamp(48px,7vw,124px)] font-light leading-[.92] tracking-[-.015em] text-ivory">À écouter<br /><span className="font-serif font-light normal-case italic"><span className="gold-chrome"><ShimmerWave text="tout de suite." /></span></span></h2></div>
          <div className="grid gap-4 font-sans text-[15px] leading-relaxed text-ivory/75 sm:grid-cols-2">
            <p><span className="lab mb-2 block text-gold">Reprises</span>Des titres connus, réarrangés pour les voix du collectif. Liste à fournir.</p>
            <p><span className="lab mb-2 block text-gold">Créations originales</span>Compositions du collectif, en studio et sur scène. Liste à fournir.</p>
          </div>
        </div>
        <video ref={audio} className="hidden" playsInline onTimeUpdate={(e) => { const v = e.currentTarget; setProg(v.duration ? v.currentTime / v.duration : 0); }} onEnded={() => setPlaying(null)} />
        <ol className="trks border-t border-gold/25">
          {TRACKS.map((t, i) => (
            <li key={t.n} className={cn("trk group relative grid grid-cols-[44px_minmax(0,1fr)_auto_52px] items-center gap-4 border-b border-gold/20 py-5 md:grid-cols-[70px_minmax(0,1fr)_160px_70px_56px]", !t.src && "opacity-50")}>
              {playing === i && <span className="absolute bottom-[-1px] left-0 h-px bg-gold" style={{ width: `${prog * 100}%` }} />}
              <span className="lab text-gold">{t.n}</span>
              <span className="flex min-w-0 items-center gap-4">
                <span className={cn("truncate font-display text-[clamp(24px,2.6vw,40px)] font-normal tracking-[-.01em]", playing === i ? "gold-chrome" : "text-ivory")}>{t.t}</span>
                {playing === i && <span className="flex h-4 items-end gap-[3px]" aria-hidden>{[0, 1, 2, 3].map((b) => <i key={b} className="w-[3px] origin-bottom bg-gold" style={{ height: "100%", animation: `eq .${6 + b}s ease-in-out ${b * 0.1}s infinite alternate` }} />)}</span>}
              </span>
              <span className="lab text-mist max-md:hidden">{t.g}</span>
              <span className="lab text-mist">{t.dur}</span>
              <button onClick={() => toggle(i)} disabled={!t.src} aria-label={playing === i ? `Pause ${t.t}` : `Écouter ${t.t}`}
                className={cn("grid h-11 w-11 place-items-center rounded-full", t.src ? "metal" : "border border-gold/20 text-mist")}>
                {playing === i ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[520px] font-sans font-light text-[clamp(22px,2.2vw,32px)] leading-snug text-ivory">Un titre précis pour votre cérémonie ? Le collectif peut l'arranger.</p>
          <LiquidMetalButton href="#reservation">Proposer un titre <ArrowUpRight /></LiquidMetalButton>
        </div>
      </section>
    </div>
  );
}
