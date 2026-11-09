import * as React from "react";
import { VerticalCut } from "@/components/ui/text-fx";
import { ArrowUpRight } from "lucide-react";
import { useGsap, gsap } from "@/lib/use-gsap";
import { MeshBg, Kicker, RevealWords } from "@/components/site";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { Button } from "@/components/ui/button";

const SLIDES: CoverflowSlide[] = [
  { src: "m/six.jpg", alt: "Six chanteurs en tenues ivoire et or", title: "Le collectif", subtitle: "Six voix permanentes", meta: [{ label: "Formation", value: "Collectif" }, { label: "Tenues", value: "Ivoire & or" }] },
  { src: "m/still-groupe.jpg", alt: "Le grand ensemble sur la scène du Grand Théâtre National", title: "Gloria Dakar", subtitle: "Grand Théâtre National", meta: [{ label: "Lieu", value: "Dakar" }, { label: "Formation", value: "Élargie" }] },
  { src: "m/trio.jpg", alt: "Trois chanteuses en blanc, vert et or", title: "Trio", subtitle: "Voix lead & harmonies", meta: [{ label: "Formation", value: "Trio" }, { label: "Lieu", value: "À préciser" }] },
  { src: "m/still-danse.jpg", alt: "Danse et percussions pendant Gloria Dakar", title: "Gloria Dakar", subtitle: "Danse & percussions", meta: [{ label: "Lieu", value: "Dakar" }, { label: "Genre", value: "Mbalax & gospel" }] },
  { src: "m/still-session.jpg", alt: "Session acoustique autour d'un clavier", title: "Session acoustique", subtitle: "Clavier, guitare, voix", meta: [{ label: "Formation", value: "Acoustique" }, { label: "Format", value: "Vidéo" }] },
  { src: "m/ensemble.jpg", alt: "Le grand ensemble avec les musiciens", title: "Grand ensemble", subtitle: "Avec musiciens invités", meta: [{ label: "Formation", value: "Élargie" }, { label: "Lieu", value: "À préciser" }] },
  { src: "m/still-chant.jpg", alt: "Une chanteuse au micro", title: "Voix lead", subtitle: "Gloria Dakar", meta: [{ label: "Lieu", value: "Dakar" }, { label: "Genre", value: "Gospel" }] },
  { src: "m/poster-s2.jpg", alt: "Le chœur assis pendant la session", title: "Session — II", subtitle: "Chœur assis", meta: [{ label: "Formation", value: "Acoustique" }, { label: "Format", value: "Vidéo" }] },
  { src: "m/still-nuit.jpg", alt: "Lumières de scène avant le concert", title: "Avant le concert", subtitle: "Coulisses", meta: [{ label: "Moment", value: "Balances" }, { label: "Lieu", value: "À préciser" }] },
  { src: "m/poster-s3.jpg", alt: "Musiciens pendant la session", title: "Session — III", subtitle: "Musiciens", meta: [{ label: "Formation", value: "Acoustique" }, { label: "Format", value: "Vidéo" }] },
];

const VALUES = [
  ["L'exigence", "Chaque harmonie est travaillée, chaque prestation répétée avant le jour J."],
  ["La flexibilité", "Du duo à la formation élargie, selon le lieu, le public et le moment."],
  ["La famille", "Une équipe soudée, sur scène comme en coulisses. C'est leur devise."],
  ["Le sur-mesure", "Un répertoire choisi pour votre événement, pas un programme tout fait."],
];

export default function APropos() {
  const root = React.useRef<HTMLDivElement>(null);
  useGsap(root, (reduce) => {
    if (reduce) { gsap.set("[data-w]", { opacity: 1 }); return; }
    gsap.utils.toArray<HTMLElement>(".float").forEach((el, i) => {
      gsap.from(el, { opacity: 0, scale: 0.85, duration: 1.4, ease: "expo.out", delay: 0.4 + i * 0.12 });
      gsap.to(el, { yPercent: -40 - i * 25, ease: "none", scrollTrigger: { trigger: ".ap-open", start: "top top", end: "bottom top", scrub: true } });
    });
    gsap.to("[data-w]", { opacity: 1, stagger: 0.06, ease: "none", scrollTrigger: { trigger: ".reveal", start: "top 80%", end: "bottom 45%", scrub: true } });
    gsap.from(".val", { opacity: 0, y: 40, duration: 1.1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".vals", start: "top 80%" } });
  });
  return (
    <div ref={root}>
      <section className="ap-open relative grid h-[100svh] min-h-[640px] place-items-center overflow-hidden" aria-label="À propos">
        <MeshBg colors={["#02050D", "#050C1F", "#12285A", "#56482F"]} speed={0.15} distortion={0.7} swirl={0.25} />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,transparent,#02050D_95%)]" />
        <div className="wrap absolute inset-x-0 top-[96px] flex justify-between"><span className="lab text-ivory/70">À propos</span><span className="lab text-ivory/70">14°41′N · 17°26′O</span></div>
        <img src="m/still-chant.jpg" alt="" className="float absolute left-[8%] top-[22%] w-[clamp(90px,11vw,170px)] border border-gold/30" />
        <img src="m/poster-s1.jpg" alt="" className="float absolute right-[9%] top-[17%] w-[clamp(100px,12vw,190px)] border border-gold/30" />
        <img src="m/trio.jpg" alt="" className="float absolute bottom-[16%] right-[18%] w-[clamp(110px,14vw,220px)] border border-gold/30" />
        <div className="float ph absolute bottom-[20%] left-[16%] aspect-[4/3] w-[clamp(110px,12vw,190px)] border border-gold/20" data-ph="Photo à fournir" />
        <h1 className="ap-t relative z-10 text-center font-serif text-[clamp(48px,8vw,150px)] font-normal leading-[.92] tracking-[-.015em] text-ivory">
          <span className="block"><VerticalCut text="Un collectif," /></span><span className="block italic"><span className="gold-chrome"><VerticalCut text="une famille." delay={0.45} /></span></span>
        </h1>
        <div className="wrap absolute inset-x-0 bottom-20 flex justify-between"><span className="lab text-ivory/70">01 Histoire</span><span className="lab text-ivory/70">02 Vision &amp; valeurs</span><span className="lab text-ivory/70 max-sm:hidden">03 Identité</span></div>
      </section>

      <section className="wrap relative grid gap-10 bg-night-950 py-28 md:grid-cols-[minmax(0,.3fr)_minmax(0,1fr)]" aria-label="Histoire">
        <div><Kicker n="01">Histoire</Kicker><p className="lab mt-6 max-w-[220px] text-mist/70">Dates, lieux et premières scènes : à fournir par le groupe.</p></div>
        <RevealWords className="font-sans font-light text-[clamp(26px,3.2vw,50px)] leading-[1.18] tracking-[-.015em] text-ivory"
          text="Heaven & Voice est né à Dakar d'une même envie : chanter ensemble, et bien. Six artistes permanents, chanteurs et musiciens, qui accompagnent les cérémonies, montent sur les grandes scènes et entrent en studio. Plus qu'un collectif, une famille." />
      </section>

      <section className="relative overflow-hidden border-y border-gold/15 bg-night-900 py-24" aria-label="En images">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_45%,rgba(31,71,168,.45),transparent_70%)]" />
        <div className="wrap relative mb-4 flex flex-wrap items-end justify-between gap-6">
          <div><Kicker n="—">En images</Kicker><h2 className="mt-5 font-display text-[clamp(40px,5.6vw,96px)] font-light leading-[.92] tracking-[-.015em] text-ivory">Dix moments<br /><span className="font-serif font-light normal-case italic"><span className="gold-chrome">sur scène.</span></span></h2></div>
          <p className="lab max-w-[260px] text-mist">Glissez, utilisez les flèches ou le clavier ← →</p>
        </div>
        <CoverflowCarousel slides={SLIDES} showCaption showNavigation showPagination cardWidth="clamp(170px, 24vw, 330px)" rotate={46} depth={0.7} label="Photos du collectif" className="relative" />
      </section>

      <section className="vals wrap bg-night-950 py-28" aria-label="Vision et valeurs">
        <div className="mb-14 grid gap-6 md:grid-cols-[minmax(0,.3fr)_minmax(0,1fr)]">
          <Kicker n="02">Vision &amp; valeurs</Kicker>
          <p className="max-w-[640px] font-sans font-light text-[clamp(26px,2.8vw,42px)] leading-[1.15] text-ivory">Porter chaque moment avec des voix justes, et le faire avec la bonne formation.</p>
        </div>
        <div className="border-t border-gold/25">
          {VALUES.map(([t, d], i) => (
            <div key={t} className="val group relative grid items-baseline gap-4 overflow-hidden border-b border-gold/25 py-8 md:grid-cols-[90px_minmax(0,1fr)_minmax(0,.8fr)]">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[linear-gradient(100deg,#8F7D5E,#E9DFC8_30%,#B5A07A_55%,#F4ECDA_75%,#9A8664)] transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <span className="lab relative text-gold transition-colors group-hover:text-night-950">0{i + 1}</span>
              <h3 className="relative font-display text-[clamp(34px,4.6vw,76px)] font-light leading-[.9] tracking-[-.015em] text-ivory transition-colors group-hover:text-night-950">{t}</h3>
              <p className="relative font-sans text-[16px] leading-relaxed text-ivory/75 transition-colors group-hover:text-night-950">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap relative overflow-hidden bg-night-950 pb-32" aria-label="Identité artistique">
        <div className="grid gap-10 border-t border-gold/25 pt-14 md:grid-cols-[minmax(0,.3fr)_minmax(0,1fr)]">
          <Kicker n="03">Identité artistique</Kicker>
          <div>
            <p className="max-w-[780px] font-sans font-light text-[clamp(19px,1.8vw,25px)] leading-[1.5] text-ivory">Heaven &amp; Voice ne s'enferme dans aucun genre. Du gospel au mbalax, de la soul au zouk, le collectif passe d'un univers à l'autre avec la même exigence vocale.</p>
            <div className="mt-8 flex flex-wrap gap-2">{["Gospel & spirituel", "Soul & R&B", "Pop & variété", "Acoustique", "Mbalax & musiques africaines", "Zouk & caribéen"].map((g) => <span key={g} className="lab rounded-full border border-gold/35 px-4 py-2 text-ivory/85">{g}</span>)}</div>
            <Button asChild className="mt-10"><a href="#univers">Écouter les six univers <ArrowUpRight /></a></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
