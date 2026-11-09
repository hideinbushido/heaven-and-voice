import * as React from "react";
import { GradualSpacing } from "@/components/ui/text-fx";
import { toast } from "sonner";
import { Copy, ArrowUpRight } from "lucide-react";
import { useGsap, gsap } from "@/lib/use-gsap";
import { Kicker } from "@/components/site";
import { cn } from "@/lib/utils";

const ROWS = [
  { k: "WhatsApp", v: "+221 — numéro à fournir", act: "Copier", copy: true },
  { k: "E-mail", v: "contact@ — adresse à fournir", act: "Copier", copy: true },
  { k: "Instagram", v: "@heavenandvoice", act: "Ouvrir", href: "https://www.instagram.com/heavenandvoice/" },
  { k: "Dakar", v: "Sénégal · déplacements possibles", act: "Basés à" },
];

export default function Contact() {
  const root = React.useRef<HTMLDivElement>(null);
  useGsap(root, (reduce) => { if (!reduce) gsap.from(".c-row", { yPercent: 40, opacity: 0, duration: 1.2, stagger: 0.09, ease: "expo.out", delay: 0.2 }); });
  const copy = async (v: string) => {
    try { await navigator.clipboard.writeText(v); toast("Copié", { description: v }); }
    catch { toast("Copie impossible ici", { description: v }); }
  };
  return (
    <div ref={root} className="relative overflow-hidden bg-night-950 pb-28 pt-[130px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_20%,rgba(31,71,168,.4),transparent_70%),radial-gradient(40%_30%_at_10%_90%,rgba(201,180,140,.12),transparent_70%)]" />
      <div className="wrap relative mb-12 flex flex-wrap items-end justify-between gap-6">
        <Kicker n="08">Contact</Kicker>
        <p className="max-w-[420px] font-sans text-[15px] leading-relaxed text-ivory/75">Pour un devis précis, passez plutôt par le <a href="#reservation" className="text-gold underline underline-offset-4">formulaire</a>. Pour une question rapide, écrivez-nous.</p>
      </div>
      <ul className="relative border-t border-gold/25">
        {ROWS.map((r) => {
          const inner = (
            <>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[linear-gradient(100deg,#8F7D5E,#E9DFC8_30%,#B5A07A_55%,#F4ECDA_75%,#9A8664)] transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <span className="wrap relative flex items-center justify-between gap-6 py-6">
                <span className="relative block min-w-0 flex-1 overflow-hidden">
                  <span className="block font-display text-[clamp(40px,7.4vw,150px)] font-light leading-[.92] tracking-[-.015em] text-ivory transition-[transform,opacity] duration-500 ease-out group-hover:-translate-y-full group-hover:opacity-0"><GradualSpacing text={r.k} delay={0.2} /></span>
                  <span className="absolute inset-0 flex translate-y-full items-center overflow-hidden transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <span className="flex shrink-0 whitespace-nowrap" style={{ animation: "marquee 14s linear infinite" }}>
                      {[0, 1, 2, 3].map((n) => <span key={n} className="pr-16 font-serif text-[clamp(40px,7vw,130px)] leading-none text-night-950">{r.v} ✦</span>)}
                    </span>
                  </span>
                </span>
                <span className="lab flex shrink-0 items-center gap-2 text-gold transition-colors group-hover:text-night-950">{r.act}{r.copy ? <Copy className="h-3.5 w-3.5" /> : r.href ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}</span>
              </span>
              <span className="wrap relative -mt-3 block pb-5 font-sans text-[14px] text-mist md:hidden">{r.v}</span>
            </>
          );
          const cls = cn("c-row group relative block w-full overflow-hidden border-b border-gold/25 text-left");
          return (
            <li key={r.k}>
              {r.href ? <a href={r.href} target="_blank" rel="noopener" className={cls}>{inner}</a>
                : r.copy ? <button className={cls} onClick={() => copy(r.v)}>{inner}</button>
                : <div className={cls}>{inner}</div>}
            </li>
          );
        })}
      </ul>
      <div className="wrap relative mt-12 flex flex-wrap justify-between gap-4">
        <span className="lab text-mist">Réseaux : Instagram · YouTube et TikTok à fournir</span>
        <span className="lab text-mist">Coordonnées réelles à fournir par le groupe</span>
      </div>
    </div>
  );
}
