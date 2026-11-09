import { createContext } from "react";
import type Lenis from "lenis";
export const LenisCtx = createContext<Lenis | null>(null);
