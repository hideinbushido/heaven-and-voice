// Copie les médias du site dans dist/m. Les captures des sites de référence restent hors ligne.
import { cpSync, mkdirSync, readdirSync } from "node:fs";
const REFS = /^(diamo|equipe-ref|flyhigh|hallo|inherited|landberg-\d|monce-\d|morrow|noah-[a-z]+|storm|utopia|voxenora-\d|zen)\.jpg$/;
mkdirSync("dist/m", { recursive: true });
for (const f of readdirSync("public/m")) if (process.env.VITE_SHOW_REFS === "1" || !REFS.test(f)) cpSync(`public/m/${f}`, `dist/m/${f}`);
