import * as React from "react";
import { cn } from "@/lib/utils";

/* Autocollant à coin décollé (d'après trevornoah.com) : bord blanc, angle replié en haut à droite. */
export function Sticker({ src, alt = "", className, fold = 46, children }: { src?: string; alt?: string; className?: string; fold?: number; children?: React.ReactNode }) {
  const cut = `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`;
  return (
    <div className={cn("relative drop-shadow-[0_18px_30px_rgba(0,0,0,.55)]", className)}>
      <div className="h-full w-full bg-ivory p-[7px]" style={{ clipPath: cut, borderRadius: 14 }}>
        <div className="h-full w-full overflow-hidden rounded-[9px]" style={{ clipPath: cut }}>
          {src ? <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} /> : children}
        </div>
      </div>
      {/* le coin replié */}
      <span aria-hidden className="absolute right-0 top-0" style={{ width: fold, height: fold, background: "linear-gradient(225deg, transparent 50%, #D9D1C2 50%, #FBF7EF 78%, #E7DFD0 100%)", borderBottomLeftRadius: 10, filter: "drop-shadow(-3px 4px 4px rgba(0,0,0,.35))" }} />
    </div>
  );
}
