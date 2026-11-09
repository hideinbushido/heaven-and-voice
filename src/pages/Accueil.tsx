import * as React from "react";
import { StrokeDraw, TextMorph, WordPullUp } from "@/components/ui/text-fx";
import { LiquidMetal } from "@paper-design/shaders-react";
import { ArrowUpRight, CalendarHeart, Disc3, Users, Clapperboard, FileSignature } from "lucide-react";
import { useGsap, gsap } from "@/lib/use-gsap";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";
import { MeshBg, Kicker, Marquee } from "@/components/site";

const ROLL = ["Mariages", "Galas", "Concerts", "Studio", "Cérémonies", "Festivals"];

const CARDS: CardItem[] = [
  { id: "presta", title: "Prestations", description: "Mariages, galas, concerts, cérémonies : ce qu'on chante, et dans quelle formation.", imgSrc: "m/six.jpg", icon: <CalendarHeart size={26} strokeWidth={1.4} />, linkHref: "#prestations" },
  { id: "univers", title: "Univers musical", description: "Six genres, du gospel au zouk. Choisissez un disque, écoutez les extraits.", imgSrc: "m/still-chant.jpg", icon: <Disc3 size={26} strokeWidth={1.4} />, linkHref: "#univers" },
  { id: "artistes", title: "Nos artistes", description: "Les six voix permanentes, une par écran, et les artistes invités.", imgSrc: "m/trio.jpg", icon: <Users size={26} strokeWidth={1.4} />, linkHref: "#artistes" },
  { id: "galerie", title: "Galerie", description: "Photos et vidéos de scène, Gloria Dakar en tête.", imgSrc: "m/still-groupe.jpg", videoSrc: "m/session-2.mp4", icon: <Clapperboard size={26} strokeWidth={1.4} />, linkHref: "#galerie" },
  { id: "devis", title: "Demander un devis", description: "Cinq questions sur votre événement. Le collectif revient vers vous avec une proposition.", imgSrc: "m/still-session.jpg", icon: <FileSignature size={26} strokeWidth={1.4} />, linkHref: "#reservation" },
];

export default function Accueil() {
  const root = React.useRef<HTMLDivElement>(null);
  const [rollI, setRollI] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setRollI((i) => (i + 1) % ROLL.length), 1900); return () => clearInterval(id); }, []);

  useGsap(root, (reduce) => {
    if (reduce) return;
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".hw-2", { opacity: 0, x: -40, filter: "blur(10px)", duration: 1.4 }, 0.55)
      .from(".h-in", { opacity: 0, y: 16, duration: 1.1, stagger: 0.08 }, 0.4);
    gsap.to(".hero-vid", { scale: 1.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-word", { yPercent: -30, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.fromTo(".pill", { width: "0.7em" }, { width: "1.5em", ease: "none", scrollTrigger: { trigger: ".six", start: "top 85%", end: "top 20%", scrub: 0.6 } });
    gsap.from(".six-side", { yPercent: 20, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".six", start: "top 70%" } });
    gsap.from(".six-l2", { opacity: 0, y: 40, filter: "blur(12px)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".six-l2", start: "top 90%" } });
    gsap.from(".cards-h > *", { opacity: 0, y: 40, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ".cards-h", start: "top 85%" } });
    gsap.from(".cards ul > li", { opacity: 0, y: 60, duration: 1.2, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: ".cards ul", start: "top 85%" } });
  });

  return (
    <div ref={root}>
      {/* ——— Hero · Morrow ——— */}
      <section className="hero relative h-[100svh] min-h-[660px] overflow-hidden bg-night-950" aria-label="Heaven & Voice">
        <video className="hero-vid absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.3)_brightness(.9)]" src="m/gloria.mp4" poster="m/still-groupe.jpg" autoPlay muted loop playsInline
          onLoadedMetadata={(e) => { e.currentTarget.currentTime = 5; }} onTimeUpdate={(e) => { if (e.currentTarget.currentTime > 36) e.currentTarget.currentTime = 5; }} />
        <div className="absolute inset-0 mix-blend-multiply bg-[radial-gradient(95%_85%_at_62%_38%,#3A6BE8_0%,#12307A_38%,#050C1F_72%,#02050D_100%)]" />
        <div className="absolute inset-0 mix-blend-screen bg-[radial-gradient(38%_32%_at_68%_30%,rgba(201,180,140,.38),transparent_70%),radial-gradient(30%_25%_at_20%_80%,rgba(201,180,140,.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,13,.75),transparent_48%),linear-gradient(0deg,rgba(2,5,13,.9),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-screen" aria-hidden>
          {[22, 41, 57, 69, 33].map((t, i) => (
            <i key={i} className="absolute left-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(243,237,225,.55),transparent)] blur-[1.2px]"
              style={{ top: `${t}%`, width: `${[46, 30, 60, 24, 38][i]}%`, animation: `streak 3.6s cubic-bezier(.77,0,.175,1) ${[0.2, 1.3, 2.1, 0.8, 2.7][i]}s infinite`, transform: "translateX(-110%)" }} />
          ))}
        </div>
        <div className="wrap absolute inset-0 pt-[clamp(120px,22vh,200px)] text-ivory">
          <div className="grid max-w-[330px] gap-6">
            <p className="h-in font-sans text-[17px] font-semibold leading-[1.3]">Six voix, un collectif de Dakar. <span className="text-ivory/55">Gospel, soul, mbalax, zouk&nbsp;— en duo, en trio ou au complet.</span></p>
            <div className="h-in"><LiquidMetalButton href="#reservation">Demander un devis <ArrowUpRight /></LiquidMetalButton></div>
          </div>
          <div className="h-in absolute left-[calc(var(--gl)+2.8em)] top-[58%] grid gap-1 font-sans text-[15px] font-semibold max-md:top-auto max-md:bottom-[calc(170px+34vw)]">
            <span className="lab absolute -left-[3em] top-[3px] text-gold">01/</span>
            <span className="relative block h-[1.35em] overflow-hidden font-sans" aria-live="off">
              {ROLL.map((w, i) => (
                <span key={w} className="absolute left-0 top-0 block transition-transform duration-700 ease-io" style={{ transform: `translateY(${(i - rollI) * 100}%)` }}>{w}</span>
              ))}
            </span>
            <span className="text-ivory/55">Prestations sur mesure</span>
          </div>
          <div className="absolute bottom-[clamp(64px,8vh,80px)] left-[var(--gl)] right-[var(--gr)] flex items-end justify-between gap-6 max-md:flex-col-reverse max-md:items-stretch max-md:bottom-[96px]">
            <span className="h-in lab pb-4 text-ivory/70">Dakar — 14°41′N 17°26′O</span>
            <h1 className="hero-word text-right font-display font-light leading-[.78] tracking-[-.015em] max-md:text-left" aria-label="Heaven & Voice">
              <span className="ml-auto block w-[min(62vw,1000px)] tracking-[-.01em] text-ivory max-md:ml-0 max-md:w-[92vw]"><StrokeDraw text="HEAVEN" /></span>
              <span className="hw-2 mr-[.1em] block font-serif text-[clamp(38px,6vw,110px)] font-light normal-case leading-none tracking-[-.02em] text-ivory max-md:ml-[.06em]">&amp; Voice</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ——— Six ◯ voix · Monce ——— */}
      <section className="six relative overflow-hidden pb-24 pt-20 md:pb-32" aria-label="Le collectif">
        <MeshBg colors={["#02050D", "#071739", "#1F47A8", "#6E5E42"]} distortion={0.85} swirl={0.4} speed={0.18} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#02050D_0%,transparent_22%,transparent_70%,#02050D_100%)]" />
        <div className="wrap relative">
          <div className="flex justify-between gap-6 border-b border-gold/25 pb-4"><span className="lab text-ivory/70">Heaven &amp; Voice · H&amp;V Family</span><span className="lab text-ivory/70">Chanteurs &amp; musiciens</span></div>
          <a href="#reservation" aria-label="Demander un devis" className="group absolute right-[var(--gr)] top-[72px] z-10 hidden h-[150px] w-[150px] md:block">
            <span className="absolute inset-[26px] overflow-hidden rounded-full shadow-[0_20px_50px_-15px_rgba(201,180,140,.7)]">
              <LiquidMetal style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} colorBack="#4A3D26" colorTint="#F1E6CC" shape="none" repetition={1.6} softness={0.45} distortion={0.08} contour={0} shiftRed={0.1} shiftBlue={0.03} speed={0.8} scale={1} />
            </span>
            <span className="metal absolute inset-[31px] rounded-full" />
            <span className="absolute inset-[26px] grid place-items-center rounded-full text-night-950 transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={30} /></span>
            <svg viewBox="0 0 150 150" className="absolute inset-0 animate-[spin_16s_linear_infinite]" aria-hidden>
              <defs><path id="c1" d="M75,75 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" /></defs>
              <text fill="#C9B48C" fontFamily="Work Sans" fontWeight="600" fontSize="9.5" letterSpacing="3.4"><textPath href="#c1">DEMANDER UN DEVIS ✦ DEMANDER UN DEVIS ✦</textPath></text>
            </svg>
          </a>
          <div className="mt-16 grid items-end gap-8 md:grid-cols-[minmax(0,.32fr)_minmax(0,1fr)]">
            <figure className="six-side relative aspect-[3/4] overflow-hidden border border-gold/25 max-md:hidden">
              <img src="m/trio.jpg" alt="Trois voix de Heaven & Voice en blanc sur scène" className="h-full w-full object-cover [object-position:62%_50%]" />
              <figcaption className="lab absolute bottom-3 left-3 text-ivory">Trio · tenues de scène</figcaption>
            </figure>
            <h2 className="font-display font-light leading-[.92] tracking-[-.015em] text-ivory">
              <span className="flex flex-wrap items-center gap-x-[.12em] text-[clamp(56px,10vw,190px)]">
                Six
                <span className="pill relative inline-block h-[.74em] w-[1.6em] overflow-hidden rounded-full border border-gold/50 align-middle shadow-[inset_0_0_0_1px_rgba(255,240,200,.2)]">
                  <video src="m/session.mp4" autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                </span>
                voix
              </span>
              <span className="six-l2 block pl-[.06em] font-serif text-[clamp(44px,7.4vw,140px)] font-normal normal-case leading-[.9] tracking-[-.015em]"><span className="gold-chrome"><TextMorph words={["mille formats.", "en duo.", "en trio.", "à six.", "et plus."]} /></span></span>
            </h2>
          </div>
          <div className="mt-14 grid gap-8 border-t border-gold/25 pt-6 md:grid-cols-3">
            <p className="font-sans text-[16px] leading-relaxed text-ivory/80">Le collectif réunit six artistes permanents. Selon votre moment, il se présente à deux, à trois, au complet ou avec des musiciens invités.</p>
            <div className="lab text-ivory/70">Du duo à la formation élargie</div>
            <div className="lab text-ivory/70 md:text-right">Gospel · soul · pop · acoustique · mbalax · zouk</div>
          </div>
        </div>
      </section>

      <Marquee className="border-y border-gold/20 bg-night-950 py-5" speed={38}>
        {["Gospel", "Soul & R&B", "Pop", "Acoustique", "Mbalax", "Zouk"].map((g) => (
          <span key={g} className="flex items-center gap-10 pr-10 font-display text-[clamp(36px,5vw,80px)] font-light tracking-[-.015em]">
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(201,180,140,.7)]">{g}</span><span className="text-[.4em] text-gold">✦</span>
          </span>
        ))}
      </Marquee>

      {/* ——— Cartes extensibles (21st.dev) ——— */}
      <section className="cards wrap relative bg-night-950 pb-28 pt-24" aria-label="Accès rapide">
        <div className="cards-h mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker n="02">Le site en cinq portes</Kicker>
            <h2 className="mt-5 font-display text-[clamp(44px,6.4vw,110px)] font-light leading-[.92] tracking-[-.015em] text-ivory"><WordPullUp text="Entrez par" /><br /><span className="font-serif font-light normal-case italic tracking-[-.015em]"><span className="gold-chrome"><WordPullUp text="la bonne porte." delay={0.25} /></span></span></h2>
          </div>
          <p className="max-w-[340px] font-sans text-[15px] leading-relaxed text-ivory/70">Survolez une carte pour l'ouvrir. Sur téléphone, touchez-la.</p>
        </div>
        <ExpandingCards items={CARDS} defaultActiveIndex={0} />
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-gold/20 pt-6">
          <span className="lab text-mist">Suivre le collectif</span>
          <div className="flex flex-wrap gap-3">
            <a className="lab rounded-full border border-gold/40 px-4 py-2.5 text-ivory hover:bg-gold hover:text-night-950" href="https://www.instagram.com/heavenandvoice/" target="_blank" rel="noopener">Instagram @heavenandvoice ↗</a>
            <span className="lab rounded-full border border-gold/20 px-4 py-2.5 text-mist">YouTube · à fournir</span>
            <span className="lab rounded-full border border-gold/20 px-4 py-2.5 text-mist">TikTok · à fournir</span>
          </div>
        </div>
      </section>
    </div>
  );
}
