import * as React from "react";
import { Play } from "lucide-react";
import { useGsap, gsap } from "@/lib/use-gsap";
import { Kicker } from "@/components/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Item = { k: string[]; t: string; img?: string; vid?: string; dur?: string; tall?: boolean };
const ITEMS: Item[] = [
  { k: ["video", "live"], t: "Gloria Dakar", img: "m/still-groupe.jpg", vid: "m/gloria.mp4", dur: "0:41", tall: true },
  { k: ["photo"], t: "Le collectif", img: "m/six.jpg" },
  { k: ["video", "extrait"], t: "Session I", img: "m/poster-s1.jpg", vid: "m/session.mp4", dur: "0:57" },
  { k: ["photo"], t: "Trio", img: "m/trio.jpg", tall: true },
  { k: ["photo", "live"], t: "Gloria — danse", img: "m/still-danse.jpg" },
  { k: ["video", "extrait"], t: "Session II", img: "m/poster-s2.jpg", vid: "m/session-2.mp4", dur: "0:57" },
  { k: ["photo", "live"], t: "Sur scène", img: "m/ensemble.jpg" },
  { k: ["photo", "live"], t: "Voix lead", img: "m/still-chant.jpg", tall: true },
  { k: ["video", "extrait"], t: "Session III", img: "m/poster-s3.jpg", vid: "m/session-3.mp4", dur: "0:56" },
  { k: ["photo"], t: "Avant le concert", img: "m/still-nuit.jpg" },
  { k: ["photo"], t: "Photo à fournir" },
  { k: ["video"], t: "Clip à fournir", tall: true },
];
const FILTERS = [["tout", "Tout"], ["photo", "Photos"], ["video", "Vidéos"], ["live", "Live"], ["extrait", "Extraits musicaux"]];

export default function Galerie() {
  const root = React.useRef<HTMLDivElement>(null);
  const [f, setF] = React.useState("tout");
  const [open, setOpen] = React.useState<Item | null>(null);
  useGsap(root, (reduce) => {
    if (reduce) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".g-pin", start: "top top", end: "+=140%", scrub: 0.8, pin: true } });
    tl.to(".g-mask", { scale: 28, ease: "power2.in" }).to(".g-mask", { opacity: 0, duration: 0.15 }, ">-0.15").from(".g-cap", { opacity: 0, y: 30, duration: 0.3 }, ">-0.1");
  });
  const list = ITEMS.filter((x) => f === "tout" || x.k.includes(f));
  return (
    <div ref={root} className="bg-night-950">
      <section className="g-pin relative h-[100svh] overflow-hidden" aria-label="Galerie">
        <video src="m/gloria.mp4" poster="m/still-groupe.jpg" autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover"
          onLoadedMetadata={(e) => { e.currentTarget.currentTime = 5; }} onTimeUpdate={(e) => { if (e.currentTarget.currentTime > 36) e.currentTarget.currentTime = 5; }} />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(201,180,140,.15),transparent)]" />
        <div className="g-mask absolute inset-0 grid origin-[51%_52%] place-items-center bg-night-950 mix-blend-multiply">
          <h1 className="font-display text-[clamp(96px,24vw,420px)] font-medium leading-none tracking-[-.015em] text-white">Galerie</h1>
        </div>
        <div className="wrap absolute inset-x-0 top-[96px] flex justify-between"><span className="lab text-ivory/80">Galerie &amp; médias</span><span className="lab text-ivory/80">Photos · vidéos · live · extraits</span></div>
        <div className="g-cap wrap absolute inset-x-0 bottom-20"><p className="max-w-[560px] font-sans font-light text-[clamp(28px,3.4vw,52px)] leading-[1.05] text-ivory">Gloria Dakar, Grand Théâtre National.</p></div>
      </section>

      <section className="wrap py-24" aria-label="Médias">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Kicker n={String(list.length).padStart(2, "0")}>Médias</Kicker>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer">
            {FILTERS.map(([k, t]) => (
              <button key={k} onClick={() => setF(k)} aria-pressed={f === k} className={cn("lab h-10 rounded-full px-4", f === k ? "metal" : "border border-gold/30 text-ivory/80 hover:border-gold")}>{t}</button>
            ))}
          </div>
        </div>
        <div className="columns-1 gap-[6px] sm:columns-2 lg:columns-3 [&>*]:mb-[6px]">
          {list.map((x) => (
            x.img ? (
              <button key={x.t} onClick={() => setOpen(x)} className="group relative block w-full break-inside-avoid overflow-hidden border border-gold/10 text-left">
                <img src={x.img} alt={x.t} loading="lazy" className={cn("w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]", x.tall ? "aspect-[3/4]" : "aspect-[4/3]")} />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,5,13,.85),transparent_45%)]" />
                {x.vid && <span className="metal absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full"><Play className="ml-0.5 h-4 w-4" /></span>}
                <span className="absolute inset-x-4 bottom-3 flex justify-between gap-3"><span className="font-sans text-[15px] font-bold uppercase text-ivory">{x.t}</span><span className="lab text-gold">{x.vid ? x.dur : "Photo"}</span></span>
              </button>
            ) : (
              <div key={x.t} className={cn("ph block w-full break-inside-avoid border border-gold/15", x.tall ? "aspect-[3/4]" : "aspect-[4/3]")} data-ph={x.t} />
            )
          ))}
        </div>
      </section>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="overflow-hidden">
          <DialogTitle className="absolute left-4 top-4 z-10">{open?.t}</DialogTitle>
          <DialogDescription className="sr-only">Média en plein écran</DialogDescription>
          {open?.vid ? <video src={open.vid} poster={open.img} controls autoPlay playsInline className="max-h-[80svh] w-full bg-black" />
            : open?.img ? <img src={open.img} alt={open.t} className="max-h-[80svh] w-full object-contain bg-black" /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
