import * as React from "react";
import Lenis from "lenis";
import { Menu, X, ArrowUpRight, Music2, Mic, MicVocal, Headphones, Disc3, Clapperboard, Ticket, FileMusic, Phone, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sticker } from "@/components/ui/sticker";
import { soundOn, setSound, wake, note } from "@/lib/notes";
import { gsap, ScrollTrigger, reduceMotion } from "@/lib/use-gsap";
import { PAGES, NAV, TITLES, REFS, NAV_REF, type PageKey } from "@/data";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Accueil from "@/pages/Accueil";
import APropos from "@/pages/APropos";
import Artistes from "@/pages/Artistes";
import Equipe from "@/pages/Equipe";
import Univers from "@/pages/Univers";
import Galerie from "@/pages/Galerie";
import Prestations from "@/pages/Prestations";
import Reservation from "@/pages/Reservation";
import Contact from "@/pages/Contact";

const VIEWS: Record<PageKey, React.FC> = { accueil: Accueil, "a-propos": APropos, artistes: Artistes, equipe: Equipe, univers: Univers, galerie: Galerie, prestations: Prestations, reservation: Reservation, contact: Contact };
const fromHash = (): PageKey => { const h = location.hash.replace("#", "") as PageKey; return (PAGES as readonly string[]).includes(h) ? h : "accueil"; };

import { LenisCtx } from "@/lib/lenis-ctx";

export default function App() {
  const [page, setPage] = React.useState<PageKey>(fromHash);
  const [lenis, setLenis] = React.useState<Lenis | null>(null);
  const curtain = React.useRef<HTMLDivElement>(null);
  const first = React.useRef(true);

  React.useEffect(() => {
    if (reduceMotion()) return;
    const l = new Lenis({ lerp: 0.1, smoothWheel: true });
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => { gsap.ticker.remove(tick); l.destroy(); };
  }, []);

  React.useEffect(() => {
    const on = () => {
      const k = fromHash();
      if (k === page) return;
      const swap = () => { setPage(k); (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)); };
      const c = curtain.current;
      if (!c || reduceMotion()) return swap();
      gsap.killTweensOf(c);
      gsap.fromTo(c, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "expo.inOut", onComplete: () => {
        swap();
        requestAnimationFrame(() => requestAnimationFrame(() => gsap.to(c, { yPercent: -100, duration: 0.7, ease: "expo.inOut", delay: 0.05 })));
      } });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, [page, lenis]);

  React.useEffect(() => {
    document.title = page === "accueil" ? "Heaven & Voice — collectif vocal, Dakar" : `${TITLES[page]} — Heaven & Voice`;
    if (first.current) { first.current = false; gsap.set(curtain.current, { y: 0, yPercent: 100 }); }
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [page]);

  const View = VIEWS[page];
  return (
    <LenisCtx.Provider value={lenis}>
      <Header page={page} />
      <main key={page}><View /></main>
      {page !== "equipe" && <Footer />}
      {import.meta.env.VITE_SHOW_REFS === "1" && <RefPanel page={page} />}
      <div ref={curtain} className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-night-950" style={{ transform: "translateY(100%)" }} aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span className="font-serif text-[64px] font-light leading-none text-ivory">H&amp;V</span>
      </div>
      <Toaster />
    </LenisCtx.Provider>
  );
}

function Logo() {
  return (
    <a href="#accueil" className="flex flex-col items-start leading-none" aria-label="Heaven & Voice — accueil">
      <span className="font-display text-[30px] leading-none text-ivory">H&amp;V</span>
      <span className="lab mt-1 text-[8.5px] tracking-[.5em] text-gold">FAMILY</span>
    </a>
  );
}

/* Objets « musique » qui surgissent au bout de la pastille (d'après le menu de trevornoah.com) */
const OBJ: Record<PageKey, React.FC<{ className?: string }>> = {
  accueil: Music2, "a-propos": Mic, artistes: MicVocal, equipe: Headphones, univers: Disc3, galerie: Clapperboard, prestations: Ticket, reservation: FileMusic, contact: Phone,
};
function MusicObject({ k }: { k: PageKey }) {
  const I = OBJ[k];
  return (
    <span className="metal grid h-[58px] w-[58px] place-items-center rounded-[16px] outline outline-[4px] outline-ivory drop-shadow-[0_10px_18px_rgba(0,0,0,.45)]">
      <I className="h-7 w-7 text-night-950" />
    </span>
  );
}

function Header({ page }: { page: PageKey }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hi, setHi] = React.useState<number | null>(null);
  const [son, setSon] = React.useState(soundOn);
  React.useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  React.useEffect(() => setOpen(false), [page]);
  React.useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [open]);
  const items = [...NAV, { k: "reservation" as PageKey, t: "Devis" }];
  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-[86] transition-[background-color,border-color] duration-500", scrolled && !open ? "border-b border-gold/15 bg-night-950/75 backdrop-blur-xl" : "border-b border-transparent")}>
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Logo />

          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block"><LiquidMetalButton href="#reservation" size="sm">Demander un devis</LiquidMetalButton></span>
            <button onClick={() => { wake(); setOpen((o) => !o); }} aria-expanded={open} aria-controls="menu" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid h-11 w-11 place-items-center rounded-full bg-ivory text-night-950 transition-transform duration-300 hover:scale-105 active:scale-95">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="menu" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent
            className="fixed inset-0 z-[85] overflow-y-auto bg-night-900"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 38px)" }} animate={{ clipPath: "circle(150% at calc(100% - 40px) 38px)" }} exit={{ clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_90%,rgba(31,71,168,.45),transparent_70%)]" />
            <div className="relative grid min-h-full md:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
              <div className="relative min-h-[220px] overflow-hidden max-md:h-[30svh]">
                <motion.div className="absolute -bottom-[8%] -left-[10%] w-[min(86%,560px)] max-md:-bottom-[30%] max-md:left-[4%] max-md:w-[62%]"
                  initial={{ y: 120, rotate: -18, opacity: 0 }} animate={{ y: 0, rotate: -7, opacity: 1 }} transition={{ type: "spring", duration: 1, bounce: 0.3, delay: 0.25 }}>
                  <Sticker src="m/trio.jpg" alt="Trois voix de Heaven & Voice" className="aspect-[4/5] w-full" fold={70} />
                </motion.div>

              </div>
              <div className="flex flex-col justify-between px-[var(--gr)] pb-8 pt-[110px] max-md:pt-6 md:pl-0">
                <nav onMouseLeave={() => setHi(null)} className="grid gap-1" aria-label="Pages">
                  {items.map((n, i) => (
                    <motion.a key={n.k} href={`#${n.k}`} onMouseEnter={() => { setHi(i); note(i); }} onFocus={() => setHi(i)}
                      aria-current={page === n.k ? "page" : undefined}
                      className="relative flex items-center gap-5 rounded-full px-5 py-1.5 outline-none"
                      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 + i * 0.04 }}>
                      {hi === i && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-ivory" transition={{ type: "spring", duration: 0.45, bounce: 0.18 }} />}
                      <span className={cn("lab relative w-6", hi === i ? "text-night-900/60" : "text-mist")}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("relative font-display text-[clamp(30px,4vw,60px)] leading-[1.06] transition-colors duration-200", hi === i ? "text-[#8C7650]" : page === n.k ? "text-gold" : "text-ivory")}>{n.t}</span>
                      {hi === i && (
                        <motion.span key={`o-${i}`} className="absolute right-3 top-1/2 -mt-[29px]" initial={{ scale: 0.3, rotate: -40, opacity: 0, y: 20 }} animate={{ scale: 1, rotate: -9, opacity: 1, y: -6 }} transition={{ type: "spring", duration: 0.55, bounce: 0.5 }}>
                          <MusicObject k={n.k} />
                        </motion.span>
                      )}
                    </motion.a>
                  ))}
                </nav>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gold/15 pt-5">
                  <span className="lab text-mist">© H&amp;V Family 2026 · Dakar, Sénégal</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => { const v = !son; setSon(v); setSound(v); if (v) { wake(); note(4); } }} className="lab inline-flex items-center gap-2 text-ivory/80 hover:text-gold" aria-pressed={son}>
                      {son ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />} Notes au survol {son ? "activées" : "coupées"}
                    </button>
                    <a href="https://www.instagram.com/heavenandvoice/" target="_blank" rel="noopener" className="lab text-ivory/80 hover:text-gold">Instagram ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-night-950 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_100%,rgba(31,71,168,.35),transparent_70%),radial-gradient(40%_40%_at_10%_0%,rgba(201,180,140,.08),transparent_70%)]" />
      <div className="wrap relative grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-[clamp(34px,4vw,60px)] leading-[1.02] text-ivory">Une date, un lieu,<br /><em className="gold-chrome">une formation.</em></p>
          <div className="mt-8"><LiquidMetalButton href="#reservation">Décrire mon événement <ArrowUpRight /></LiquidMetalButton></div>
        </div>
        <div className="grid content-start gap-3">
          <span className="lab text-gold">Pages</span>
          {NAV.map((n) => <a key={n.k} href={`#${n.k}`} className="font-sans text-[15px] text-ivory/80 hover:text-gold">{n.t}</a>)}
        </div>
        <div className="grid content-start gap-3">
          <span className="lab text-gold">Suivre</span>
          <a href="https://www.instagram.com/heavenandvoice/" target="_blank" rel="noopener" className="font-sans text-[15px] text-ivory/80 hover:text-gold">Instagram ↗</a>
          <span className="font-sans text-[15px] text-mist/60">YouTube · à fournir</span>
          <span className="font-sans text-[15px] text-mist/60">TikTok · à fournir</span>
          <span className="lab mt-4 text-gold">Lettre d'information</span>
          <span className="font-sans text-[15px] text-mist/60">Bientôt</span>
        </div>
        <div className="grid content-start gap-3">
          <span className="lab text-gold">Bientôt</span>
          {["Agenda des concerts", "Billetterie", "Boutique", "Actualités"].map((t) => <span key={t} className="font-sans text-[15px] text-mist/60">{t}</span>)}
        </div>
      </div>
      <div className="wrap relative mt-20 flex flex-wrap justify-between gap-4 border-t border-gold/15 py-5">
        <span className="lab text-mist">Heaven &amp; Voice · H&amp;V Family · Dakar, Sénégal</span>
        <span className="lab text-mist">Maquette · contenus à fournir</span>
      </div>
      <div aria-hidden className="relative -mb-[3.2vw] select-none text-center font-display text-[17vw] uppercase leading-[.8] tracking-[-.01em] text-ivory/90"><span>Heaven</span></div>
    </footer>
  );
}

function RefPanel({ page }: { page: PageKey }) {
  const r = REFS[page];
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="lab fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-[var(--gl)] z-[60] rounded-full border border-gold/40 bg-night-950/85 px-4 py-2.5 text-gold backdrop-blur-md transition-colors hover:bg-gold hover:text-night-950">
        Référence de cette page
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88svh] overflow-auto p-6 md:p-8">
          <DialogTitle>Référence · {TITLES[page]}</DialogTitle>
          <DialogDescription asChild><div>
            <a href={r.u} target="_blank" rel="noopener" className="mt-3 block font-serif text-[28px] leading-tight text-ivory hover:text-gold">{r.t} ↗</a>
            <div className="mt-6 grid gap-3 md:grid-cols-2">{r.img.map((s) => <img key={s} src={s} alt="" className="w-full border border-gold/20" />)}</div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div><span className="lab text-gold">Ce que je prends</span><p className="mt-2 font-sans text-[15px] leading-relaxed text-ivory/85">{r.take}</p></div>
              <div><span className="lab text-gold">Ce que je change</span><p className="mt-2 font-sans text-[15px] leading-relaxed text-ivory/85">{r.change}</p></div>
            </div>
          </div></DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
