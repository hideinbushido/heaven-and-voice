import * as React from "react";
import { LayeredText } from "@/components/ui/text-fx";
import * as THREE from "three";
import { Play, X, ArrowRight } from "lucide-react";
import { MEMBERS, BIOS } from "@/data";
import { gsap, reduceMotion } from "@/lib/use-gsap";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

/* L'équipe — d'après jesperlandberg.com (ta vidéo d'exemple) :
   un ruban de grandes cartes courbées autour du regard, au-dessus d'une grille au sol.
   La molette ou le glisser fait défiler le ruban ; les cartes se tordent avec la vitesse
   et la carte survolée se bombe. Un clic : la carte s'ouvre en grand panneau
   (texte à gauche, photos et vidéos qui défilent à droite). */

type Card = { kind: "member"; m: number } | { kind: "video"; src: string; label: string } | { kind: "quote"; text: string; label: string };
const CARDS: Card[] = [
  { kind: "member", m: 0 }, { kind: "video", src: "m/session.mp4", label: "En session" }, { kind: "member", m: 1 }, { kind: "member", m: 2 },
  { kind: "quote", text: "Plus qu'un collectif, une famille.", label: "Six voix" }, { kind: "member", m: 3 },
  { kind: "video", src: "m/gloria.mp4", label: "Gloria Dakar" }, { kind: "member", m: 4 }, { kind: "member", m: 5 },
];

const VERT = /* glsl */ `
uniform float uX; uniform float uR; uniform float uBulge; uniform float uVel; uniform vec2 uSize;
varying vec2 vUv; varying float vShade;
void main(){
  vUv = uv;
  vec3 p = position;
  float wx = uX + p.x;                       // position le long du ruban
  float a = wx / uR;                          // angle sur le cylindre
  float lx = p.x / uSize.x, ly = p.y / uSize.y;
  float bulge = uBulge * cos(lx * 3.14159) * cos(ly * 3.14159);
  float r = uR - bulge * 0.9;
  float y = p.y + uVel * 0.55 * sin(a * 1.6 + lx * 1.2) ;
  vec3 world = vec3(sin(a) * r, y, -cos(a) * r);
  vShade = clamp(1.0 - abs(a) * 0.55, 0.15, 1.0);
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
}`;
const FRAG = /* glsl */ `
uniform sampler2D uTex; uniform vec2 uSize; uniform float uRadius; uniform float uHover;
varying vec2 vUv; varying float vShade;
float sdRound(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }
void main(){
  vec2 p = (vUv - 0.5) * uSize;
  float d = sdRound(p, uSize * 0.5, uRadius);
  float aa = fwidth(d);
  float alpha = 1.0 - smoothstep(-aa, aa, d);
  vec3 col = texture2D(uTex, vUv).rgb;
  col *= mix(0.55, 1.0, vShade) * (1.0 + uHover * 0.06);
  gl_FragColor = vec4(col, alpha);
  #include <colorspace_fragment>
}`;

function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) { g.beginPath(); g.roundRect(x, y, w, h, r); }
function memberTexture(i: number) {
  const m = MEMBERS[i], W = 1400, H = 820, c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#12285A"); bg.addColorStop(0.55, "#0A1836"); bg.addColorStop(1, "#050C1F");
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(W * 0.2, H * 0.1, 0, W * 0.2, H * 0.1, W * 0.6); glow.addColorStop(0, "rgba(201,180,140,.18)"); glow.addColorStop(1, "rgba(201,180,140,0)");
  g.fillStyle = glow; g.fillRect(0, 0, W, H);
  // cadre portrait ivoire (à fournir)
  const px = W * 0.6, py = 70, pw = W * 0.34, ph = H - 140;
  g.fillStyle = "#EFE7D8"; rr(g, px, py, pw, ph, 18); g.fill();
  g.save(); rr(g, px, py, pw, ph, 18); g.clip(); g.strokeStyle = "rgba(5,12,31,.08)"; g.lineWidth = 1.5;
  for (let k = -ph; k < pw; k += 22) { g.beginPath(); g.moveTo(px + k, py + ph); g.lineTo(px + k + ph, py); g.stroke(); } g.restore();
  g.fillStyle = "rgba(5,12,31,.55)"; g.font = "600 17px 'Work Sans', sans-serif"; g.fillText("PORTRAIT · FOND IVOIRE · À FOURNIR", px + 26, py + ph - 28);
  // nom
  g.fillStyle = "#F3EDE1"; g.font = "160px 'Instrument Serif', serif"; g.fillText(m.f, 64, 250);
  g.fillStyle = "#C9B48C"; g.font = "italic 160px 'Instrument Serif', serif"; g.fillText(m.l, 64, 400);
  g.fillStyle = "rgba(243,237,225,.85)"; g.font = "500 26px 'Work Sans', sans-serif";
  m.r.forEach((r, k) => { g.beginPath(); g.arc(76, 478 + k * 44 - 9, 8, 0, 7); g.strokeStyle = "rgba(201,180,140,.9)"; g.lineWidth = 2; g.stroke(); g.fillText(r, 100, 478 + k * 44); });
  g.fillStyle = "rgba(243,237,225,.95)"; g.font = "600 30px 'Work Sans', sans-serif"; g.fillText(`${m.f} ${m.l}`, 64, H - 64);
  g.fillStyle = "rgba(201,180,140,.9)"; g.font = "600 17px 'Work Sans', sans-serif"; g.fillText(`0${i + 1} — ( SN )`, 64, 80);
  return c;
}
function quoteTexture(text: string, label: string) {
  const W = 1400, H = 820, c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d")!;
  g.fillStyle = "#03060F"; g.fillRect(0, 0, W, H);
  for (let k = 0; k < 220; k++) { g.fillStyle = `rgba(243,237,225,${Math.random() * 0.5})`; g.fillRect(Math.random() * W, Math.random() * H, 1.6, 1.6); }
  g.fillStyle = "#C9B48C"; g.font = "italic 104px 'Instrument Serif', serif"; g.textAlign = "center";
  const words = text.split(" "); let line = "", y = 330; const lines: string[] = [];
  words.forEach((w) => { const t = line ? line + " " + w : w; if (g.measureText(t).width > W - 260) { lines.push(line); line = w; } else line = t; }); lines.push(line);
  lines.forEach((l, k) => g.fillText(l, W / 2, y + k * 110));
  g.textAlign = "left"; g.fillStyle = "rgba(243,237,225,.95)"; g.font = "600 30px 'Work Sans', sans-serif"; g.fillText(label, 64, H - 64);
  return c;
}

export default function Equipe() {
  const host = React.useRef<HTMLDivElement>(null);
  const panel = React.useRef<HTMLDivElement>(null);
  const rectOf = React.useRef<(i: number) => DOMRect | null>(() => null);
  const [open, setOpen] = React.useState<number | null>(null);
  const [front, setFront] = React.useState(0);

  React.useEffect(() => {
    const el = host.current!; const narrow = innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setClearColor("#02050D");
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); scene.fog = new THREE.Fog("#02050D", 7, 22);
    const cam = new THREE.PerspectiveCamera(narrow ? 70 : 52, 1, 0.1, 100);
    const R = narrow ? 6 : 8, CW = narrow ? 4.6 : 6.6, CH = CW * 0.586, GAP = narrow ? 0.25 : 0.35, STEP = CW + GAP, L = STEP * CARDS.length;
    cam.position.set(0, 0.35, narrow ? 1.6 : 2.4); cam.lookAt(0, 0.05, -R);
    const grid = new THREE.GridHelper(200, 90, "#24304D", "#162038"); grid.position.y = -CH / 2 - 1.1;
    (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.7; scene.add(grid);

    const meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>[] = [];
    const videos: HTMLVideoElement[] = [];
    let disposed = false;
    const build = () => {
      if (disposed) return;
      CARDS.forEach((cd, i) => {
        let tex: THREE.Texture;
        if (cd.kind === "video") {
          const v = document.createElement("video"); v.src = cd.src; v.muted = true; v.loop = true; v.playsInline = true; v.crossOrigin = "anonymous";
          v.addEventListener("loadedmetadata", () => { if (cd.src.includes("gloria")) v.currentTime = 5; });
          v.play().catch(() => {}); videos.push(v); tex = new THREE.VideoTexture(v);
        } else tex = new THREE.CanvasTexture(cd.kind === "member" ? memberTexture(cd.m) : quoteTexture(cd.text, cd.label));
        tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
        const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, fog: false,
          uniforms: { uTex: { value: tex }, uX: { value: 0 }, uR: { value: R }, uBulge: { value: 0 }, uVel: { value: 0 }, uSize: { value: new THREE.Vector2(CW, CH) }, uRadius: { value: 0.18 }, uHover: { value: 0 } } });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(CW, CH, 48, 24), mat);
        mesh.frustumCulled = false; mesh.userData = { i, base: i * STEP, bulge: 0 }; scene.add(mesh); meshes.push(mesh);
      });
    };
    (document.fonts ? Promise.all([document.fonts.load("100px 'Instrument Serif'"), document.fonts.load("italic 100px 'Instrument Serif'"), document.fonts.load("600 20px 'Work Sans'")]).then(() => document.fonts.ready) : Promise.resolve()).then(build, build);

    const size = () => { renderer.setSize(el.clientWidth, el.clientHeight, false); renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:none"; cam.aspect = el.clientWidth / el.clientHeight; cam.updateProjectionMatrix(); };
    size(); addEventListener("resize", size);

    // défilement du ruban
    let offset = 0, target = 0, vel = 0, drag: { x: number; y: number; t0: number; moved: boolean } | null = null;
    const wrap = (x: number) => ((((x + L / 2) % L) + L) % L) - L / 2;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); target -= (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.006; };
    const ndc = new THREE.Vector2(9, 9);
    const setNdc = (e: PointerEvent) => { const r = el.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); };
    const down = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY, t0: target, moved: false }; lastX = e.clientX; lastT = performance.now(); flick = 0; setNdc(e); };
    let lastX = 0, lastT = 0, flick = 0;
    const move = (e: PointerEvent) => { setNdc(e); if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.hypot(dx, dy) > 6) drag.moved = true;
      // le ruban suit la main : on tire vers la droite, il part vers la droite
      const k = (narrow ? 0.016 : 0.011); target = drag.t0 + dx * k;
      const now = performance.now(); flick = (e.clientX - lastX) / Math.max(1, now - lastT) * k * 16; lastX = e.clientX; lastT = now; };
    const up = () => { if (drag && !drag.moved && hovered >= 0) { const cd = CARDS[hovered]; if (cd.kind === "member") openMember(cd.m); } if (drag?.moved) target += flick * 10; drag = null; };
    el.addEventListener("wheel", onWheel, { passive: false }); el.addEventListener("pointerdown", down); addEventListener("pointermove", move); addEventListener("pointerup", up);
    el.addEventListener("pointerleave", () => ndc.set(9, 9));

    // carte sous le pointeur : intersection du rayon avec le cylindre
    const ray = new THREE.Raycaster(); let hovered = -1;
    const pick = () => {
      ray.setFromCamera(ndc, cam); const o = ray.ray.origin, d = ray.ray.direction;
      const a = d.x * d.x + d.z * d.z, b = 2 * (o.x * d.x + o.z * d.z), c = o.x * o.x + o.z * o.z - R * R;
      const t = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a); if (!isFinite(t)) return -1;
      const p = o.clone().addScaledVector(d, t); const wx = Math.atan2(p.x, -p.z) * R;
      if (Math.abs(p.y) > CH / 2) return -1;
      for (const m of meshes) { const cx = m.material.uniforms.uX.value; if (Math.abs(wx - cx) < CW / 2) return m.userData.i; }
      return -1;
    };
    const corner = (cx: number, lx: number, ly: number) => { const a = (cx + lx) / R; return new THREE.Vector3(Math.sin(a) * R, ly, -Math.cos(a) * R).project(cam); };
    rectOf.current = (ci: number) => {
      const m = meshes[ci]; if (!m) return null; const cx = m.material.uniforms.uX.value; const r = el.getBoundingClientRect();
      const pts = [corner(cx, -CW / 2, CH / 2), corner(cx, CW / 2, CH / 2), corner(cx, -CW / 2, -CH / 2), corner(cx, CW / 2, -CH / 2)].map((v) => [((v.x + 1) / 2) * r.width + r.left, ((1 - v.y) / 2) * r.height + r.top]);
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      return new DOMRect(Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    };
    const openMember = (mi: number) => setOpen(mi);
    (el as any).__goto = (mi: number) => { const ci = CARDS.findIndex((c) => c.kind === "member" && c.m === mi); target += -wrap(ci * STEP + offset); };

    const reduce = reduceMotion(); let raf = 0, lastFront = -1;
    const frame = () => {
      const prev = offset; offset += (target - offset) * (reduce ? 1 : 0.075); vel += ((offset - prev) * 2.2 - vel) * 0.15;
      hovered = drag?.moved ? -1 : pick();
      el.style.cursor = drag?.moved ? "grabbing" : hovered >= 0 && CARDS[hovered].kind === "member" ? "pointer" : "grab";
      let best = 0, bd = 1e9;
      meshes.forEach((m) => {
        const cx = wrap(m.userData.base + offset); const u = m.material.uniforms;
        u.uX.value = cx; m.userData.bulge += ((m.userData.i === hovered ? 0.85 : 0) - m.userData.bulge) * 0.1;
        u.uBulge.value = m.userData.bulge + Math.abs(vel) * 0.25; u.uVel.value = reduce ? 0 : THREE.MathUtils.clamp(vel, -1.2, 1.2);
        u.uHover.value = m.userData.i === hovered ? 1 : 0;
        if (Math.abs(cx) < bd) { bd = Math.abs(cx); best = m.userData.i; }
      });
      if (best !== lastFront) { lastFront = best; setFront(best); }
      renderer.render(scene, cam); raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      disposed = true; cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", move); removeEventListener("pointerup", up);
      el.removeEventListener("wheel", onWheel); el.removeEventListener("pointerdown", down);
      videos.forEach((v) => { v.pause(); v.removeAttribute("src"); v.load(); });
      meshes.forEach((m) => { m.material.uniforms.uTex.value.dispose(); m.material.dispose(); m.geometry.dispose(); });
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);

  // ouverture : le panneau part du rectangle de la carte
  const cardIndex = (mi: number) => CARDS.findIndex((c) => c.kind === "member" && c.m === mi);
  React.useLayoutEffect(() => {
    if (open === null || !panel.current) return;
    const r = rectOf.current(cardIndex(open)); const p = panel.current;
    const W = innerWidth, H = innerHeight;
    const from = r && !reduceMotion() ? `inset(${Math.max(0, r.top)}px ${Math.max(0, W - r.right)}px ${Math.max(0, H - r.bottom)}px ${Math.max(0, r.left)}px round 18px)` : "inset(12px 12px 12px 12px round 16px)";
    gsap.fromTo(p, { clipPath: from }, { clipPath: "inset(12px 12px 12px 12px round 16px)", duration: reduceMotion() ? 0 : 0.85, ease: "expo.inOut" });
    gsap.fromTo(p.querySelectorAll(".pn-in"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, delay: 0.45, ease: "expo.out" });
  }, [open]);
  const close = () => {
    const p = panel.current; if (!p || open === null) return setOpen(null);
    const r = rectOf.current(cardIndex(open)); const W = innerWidth, H = innerHeight;
    if (!r || reduceMotion()) return setOpen(null);
    gsap.to(p, { clipPath: `inset(${Math.max(0, r.top)}px ${Math.max(0, W - r.right)}px ${Math.max(0, H - r.bottom)}px ${Math.max(0, r.left)}px round 18px)`, duration: 0.7, ease: "expo.inOut", onComplete: () => setOpen(null) });
  };
  React.useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && close(); addEventListener("keydown", k); return () => removeEventListener("keydown", k); });

  const m = open !== null ? MEMBERS[open] : null; const bio = m ? BIOS[m.f] : null;
  const fc = CARDS[front];
  return (
    <section className="relative h-[100svh] overflow-hidden bg-night-950" aria-label="L'équipe" data-lenis-prevent>
      <div ref={host} className="absolute inset-0" />
      <div className="wrap pointer-events-none absolute inset-x-0 top-[96px] flex items-start justify-between">
        <div><span className="lab text-mist">Heaven &amp; Voice</span><h1 className="pointer-events-auto mt-3 font-display text-[clamp(40px,5vw,84px)] font-light leading-[.92] tracking-[-.015em] text-ivory"><LayeredText text="L'équipe" /></h1></div>
        <span className="lab text-gold">{fc && fc.kind === "member" ? `${MEMBERS[fc.m].f} ${MEMBERS[fc.m].l}` : fc?.kind === "video" ? fc.label : "Six voix"}</span>
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-16 flex justify-between"><span className="lab text-ivory/70">Glissez ou utilisez la molette</span><span className="lab text-ivory/70">Cliquez sur un membre</span></div>
      <nav className="sr-only" aria-label="Membres">{MEMBERS.map((x, i) => <button key={x.f} onClick={() => setOpen(i)}>{x.f} {x.l}, {x.r.join(", ")}</button>)}</nav>

      {m && bio && open !== null && (
        <div ref={panel} role="dialog" aria-modal="true" aria-label={`${m.f} ${m.l}`} className="fixed inset-0 z-[90] bg-ivory text-night-900" data-lenis-prevent>
          <button onClick={close} aria-label="Fermer" className="pn-in absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full bg-night-900 text-ivory"><X className="h-4 w-4" /></button>
          <div className="grid h-full p-3 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:p-3">
            <div className="overflow-y-auto p-6 md:p-12 max-md:max-h-[44svh]">
              <span className="pn-in lab block text-night-900/55">Membre 0{open + 1} · nom fictif</span>
              <h2 className="pn-in mt-4 font-display text-[clamp(44px,5vw,88px)] leading-[.92] tracking-[-.015em]">{m.f}<br /><span className="text-[#8C7650]">{m.l}</span></h2>
              <div className="pn-in mt-6 flex flex-wrap gap-2">{[...m.r, ...bio.genres, `Depuis : ${bio.since}`].map((t) => <span key={t} className="lab rounded-full border border-night-900/20 px-3 py-1.5 text-night-900/75">{t}</span>)}</div>
              <div className="pn-in mt-8 grid max-w-[460px] gap-4 font-sans text-[16px] leading-relaxed text-night-900/80">{bio.story.map((p) => <p key={p}>{p}</p>)}</div>
              <div className="pn-in mt-10 flex flex-wrap items-center gap-3">
                <button onClick={() => setOpen((open + 1) % MEMBERS.length)} className="lab inline-flex h-10 items-center gap-2 rounded-full border border-night-900/30 px-4 hover:bg-night-900 hover:text-ivory">{MEMBERS[(open + 1) % MEMBERS.length].f} <ArrowRight className="h-3.5 w-3.5" /></button>
                <LiquidMetalButton href="#reservation" size="sm">Demander un devis</LiquidMetalButton>
              </div>
            </div>
            <div className="overflow-y-auto px-1 pb-3 md:px-6 md:py-6">
              <div className="grid gap-3 md:gap-5">
                {bio.media.map((x, k) => (
                  <figure key={k} className="pn-in relative overflow-hidden rounded-[10px] bg-night-900">
                    {x.vid ? <video src={x.vid} poster={x.img} autoPlay muted loop playsInline className="aspect-video w-full object-cover" /> : <img src={x.img} alt={x.cap} className="aspect-[16/10] w-full object-cover" />}
                    <figcaption className="lab absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-night-950/70 px-3 py-1.5 text-ivory backdrop-blur">{x.vid && <Play className="h-3 w-3" />}{x.cap} · provisoire</figcaption>
                  </figure>
                ))}
                <div className="ph light pn-in aspect-[16/10] rounded-[10px]" data-ph={`Portrait de ${m.f} · fond ivoire · à fournir`} />
                <div className="ph light pn-in aspect-video rounded-[10px]" data-ph={`Vidéo de ${m.f} · 5 à 10 s · à fournir`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
