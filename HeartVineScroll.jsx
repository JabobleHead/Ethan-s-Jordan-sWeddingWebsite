import { useState, useEffect, useRef, useCallback } from "react";

const FLOWER_PALETTES = [
  { petal: "#7d2035", center: "#f5d090", isLeaf: false },
  { petal: "#8b2252", center: "#fae0a0", isLeaf: false },
  { petal: "#e8a07a", center: "#fff8e0", isLeaf: false },
  { petal: "#d9614a", center: "#ffe8b0", isLeaf: false },
  { petal: "#f0b8c0", center: "#fff5e8", isLeaf: false },
  { petal: "#7a9a6a", center: "#e8f0c0", isLeaf: true  },
];

const SECTIONS = [
  {
    label: "Our Story",
    title: "Where two paths\nbecame one",
    body: "Every love story is beautiful, but ours is my favourite. It began with a glance across a crowded room and grew into a lifetime of adventure, laughter, and belonging.",
    accent: "#c9876a",
    bg: "#faf7f4",
    textSide: "right",
  },
  {
    label: "The Journey",
    title: "A thousand\nlittle moments",
    body: "From quiet mornings to golden evenings, from shared meals to shared dreams — every moment weaves a thread in the tapestry we are building together.",
    accent: "#8b4a5a",
    bg: "#f5f0eb",
    textSide: "left",
  },
  {
    label: "Forever",
    title: "And so our\ngarden grows",
    body: "Like the vine that blooms as it climbs, love deepens with time. We are rooted in each other, reaching upward, flowering in every season.",
    accent: "#6a7a4a",
    bg: "#faf7f4",
    textSide: "right",
  },
];

const HEART_PALETTES = [
  { id: "a", bg1: "#e8c4b0", bg2: "#c9876a", sil1: "#7a4a32", sil2: "#5c3420", border: "#c08060", glow: "#f0c090" },
  { id: "b", bg1: "#c9a0a8", bg2: "#8c4a5a", sil1: "#6a3040", sil2: "#4a2030", border: "#a06070", glow: "#f0c0c8" },
  { id: "c", bg1: "#b0c8a0", bg2: "#6a8a5a", sil1: "#3a5028", sil2: "#2a3c1a", border: "#7a9060", glow: "#d0e8b0" },
];

function HeartFace({ pal }) {
  const clipId = `hc${pal.id}`;
  const gradId = `hg${pal.id}`;
  const heartPath = "M110 188 C110 188 12 118 12 58 C12 28 36 8 64 8 C82 8 97 19 110 35 C123 19 138 8 156 8 C184 8 208 28 208 58 C208 118 110 188 110 188 Z";
  return (
    <svg viewBox="0 0 220 210" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <clipPath id={clipId}><path d={heartPath} /></clipPath>
        <radialGradient id={gradId} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={pal.bg1} />
          <stop offset="100%" stopColor={pal.bg2} />
        </radialGradient>
      </defs>
      <path d={heartPath} fill={`url(#${gradId})`} />
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="220" height="210" fill={pal.bg2} />
        <ellipse cx="84" cy="88" rx="22" ry="28" fill={pal.sil1} opacity="0.75" />
        <path d="M62 115 Q62 90 84 90 Q106 90 106 115 L106 178 Q84 185 62 178 Z" fill={pal.sil1} opacity="0.75" />
        <ellipse cx="138" cy="86" rx="20" ry="26" fill={pal.sil2} opacity="0.78" />
        <path d="M118 112 Q118 88 138 88 Q158 88 158 112 L158 178 Q138 182 118 178 Z" fill={pal.sil2} opacity="0.78" />
        <ellipse cx="111" cy="105" rx="80" ry="88" fill={pal.glow} opacity="0.22" />
      </g>
      <path d={heartPath} fill="none" stroke={pal.border} strokeWidth="3" />
    </svg>
  );
}

// Anchors: start center, swing left (S1), right (S2), left (S3)
function makePathPoints(vh, vw) {
  const leftX = Math.max(130, vw * 0.22);
  const rightX = Math.min(vw - 130, vw * 0.78);
  const centerX = vw / 2;
  return [
    { x: centerX, y: 120 },
    { x: leftX,   y: vh * 0.55 },
    { x: centerX, y: vh * 1.0 },
    { x: rightX,  y: vh * 1.55 },
    { x: centerX, y: vh * 2.0 },
    { x: leftX,   y: vh * 2.55 },
    { x: centerX, y: vh * 3.0 - 80 },
  ];
}

function sampleSpline(anchors, samplesPerSegment = 50) {
  const pts = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[Math.max(0, i - 1)];
    const p1 = anchors[i];
    const p2 = anchors[i + 1];
    const p3 = anchors[Math.min(anchors.length - 1, i + 2)];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 + (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3);
      const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 + (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3);
      pts.push({ x, y });
    }
  }
  pts.push(anchors[anchors.length - 1]);
  return pts;
}

function pointAlongPath(points, cumLen, totalLen, progress) {
  const target = progress * totalLen;
  let lo = 0, hi = cumLen.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cumLen[mid] < target) lo = mid + 1; else hi = mid;
  }
  const idx = Math.max(1, lo);
  const segLen = cumLen[idx] - cumLen[idx - 1] || 1;
  const t = (target - cumLen[idx - 1]) / segLen;
  const p0 = points[idx - 1];
  const p1 = points[idx];
  return {
    x: p0.x + (p1.x - p0.x) * t,
    y: p0.y + (p1.y - p0.y) * t,
    tx: p1.x - p0.x,
    ty: p1.y - p0.y,
  };
}

function drawFlower(ctx, x, y, flower, time) {
  const { scale, angle, palette, petalCount, sway } = flower;
  if (scale <= 0) return;
  const swayAngle = Math.sin(time * 0.001 + sway) * 0.08;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + swayAngle);
  ctx.scale(scale, scale);
  if (palette.isLeaf) {
    ctx.fillStyle = "#7a9a6a";
    ctx.strokeStyle = "#4a6a3a";
    ctx.lineWidth = 0.8;
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.scale(s, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(14, -11, 24, -7, 19, 0);
      ctx.bezierCurveTo(24, 7, 14, 11, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  } else {
    for (let i = 0; i < petalCount; i++) {
      const a = (i / petalCount) * Math.PI * 2;
      ctx.save();
      ctx.rotate(a);
      ctx.fillStyle = palette.petal;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.ellipse(0, -12, 5.5, 9.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = palette.center;
    ctx.strokeStyle = palette.petal;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

export default function App() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    scrollY: 0,
    targetScrollY: 0,
    flowers: [],
    pathPoints: [],
    cumLen: [],
    totalLen: 0,
    initialized: false,
    lastFlipSection: -1,
    startTime: performance.now(),
  });
  const rafRef = useRef(null);

  const [flipped, setFlipped] = useState(false);
  const [palIdx, setPalIdx] = useState(0);
  const [heartPos, setHeartPos] = useState({ x: 0, y: 80, scale: 1, zIndex: 20 });
  const [winW, setWinW] = useState(window.innerWidth);
  const [winH, setWinH] = useState(window.innerHeight);

  const buildPath = useCallback((vw, vh) => {
    const anchors = makePathPoints(vh, vw);
    const pts = sampleSpline(anchors, 50);
    const cum = [0];
    for (let i = 1; i < pts.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    }
    const totalLen = cum[cum.length - 1];

    // pre-place flowers along entire path
    const flowers = [];
    let d = 30;
    let idx = 0;
    while (d < totalLen - 20) {
      while (idx < cum.length - 1 && cum[idx] < d) idx++;
      const p = pts[Math.max(0, idx - 1)];
      const q = pts[idx];
      const segLen = cum[idx] - cum[Math.max(0, idx - 1)] || 1;
      const t = (d - cum[Math.max(0, idx - 1)]) / segLen;
      const x = p.x + (q.x - p.x) * t;
      const y = p.y + (q.y - p.y) * t;
      const tx = q.x - p.x, ty = q.y - p.y;
      const nLen = Math.hypot(tx, ty) || 1;
      const nx = -ty / nLen, ny = tx / nLen;
      const side = (flowers.length % 2 === 0 ? 1 : -1) * (18 + Math.random() * 28);
      const palI = Math.floor(Math.random() * FLOWER_PALETTES.length);
      flowers.push({
        wx: x + nx * side + (Math.random() - 0.5) * 10,
        wy: y + ny * side + (Math.random() - 0.5) * 10,
        pathDist: d,
        scale: 0.5 + Math.random() * 0.6,
        angle: Math.random() * Math.PI * 2,
        palette: FLOWER_PALETTES[palI],
        petalCount: 4 + Math.floor(Math.random() * 4),
        sway: Math.random() * Math.PI * 2,
        bloomBoost: 1,
      });
      d += 30 + Math.random() * 18;
    }

    stateRef.current.pathPoints = pts;
    stateRef.current.cumLen = cum;
    stateRef.current.totalLen = totalLen;
    stateRef.current.flowers = flowers;
    stateRef.current.initialized = true;
  }, []);

  useEffect(() => { buildPath(winW, winH); }, [winW, winH, buildPath]);

  useEffect(() => {
    const onResize = () => { setWinW(window.innerWidth); setWinH(window.innerHeight); };
    const onScroll = () => { stateRef.current.targetScrollY = window.scrollY; };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("scroll", onScroll); };
  }, []);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const s = stateRef.current;
    if (!canvas || !s.initialized) { rafRef.current = requestAnimationFrame(tick); return; }
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const time = performance.now() - s.startTime;

    s.scrollY += (s.targetScrollY - s.scrollY) * 0.12;
    const sy = s.scrollY;

    const maxScroll = Math.max(1, SECTIONS.length * window.innerHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, sy / maxScroll));
    const pathProgress = progress * 0.98;

    const hp = pointAlongPath(s.pathPoints, s.cumLen, s.totalLen, pathProgress);

    // Orbit around the vine: angle advances with path distance
    // cos(angle) = horizontal offset from vine (perpendicular to path tangent)
    // sin(angle) = depth: +1 = in front of vine, -1 = behind vine
    const orbitAngle = pathProgress * Math.PI * 8; // 4 full wraps over the page
    const orbitRadius = 60; // how far heart swings off the vine
    const nLen = Math.hypot(hp.tx, hp.ty) || 1;
    const nx = -hp.ty / nLen;
    const ny = hp.tx / nLen;
    const offsetMag = Math.cos(orbitAngle) * orbitRadius;
    const heartX = hp.x + nx * offsetMag;
    const heartWorldY = hp.y + ny * offsetMag;
    const heartScreenY = heartWorldY - sy;

    // depth: subtle scale to fake the "behind/in front of vine" effect
    const depth = Math.sin(orbitAngle);
    const scale = 1 + depth * 0.08;
    const heartZ = depth >= 0 ? 20 : 5;

    setHeartPos({ x: heartX, y: heartScreenY, scale, zIndex: heartZ });

    ctx.clearRect(0, 0, W, H);

    // vine with animated wobble
    ctx.save();
    ctx.translate(0, -sy);
    const pts = s.pathPoints;
    if (pts.length >= 2) {
      ctx.strokeStyle = "#5a7040";
      ctx.lineWidth = 2.8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1], c = pts[i];
        const wobble = Math.sin(c.y * 0.015 + time * 0.0008) * 1.8;
        const mx = (p.x + c.x) / 2 + wobble;
        const my = (p.y + c.y) / 2;
        ctx.quadraticCurveTo(p.x + wobble, p.y, mx, my);
      }
      ctx.stroke();

      // tendrils
      for (let i = 8; i < pts.length; i += 10) {
        const pt = pts[i];
        const sway = Math.sin(pt.y * 0.04 + time * 0.0009) * 1.4;
        const len = 12 + Math.sin(pt.y * 0.1 + time * 0.001) * 5;
        const ang = sway + (i % 2 === 0 ? 0.4 : -0.4);
        ctx.save();
        ctx.strokeStyle = "#6a8050";
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.quadraticCurveTo(
          pt.x + Math.cos(ang) * len * 0.5,
          pt.y + Math.sin(ang) * len * 0.3,
          pt.x + Math.cos(ang) * len,
          pt.y + Math.sin(ang) * len * 0.6
        );
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();

    // flowers with bloom boost near heart
    const heartPathDist = pathProgress * s.totalLen;
    for (const f of s.flowers) {
      const dAlongPath = Math.abs(f.pathDist - heartPathDist);
      const proximity = Math.max(0, 1 - dAlongPath / 180);
      const boost = 1 + proximity * 0.4;
      f.bloomBoost = f.bloomBoost + (boost - f.bloomBoost) * 0.08;

      const screenY = f.wy - sy;
      if (screenY < -80 || screenY > H + 80) continue;

      const drawF = { ...f, scale: f.scale * f.bloomBoost };
      drawFlower(ctx, f.wx, screenY, drawF, time);
    }

    // section flip
    const vh = window.innerHeight;
    let section = 0;
    if (sy >= vh * 2 - 150) section = 2;
    else if (sy >= vh - 150) section = 1;
    if (section !== s.lastFlipSection) {
      s.lastFlipSection = section;
      setFlipped(section % 2 === 1);
      setPalIdx(section);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const frontPal = HEART_PALETTES[palIdx % HEART_PALETTES.length];
  const backPal = HEART_PALETTES[(palIdx + 1) % HEART_PALETTES.length];

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", minHeight: "300vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Jost:wght@300;400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .hflipper { width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform 0.9s cubic-bezier(0.4,0.2,0.2,1); }
        .hflipper.on { transform: rotateY(180deg); }
        .hface { position:absolute;width:100%;height:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden; }
        .hface.back { transform: rotateY(180deg); }
        .scroll-hint { display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;margin-top:36px; }
      `}</style>

      <canvas
        ref={canvasRef}
        width={winW}
        height={winH}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }}
      />

      <div style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: `translate(${heartPos.x - 110}px, ${heartPos.y - 105}px) scale(${heartPos.scale})`,
        width: 220, height: 210,
        zIndex: heartPos.zIndex,
        perspective: 900,
        filter: "drop-shadow(0 10px 38px rgba(100,40,20,0.25))",
        willChange: "transform",
        pointerEvents: "none",
      }}>
        <div className={`hflipper${flipped ? " on" : ""}`}>
          <div className="hface front"><HeartFace pal={frontPal} /></div>
          <div className="hface back"><HeartFace pal={backPal} /></div>
        </div>
      </div>

      {SECTIONS.map((sec, i) => (
        <section key={i} style={{
          minHeight: "100vh",
          background: sec.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: sec.textSide === "right" ? "flex-end" : "flex-start",
          padding: i === 0 ? "180px 8% 80px" : "80px 8%",
        }}>
          <div style={{ maxWidth: 420, zIndex: 1, position: "relative" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sec.accent, marginBottom: 16, fontWeight: 400 }}>
              {sec.label}
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#3a2a20",
              lineHeight: 1.12,
              marginBottom: 20,
              whiteSpace: "pre-line",
            }}>
              {sec.title}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#7a6a60", fontWeight: 300 }}>
              {sec.body}
            </p>
            {i < SECTIONS.length - 1 && (
              <div className="scroll-hint" style={{ color: sec.accent }}>
                <span style={{ display: "block", width: 28, height: 1, background: sec.accent }} />
                scroll to continue
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
