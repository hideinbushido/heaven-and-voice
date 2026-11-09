import * as React from "react";
import { Highlight } from "@/components/ui/text-fx";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { useGsap, gsap } from "@/lib/use-gsap";
import { MeshBg, Kicker } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { cn } from "@/lib/utils";

const TYPES = ["Mariage / cérémonie", "Événement privé", "Événement professionnel", "Gala / soirée", "Concert / spectacle", "Collaboration artistique"];
const SIZES = ["Duo", "Trio", "Le collectif (6)", "Formation élargie", "Je ne sais pas encore"];
const GEN = ["Gospel", "Soul & R&B", "Pop", "Acoustique", "Mbalax", "Zouk"];
const TECH = ["Sonorisation sur place", "Pas de sonorisation", "Piano / clavier sur place", "À voir ensemble"];
const STEPS = ["Événement", "Date & lieu", "Artistes", "Besoins", "Coordonnées"];

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-pressed={on} className={cn("lab inline-flex h-11 items-center gap-2 rounded-full px-4 transition-colors", on ? "metal" : "border border-gold/30 text-ivory/85 hover:border-gold")}>{on && <Check className="h-3.5 w-3.5" />}{children}</button>;
}

export default function Reservation() {
  const root = React.useRef<HTMLDivElement>(null);
  const [s, setS] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [d, setD] = React.useState({ type: "", date: "", lieu: "", invites: "", size: "", genres: [] as string[], tech: [] as string[], note: "", nom: "", tel: "", mail: "" });
  const up = (k: keyof typeof d, v: unknown) => setD((x) => ({ ...x, [k]: v }));
  const tog = (k: "genres" | "tech", v: string) => setD((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v] }));
  const ok = [!!d.type, !!d.date && !!d.lieu, !!d.size, true, !!d.nom && (!!d.tel || !!d.mail)][s];

  useGsap(root, (reduce) => { if (!reduce) gsap.from(".r-in", { opacity: 0, y: 40, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.2 }); });

  const send = () => { setDone(true); toast("Demande prête", { description: "Maquette : rien n'est envoyé pour l'instant." }); };

  return (
    <div ref={root} className="relative overflow-hidden bg-night-950">
      <MeshBg colors={["#02050D", "#050C1F", "#12285A", "#46392A"]} speed={0.12} />
      <section className="wrap relative grid min-h-[100svh] gap-12 pb-24 pt-[140px] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1fr)]" aria-label="Réservations et devis">
        <div>
          <div className="r-in"><Kicker n="07">Réservations &amp; devis</Kicker></div>
          <h1 className="r-in mt-6 font-display text-[clamp(44px,5.4vw,100px)] font-light leading-[.92] tracking-[-.015em] text-ivory">Décrivez<br /><span className="font-serif font-light normal-case italic tracking-[-.015em]"><span className="gold-chrome"><Highlight>votre événement.</Highlight></span></span></h1>
          <p className="r-in mt-8 max-w-[440px] font-sans text-[17px] leading-relaxed text-ivory/80">Cinq questions. Le collectif revient vers vous avec une proposition : formation, répertoire et devis.</p>
          <ol className="r-in mt-10 grid max-w-[440px] gap-0 border-t border-gold/25">
            {STEPS.map((t, i) => (
              <li key={t} className="flex items-center justify-between border-b border-gold/25 py-3">
                <span className={cn("font-sans text-[15px] font-semibold uppercase tracking-[.02em]", i === s && !done ? "text-gold" : i < s || done ? "text-ivory" : "text-ivory/45")}>{t}</span>
                <span className="lab text-mist">{i < s || done ? "✓" : `0${i + 1}`}</span>
              </li>
            ))}
          </ol>
          <p className="r-in mt-8 max-w-[440px] border-l-2 border-gold pl-4 font-sans text-[14px] leading-relaxed text-ivory/75">Une demande n'est pas une réservation confirmée : le collectif confirme chaque date et chaque devis.</p>
        </div>

        <div className="r-in relative self-start border border-gold/25 bg-night-900/70 p-6 shadow-[0_60px_120px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl md:p-10">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-night-700"><div className="h-full bg-[linear-gradient(90deg,#8F7D5E,#E9DFC8,#B5A07A)] transition-[width] duration-700 ease-out" style={{ width: `${((done ? 5 : s) / 5) * 100}%` }} /></div>
          {done ? (
            <div className="grid gap-6">
              <span className="lab text-gold">Récapitulatif</span>
              <h2 className="font-serif text-[clamp(32px,3.4vw,52px)] leading-none text-ivory">Merci, {d.nom.split(" ")[0]}.</h2>
              <dl className="grid gap-0 border-t border-gold/20">
                {[["Événement", d.type], ["Date", d.date], ["Lieu", d.lieu], ["Invités", d.invites || "—"], ["Formation", d.size], ["Genres", d.genres.join(", ") || "—"], ["Technique", d.tech.join(", ") || "—"], ["Contact", [d.tel, d.mail].filter(Boolean).join(" · ")]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-gold/20 py-2.5"><dt className="lab text-mist">{k}</dt><dd className="text-right font-sans text-[15px] text-ivory">{v}</dd></div>
                ))}
              </dl>
              <p className="lab text-mist">Maquette : rien n'est envoyé. Envoi par e-mail ou WhatsApp à brancher.</p>
              <Button variant="outline" onClick={() => { setDone(false); setS(0); }}>Modifier la demande</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (!ok) return; s < 4 ? setS(s + 1) : send(); }} className="grid gap-8">
              <div className="flex items-center justify-between"><span className="lab text-gold">Étape 0{s + 1} / 05</span><span className="lab text-mist">{STEPS[s]}</span></div>
              {s === 0 && (<fieldset className="grid gap-5"><legend className="mb-5 font-display text-[clamp(24px,2.4vw,34px)] leading-tight text-ivory">Quel type d'événement ?</legend><div className="flex flex-wrap gap-2">{TYPES.map((t) => <Chip key={t} on={d.type === t} onClick={() => up("type", t)}>{t}</Chip>)}</div></fieldset>)}
              {s === 1 && (<fieldset className="grid gap-6"><legend className="mb-5 font-display text-[clamp(24px,2.4vw,34px)] leading-tight text-ivory">Quand et où ?</legend>
                <label className="grid gap-1"><span className="lab text-mist">Date</span><Input type="date" value={d.date} onChange={(e) => up("date", e.target.value)} required /></label>
                <label className="grid gap-1"><span className="lab text-mist">Lieu (ville, salle)</span><Input placeholder="Dakar, Saly, Thiès…" value={d.lieu} onChange={(e) => up("lieu", e.target.value)} required /></label>
                <label className="grid gap-1"><span className="lab text-mist">Nombre d'invités (environ)</span><Input inputMode="numeric" placeholder="150" value={d.invites} onChange={(e) => up("invites", e.target.value)} /></label></fieldset>)}
              {s === 2 && (<fieldset><legend className="mb-5 font-display text-[clamp(24px,2.4vw,34px)] leading-tight text-ivory">Combien d'artistes ?</legend><div className="flex flex-wrap gap-2">{SIZES.map((t) => <Chip key={t} on={d.size === t} onClick={() => up("size", t)}>{t}</Chip>)}</div></fieldset>)}
              {s === 3 && (<fieldset className="grid gap-6"><legend className="mb-5 font-display text-[clamp(24px,2.4vw,34px)] leading-tight text-ivory">Besoins musicaux et techniques</legend>
                <div><span className="lab mb-3 block text-mist">Genres souhaités</span><div className="flex flex-wrap gap-2">{GEN.map((t) => <Chip key={t} on={d.genres.includes(t)} onClick={() => tog("genres", t)}>{t}</Chip>)}</div></div>
                <div><span className="lab mb-3 block text-mist">Technique</span><div className="flex flex-wrap gap-2">{TECH.map((t) => <Chip key={t} on={d.tech.includes(t)} onClick={() => tog("tech", t)}>{t}</Chip>)}</div></div>
                <label className="grid gap-2"><span className="lab text-mist">Titres, moments clés, précisions</span><Textarea placeholder="Entrée des mariés sur…, un chant pour la bénédiction, durée de 2 h…" value={d.note} onChange={(e) => up("note", e.target.value)} /></label></fieldset>)}
              {s === 4 && (<fieldset className="grid gap-6"><legend className="mb-5 font-display text-[clamp(24px,2.4vw,34px)] leading-tight text-ivory">Comment vous joindre ?</legend>
                <label className="grid gap-1"><span className="lab text-mist">Nom</span><Input autoComplete="name" value={d.nom} onChange={(e) => up("nom", e.target.value)} required /></label>
                <label className="grid gap-1"><span className="lab text-mist">Téléphone / WhatsApp</span><Input type="tel" autoComplete="tel" placeholder="+221 …" value={d.tel} onChange={(e) => up("tel", e.target.value)} /></label>
                <label className="grid gap-1"><span className="lab text-mist">E-mail</span><Input type="email" autoComplete="email" value={d.mail} onChange={(e) => up("mail", e.target.value)} /></label>
                <p className="lab text-mist">Téléphone ou e-mail : l'un des deux suffit.</p></fieldset>)}
              <div className="flex items-center justify-between gap-4 border-t border-gold/20 pt-6">
                <Button type="button" variant="ghost" disabled={s === 0} onClick={() => setS(s - 1)}><ArrowLeft /> Retour</Button>
                {s < 4 ? <Button type="submit" disabled={!ok}>Continuer <ArrowRight /></Button>
                  : <span className={cn(!ok && "pointer-events-none opacity-40")}><LiquidMetalButton type="submit">Envoyer la demande <ArrowRight /></LiquidMetalButton></span>}
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
