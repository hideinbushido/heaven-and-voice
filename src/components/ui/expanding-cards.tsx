"use client";
/* Expanding Cards — composant 21st.dev fourni par l'utilisateur, repris tel quel
   pour la mécanique (grille 5fr/1fr, survol, focus, clic), restylé : nuit, champagne, Work Sans. */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  videoSrc?: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const gridStyle = React.useMemo(() => {
      if (activeIndex === null) return {};
      const tracks = items.map((_, index) => (index === activeIndex ? "5fr" : "1fr")).join(" ");
      return isDesktop ? { gridTemplateColumns: tracks } : { gridTemplateRows: tracks };
    }, [activeIndex, items.length, isDesktop]);

    return (
      <ul
        className={cn("grid w-full gap-[6px]", "h-[680px] md:h-[600px]", "transition-[grid-template-columns,grid-template-rows] duration-700 ease-out", className)}
        style={{ ...gridStyle, ...(isDesktop ? { gridTemplateRows: "1fr" } : { gridTemplateColumns: "1fr" }) }}
        ref={ref}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn("group relative cursor-pointer overflow-hidden border border-gold/15 bg-night-900", "md:min-w-[86px]", "min-h-0 min-w-0")}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            tabIndex={0}
            data-active={activeIndex === index}
          >
            {item.videoSrc ? (
              <video src={item.videoSrc} poster={item.imgSrc} muted loop playsInline autoPlay
                className="absolute inset-0 h-full w-full object-cover scale-110 grayscale-[.85] brightness-[.55] transition-all duration-700 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 group-data-[active=true]:brightness-[.8]" />
            ) : (
              <img src={item.imgSrc} alt={item.title}
                className="absolute inset-0 h-full w-full object-cover scale-110 grayscale-[.85] brightness-[.55] transition-all duration-700 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 group-data-[active=true]:brightness-[.8]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#02050D_0%,rgba(5,12,31,.7)_38%,rgba(10,24,54,.15)_70%,rgba(2,5,13,.5)_100%)]" />
            <div className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-data-[active=true]:opacity-100 bg-[radial-gradient(80%_60%_at_20%_100%,rgba(201,180,140,.55),transparent_70%)]" />
            <span className="lab absolute left-4 top-4 text-gold">{String(index + 1).padStart(2, "0")}</span>

            <article className="absolute inset-0 flex flex-col justify-end gap-3 p-5 md:p-7">
              <h3 className="lab absolute bottom-7 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap text-ivory/80 opacity-100 transition-opacity duration-300 [writing-mode:vertical-rl] md:block group-data-[active=true]:opacity-0">
                {item.title}
              </h3>
              <div className="text-gold opacity-0 transition-all delay-75 duration-500 group-data-[active=true]:opacity-100">{item.icon}</div>
              <h3 className="translate-y-3 font-serif text-[clamp(30px,3.6vw,54px)] leading-[.95] text-ivory opacity-0 transition-all delay-150 duration-500 ease-out group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                {item.title}
              </h3>
              <p className="w-full max-w-sm font-sans text-[15px] leading-relaxed text-ivory/75 opacity-0 transition-all delay-200 duration-500 group-data-[active=true]:opacity-100">
                {item.description}
              </p>
              <a href={item.linkHref} tabIndex={activeIndex === index ? 0 : -1}
                className="lab mt-1 inline-flex w-fit items-center gap-2 border-b border-gold pb-1 text-gold opacity-0 transition-all delay-300 duration-500 group-data-[active=true]:opacity-100">
                Ouvrir la page <span aria-hidden>↗</span>
              </a>
            </article>
          </li>
        ))}
      </ul>
    );
  }
);
ExpandingCards.displayName = "ExpandingCards";
