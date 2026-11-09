import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/** gsap.context limité à la page, nettoyé au démontage */
export function useGsap(scope: RefObject<HTMLElement>, fn: (reduce: boolean) => void, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => fn(reduceMotion()), scope);
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => { clearTimeout(id); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
export { gsap, ScrollTrigger };
