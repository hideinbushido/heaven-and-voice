import * as React from "react";
import { TextRotate } from "@/components/ui/text-fx";
import { ArrowUpRight, Plus } from "lucide-react";
import { useGsap, gsap } from "@/lib/use-gsap";
import { PRESTA } from "@/data";
import { MeshBg, Kicker } from "@/components/site";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Sticker } from "@/components/ui/sticker";

const TILT = [-7, 5, -4, 8, -9, 4];

const FORMATS = [
  { t: "Duo", n: 2, d: "Deux voix, ou voix et clavier. Pour une cérémonie intime." },
  { t: "Trio", n: 3, d: "Trois voix en harmonie : cocktail, bénédiction, dîner." },
  { t: "Le collectif", n: 6, d: "Les six membres permanents, pour un concert ou une grande fête." },
  { t: "Formation élargie", n: 9, d: "Le collectif avec musiciens et voix invités." },
];

export default function Prestations() {
  const root = React.useRef<HTMLDivElement>(null);
  const [hov, setHov] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<number | null>(0);

  useGsap(root, (reduce) => {
    if (reduce) return;
    gsap.from(".p-h > *", { opacity: 0, y: 50, duration: 1.3, stagger: 0.1, ease: "expo.out", delay: 0.2 });
    gsap.from(".p-row", { opacity: 0, y: 40, duration: 1.1, stagger: 0.07, ease: "expo.out", delay: 0.4 });
    gsap.from(".fmt", { opacity: 0, y: 50, duration: 1.1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".fmts", start: "top 80%" } });
  });

  return (
    <div ref={root} className="bg-night-950">
      <section className="wrap relative pb-20 pt-[150px]" aria-label="Prestations et événements">
        <div className="p-h grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,.5fr)] md:items-end">
          <h1 className="font-display text-[clamp(56px,9vw,170px)] font-light leading-[.92] tracking-[-.015em] text-ivory">Pour quel<br /><span className="font-serif font-light normal-case italic tracking-[-.015em]"><span className="gold-chrome"><TextRotate words={["moment ?", "mariage ?", "gala ?", "concert ?", "baptême ?", "anniversaire ?"]} /></span></span></h1>
          <div><Kicker n="06">Prestations &amp; événements</Kicker><p className="mt-5 font-sans text-[16px] leading-relaxed text-ivory/75">Six occasions. Pour chacune, une formation et un répertoire adaptés. Ouvrez une ligne pour le détail.</p></div>
        </div>
      </section>

      <section className="wrap pb-28" aria-label="Liste des prestations">
        <ul className="border-t border-gold/25" onPointerLeave={() => setHov(null)}>
          {PRESTA.map((p, i) => (
            <li key={p.t} className="p-row border-b border-gold/25">
              <button className="group relative grid w-full grid-cols-[50px_minmax(0,1fr)_44px] items-center gap-4 py-6 text-left md:grid-cols-[80px_minmax(0,1fr)_56px]" onPointerEnter={() => setHov(i)} onFocus={() => setHov(i)} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="lab text-gold">0{i + 1}</span>
                <span className="relative block overflow-hidden pt-[.24em] pb-[.06em]">
                  <span className={cn("block font-display text-[clamp(30px,5vw,88px)] leading-[1.12] tracking-[-.015em] transition-transform duration-500 ease-out", open === i ? "text-gold" : "text-ivory")} style={{ transform: hov === i ? "translateY(-140%)" : "none" }}>{p.t}</span>
                  <span aria-hidden className="absolute inset-x-0 top-[.24em] block font-display text-[clamp(30px,5vw,88px)] leading-[1.12] tracking-[-.015em] text-gold transition-transform duration-500 ease-out" style={{ transform: hov === i ? "none" : "translateY(140%)" }}>{p.t}</span>
                </span>
                <span className={cn("grid h-11 w-11 place-items-center rounded-full transition-transform duration-500", open === i ? "metal rotate-45" : "border border-gold/40 text-gold")}><Plus className="h-4 w-4" /></span>
                <AnimatePresence>
                  {hov === i && (
                    <motion.span key={p.t} className="pointer-events-none absolute right-[12%] top-1/2 z-20 hidden w-[clamp(200px,19vw,300px)] md:block"
                      initial={{ opacity: 0, scale: 0.5, rotate: -28, y: "-30%" }} animate={{ opacity: 1, scale: 1, rotate: TILT[i], y: "-50%" }} exit={{ opacity: 0, scale: 0.7, rotate: TILT[i] + 14, y: "-75%" }}
                      transition={{ type: "spring", duration: 0.55, bounce: 0.38 }}>
                      <Sticker src={p.img} className="aspect-[4/3] w-full" fold={38} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 md:ml-[96px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
                    <p className="font-sans text-[17px] leading-relaxed text-ivory/85">{p.d}</p>
                    <Sticker src={p.img} className="aspect-[16/10] w-full max-w-[320px] rotate-[-3deg] md:hidden" fold={30} />
                    <p className="lab text-mist">Formation conseillée : selon le lieu et le nombre d'invités</p>
                    <LiquidMetalButton href="#reservation" size="sm">Demander un devis <ArrowUpRight /></LiquidMetalButton>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="fmts relative overflow-hidden py-28" aria-label="Formations">
        <MeshBg colors={["#02050D", "#0A1836", "#12285A", "#56482F"]} speed={0.15} />
        <div className="wrap relative">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(44px,6.4vw,110px)] font-light leading-[.92] tracking-[-.015em] text-ivory">De deux<br /><span className="font-serif font-light normal-case italic"><span className="gold-chrome">à neuf voix et plus.</span></span></h2>
            <p className="max-w-[380px] font-sans text-[15px] leading-relaxed text-ivory/75">La formation se choisit avec vous, selon la salle, le moment et le budget.</p>
          </div>
          <div className="grid gap-[6px] md:grid-cols-4">
            {FORMATS.map((f) => (
              <div key={f.t} className="fmt relative border border-gold/25 bg-night-950/55 p-6 backdrop-blur-md">
                <div className="flex flex-wrap gap-1.5">{Array.from({ length: 9 }).map((_, k) => <span key={k} className={cn("h-3 w-3 rounded-full", k < f.n ? "metal" : "border border-gold/30")} />)}</div>
                <h3 className="mt-10 font-display text-[28px] font-light leading-none tracking-[-.015em] text-ivory">{f.t}</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ivory/75">{f.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-gold/25 pt-8">
            <p className="max-w-[640px] font-sans font-light text-[clamp(22px,2.2vw,32px)] leading-snug text-ivory">Pas de tarif affiché : chaque devis dépend de la date, du lieu, de la formation et de la durée.</p>
            <LiquidMetalButton href="#reservation" size="lg">Décrire mon événement <ArrowUpRight /></LiquidMetalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
