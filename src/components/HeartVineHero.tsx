import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SECTIONS } from '../content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { Flower, FlowerPalette, HeartPalette, Point, Tangent } from '../types';
import { HeartFace } from './HeartFace';
import { HeartImageSlot } from './HeartImageSlot';

function firstUrl(mods: Record<string, string>): string | null {
  return Object.values(mods)[0] ?? null;
}

const HEART_PHOTOS: (string | null)[] = [
  firstUrl(
    import.meta.glob('../assets/heart-1.{jpg,jpeg,png,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    }) as Record<string, string>,
  ),
  firstUrl(
    import.meta.glob('../assets/heart-2.{jpg,jpeg,png,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    }) as Record<string, string>,
  ),
  firstUrl(
    import.meta.glob('../assets/heart-3.{jpg,jpeg,png,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    }) as Record<string, string>,
  ),
  firstUrl(
    import.meta.glob('../assets/heart-4.{jpg,jpeg,png,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    }) as Record<string, string>,
  ),
];

const heroLeftModules = import.meta.glob(
  '../assets/hero-left.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;
const heroRightModules = import.meta.glob(
  '../assets/hero-right.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;
const heroLeftUrl: string | null = Object.values(heroLeftModules)[0] ?? null;
const heroRightUrl: string | null = Object.values(heroRightModules)[0] ?? null;

// ─── Palette ──────────────────────────────────────────────────────────────────
// FlowerPalette.petals[] replaces the old single `petal` / `petalDeep` fields.
// centerRing is used by anemone. shadow is the darkest tone for depth.

const FLOWER_PALETTES: FlowerPalette[] = [
  // Deep burgundy peony
  {
    kind: 'peony',
    petal: '#7D2035', petals: ['#7D2035', '#9B2A45', '#B83558', '#C8506A'],
    center: '#F5D090', shadow: '#5A1028', isLeaf: false,
  },
  // Blush peony
  {
    kind: 'peony',
    petal: '#E8B4C0', petals: ['#E8B4C0', '#D898A8', '#C87898', '#B86080'],
    center: '#FAE8C0', shadow: '#A05070', isLeaf: false,
  },
  // Coral rose
  {
    kind: 'rose',
    petal: '#D9614A', petals: ['#D9614A', '#C04838', '#E07A60'],
    center: '#FFE8B0', shadow: '#A03020', isLeaf: false,
  },
  // Burgundy rose
  {
    kind: 'rose',
    petal: '#7D2035', petals: ['#7D2035', '#9B2A45', '#6A1828'],
    center: '#F5D090', shadow: '#5A1028', isLeaf: false,
  },
  // Pale pink anemone
  {
    kind: 'anemone',
    petal: '#F0B8C8', petals: ['#F0B8C8', '#E8A0B4', '#DDA8C0'],
    center: '#2E1A28', centerRing: '#6A3848', isLeaf: false,
  },
  // Wine anemone
  {
    kind: 'anemone',
    petal: '#A83058', petals: ['#A83058', '#8B2048', '#C04070'],
    center: '#1A0C14', centerRing: '#5A1830', isLeaf: false,
  },
  // Apricot bud
  {
    kind: 'bud',
    petal: '#E8A07A', petals: ['#E8A07A', '#D9614A'],
    center: '#F5C8A0', shadow: '#B06040', isLeaf: false,
  },
  // Leaf — dark
  {
    kind: 'leaf',
    petal: '#4A6B38', petals: ['#4A6B38'],
    center: '', shadow: '#2E4A22', isLeaf: true,
  },
  // Leaf — lighter
  {
    kind: 'leaf',
    petal: '#6A9050', petals: ['#6A9050'],
    center: '', shadow: '#4A6B38', isLeaf: true,
  },
];

const HEART_PALETTES: HeartPalette[] = [
  { id: 'a', bg1: '#E8C4B0', bg2: '#C9876A', sil1: '#7A4A32', sil2: '#5C3420', border: '#C08060', glow: '#F0C090' },
  { id: 'b', bg1: '#C9A0A8', bg2: '#8C4A5A', sil1: '#6A3040', sil2: '#4A2030', border: '#A06070', glow: '#F0C0C8' },
  { id: 'c', bg1: '#B0C8A0', bg2: '#6A8A5A', sil1: '#3A5028', sil2: '#2A3C1A', border: '#7A9060', glow: '#D0E8B0' },
];

const VINE_STROKE = '#2E5228';
const VINE_HIGHLIGHT = '#4A7A3A';
const LEAF_FILL = '#4A6B38';
const LEAF_SHADOW = '#2E4A22';
const LEAF_VEIN = '#1F3814';

// ─── Path helpers (unchanged) ─────────────────────────────────────────────────

function orbitRadiusFor(winW: number): number {
  if (winW < 640) return 0;
  if (winW < 1024) return 40;
  return 60;
}

function makePathPoints(docH: number, vw: number, vh: number): Point[] {
  const leftX = Math.max(130, vw * 0.22);
  const rightX = Math.min(vw - 130, vw * 0.78);
  const centerX = vw / 2;
  const collageH = Math.min(560, Math.max(320, vh * 0.52));
  const topY = 180 + collageH / 2;
  const bottomY = Math.max(docH - 80, topY + 600);
  const span = bottomY - topY;
  const step = span / 6;
  return [
    { x: centerX, y: topY },
    { x: leftX, y: topY + step },
    { x: centerX, y: topY + step * 2 },
    { x: rightX, y: topY + step * 3 },
    { x: centerX, y: topY + step * 4 },
    { x: leftX, y: topY + step * 5 },
    { x: centerX, y: bottomY },
  ];
}

function sampleSpline(anchors: Point[], samplesPerSegment = 50): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[Math.max(0, i - 1)];
    const p1 = anchors[i];
    const p2 = anchors[i + 1];
    const p3 = anchors[Math.min(anchors.length - 1, i + 2)];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      pts.push({ x, y });
    }
  }
  pts.push(anchors[anchors.length - 1]);
  return pts;
}

function pointAlongPath(
  points: Point[],
  cumLen: number[],
  totalLen: number,
  progress: number,
): Tangent {
  const target = progress * totalLen;
  let lo = 0;
  let hi = cumLen.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cumLen[mid] < target) lo = mid + 1;
    else hi = mid;
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

function buildVineD(pts: Point[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const mx = (p.x + c.x) / 2;
    const my = (p.y + c.y) / 2;
    d += ` Q ${p.x} ${p.y} ${mx} ${my}`;
  }
  return d;
}

// ─── State / styled (unchanged) ───────────────────────────────────────────────

type HeroState = {
  scrollY: number;
  targetScrollY: number;
  flowers: Flower[];
  pathPoints: Point[];
  cumLen: number[];
  totalLen: number;
  initialized: boolean;
  lastFlipPhase: number;
  startTime: number;
  winW: number;
  winH: number;
  orbitRadius: number;
  docHeight: number;
};

type FaceState = { pal: HeartPalette; photoUrl: string | null };

function faceForPhase(i: number): FaceState {
  return {
    pal: HEART_PALETTES[i % HEART_PALETTES.length],
    photoUrl: HEART_PHOTOS[i] ?? null,
  };
}

const StageWrap = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
`;

const Stage = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: visible;
  will-change: transform;
`;

const VineShadow = styled.path`
  fill: none;
  stroke: rgba(30, 50, 22, 0.25);
  stroke-width: 9;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const VineBody = styled.path`
  fill: none;
  stroke: ${VINE_STROKE};
  stroke-width: 5.5;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const VineHighlight = styled.path`
  fill: none;
  stroke: ${VINE_HIGHLIGHT};
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.7;
  transform: translateX(-1.4px);
`;

const HeroCollage = styled.div`
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: min(96vw, 1400px);
  height: clamp(320px, 52vh, 560px);
  pointer-events: none;
  z-index: 12;
  will-change: opacity;
  box-shadow: 0 20px 60px rgba(60, 30, 20, 0.22);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: none;
  }
`;

const CollageSlot = styled.div`
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.creamDeep};
`;

const CollageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CollagePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed ${({ theme }) => theme.colors.burgundy};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 16px;
`;

const HeroTitle = styled.div`
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  height: clamp(320px, 52vh, 560px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  pointer-events: none;
  z-index: 30;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(32px, 4.6vw, 64px);
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.burgundy};
  white-space: nowrap;
  text-transform: uppercase;
  text-shadow: 0 2px 14px rgba(250, 242, 232, 0.9), 0 0 28px rgba(250, 242, 232, 0.7);
  will-change: opacity;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    top: 120px;
    height: auto;
    gap: 4px;
    flex-direction: column;
    font-size: clamp(22px, 7vw, 32px);
  }
`;

const TitleWord = styled.span``;

const HeartWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 210px;
  z-index: 20;
  perspective: 900px;
  filter: drop-shadow(0 10px 38px rgba(100, 40, 20, 0.25));
  will-change: transform;
  pointer-events: none;
`;

const Flipper = styled.div<{ $flipped: boolean; $reduced: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: ${({ $reduced }) =>
    $reduced ? 'none' : 'transform 0.9s cubic-bezier(0.4, 0.2, 0.2, 1)'};
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const Face = styled.div<{ $back?: boolean }>`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: ${({ $back }) => ($back ? 'rotateY(180deg)' : 'none')};
`;

function FaceContent({ pal, photoUrl }: FaceState) {
  return photoUrl ? <HeartImageSlot pal={pal} src={photoUrl} /> : <HeartFace pal={pal} />;
}

// ─── NEW FLOWER COMPONENTS ────────────────────────────────────────────────────

function Peony({ pal }: { pal: FlowerPalette }) {
  const [p0, p1, p2, p3] = pal.petals ?? [pal.petal, pal.petal, pal.petal, pal.petal];
  const sh = pal.shadow ?? pal.petalDeep ?? pal.petal;
  return (
    <g>
      {/* outer guard petals */}
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={`o${i}`} cx={0} cy={-15} rx={8} ry={12} fill={p0}
          transform={`rotate(${(i / 5) * 360})`} opacity={0.9} />
      ))}
      {/* second ring */}
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse key={`m${i}`} cx={0} cy={-11} rx={6.5} ry={9.5} fill={p1}
          transform={`rotate(${(i / 7) * 360 + 26})`} />
      ))}
      {/* third ring */}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={`t${i}`} cx={0} cy={-7} rx={5} ry={7} fill={p2}
          transform={`rotate(${(i / 8) * 360 + 10})`} />
      ))}
      {/* inner tight petals */}
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={`i${i}`} cx={0} cy={-4} rx={3.5} ry={5} fill={p3 ?? p2}
          transform={`rotate(${(i / 5) * 360 + 18})`} />
      ))}
      <circle r={5} fill={pal.center} opacity={0.88} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={`s${i}`} cx={Math.cos(a) * 3} cy={Math.sin(a) * 3} r={0.9}
          fill={pal.center} opacity={0.7} />;
      })}
    </g>
  );
}

function Rose({ pal }: { pal: FlowerPalette }) {
  const [p0, p1, p2] = pal.petals ?? [pal.petal, pal.petalDeep ?? pal.petal, pal.petal];
  const sh = pal.shadow ?? pal.petalDeep ?? pal.petal;
  return (
    <g>
      <circle r={12} fill={sh} />
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={`o${i}`} cx={0} cy={-10} rx={6} ry={9.5} fill={p0}
          transform={`rotate(${(i / 5) * 360})`} opacity={0.92} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={`m${i}`} cx={0} cy={-7} rx={4.5} ry={7} fill={p1}
          transform={`rotate(${(i / 5) * 360 + 36})`} />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse key={`i${i}`} cx={0} cy={-4} rx={3} ry={5} fill={p2 ?? p1}
          transform={`rotate(${(i / 4) * 360 + 18})`} />
      ))}
      <circle r={3.5} fill={pal.center} />
      <circle r={1.5} cx={-1} cy={-1} fill="rgba(255,255,255,0.35)" />
    </g>
  );
}

function Anemone({ pal }: { pal: FlowerPalette }) {
  const [p0, p1] = pal.petals ?? [pal.petal, pal.petal];
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * 360;
        return (
          <g key={`p${i}`} transform={`rotate(${a})`}>
            <ellipse cx={0} cy={-13} rx={7.5} ry={12}
              fill={i % 2 === 0 ? p0 : p1} opacity={0.88} />
            <line x1={0} y1={-5} x2={0} y2={-19}
              stroke="rgba(255,255,255,0.2)" strokeWidth={0.8} />
          </g>
        );
      })}
      <circle r={6.5} fill={pal.center} />
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return (
          <g key={`st${i}`}>
            <circle cx={Math.cos(a) * 5} cy={Math.sin(a) * 5} r={1}
              fill={pal.centerRing ?? '#8A4060'} opacity={0.9} />
            <circle cx={Math.cos(a) * 5.8} cy={Math.sin(a) * 5.8} r={0.5}
              fill="#F5D090" opacity={0.7} />
          </g>
        );
      })}
      <circle r={2} fill={pal.center} />
    </g>
  );
}

function Bud({ pal }: { pal: FlowerPalette }) {
  const [p0, p1] = pal.petals ?? [pal.petal, pal.petalDeep ?? pal.petal];
  return (
    <g>
      <path d="M 0 8 Q 9 6 5 18 Q 0 13 0 8 Z" fill={LEAF_FILL} stroke={LEAF_SHADOW} strokeWidth={0.5} />
      <path d="M 0 8 Q -9 6 -5 18 Q 0 13 0 8 Z" fill={LEAF_FILL} stroke={LEAF_SHADOW} strokeWidth={0.5} />
      <ellipse cx={0} cy={-2} rx={8} ry={13} fill={p0} stroke={p1} strokeWidth={0.8} />
      <path d="M -5 -9 Q 0 -17 5 -9 Q 0 -8 -5 -9" fill={p1} opacity={0.85} />
      <path d="M -2.5 -10 Q 0 -16 2.5 -10 Q 0 -9.5 -2.5 -10" fill={p0} opacity={0.6} />
      <ellipse cx={-2.5} cy={-5} rx={2.5} ry={5} fill="rgba(255,255,255,0.18)" />
    </g>
  );
}

function Leaf({ pal, variant = 0 }: { pal: FlowerPalette; variant?: number }) {
  const fill = pal.petals?.[0] ?? pal.petal;
  const shad = pal.shadow ?? LEAF_SHADOW;
  if (variant === 0) {
    return (
      <g>
        <path d="M 0 0 C 6 -16 20 -18 26 -6 C 20 8 6 10 0 0 Z"
          fill={fill} stroke={shad} strokeWidth={0.9} />
        <line x1={0} y1={0} x2={26} y2={-6} stroke={LEAF_VEIN} strokeWidth={0.9} opacity={0.7} />
        {[1, 2, 3, 4].map(i => {
          const t = i / 5;
          const bx = 26 * t, by = -6 * t;
          return (
            <g key={i}>
              <path d={`M ${bx} ${by} Q ${bx - 2} ${by - 8} ${bx - 5} ${by - 9}`}
                stroke={LEAF_VEIN} strokeWidth={0.5} fill="none" opacity={0.5} />
              <path d={`M ${bx} ${by} Q ${bx - 2} ${by + 6} ${bx - 5} ${by + 7}`}
                stroke={LEAF_VEIN} strokeWidth={0.5} fill="none" opacity={0.5} />
            </g>
          );
        })}
        <path d="M 2 -2 C 5 -12 14 -14 18 -7"
          stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} fill="none" />
      </g>
    );
  }
  return (
    <g>
      <path d="M 0 0 C 4 -12 16 -16 22 -8 C 22 2 10 8 0 0 Z"
        fill={fill} stroke={shad} strokeWidth={0.8} />
      <line x1={0} y1={0} x2={22} y2={-8} stroke={LEAF_VEIN} strokeWidth={0.8} opacity={0.6} />
      {[1, 2, 3].map(i => {
        const t = i / 4;
        const bx = 22 * t, by = -8 * t;
        return (
          <g key={i}>
            <path d={`M ${bx} ${by} Q ${bx - 2} ${by - 7} ${bx - 4} ${by - 8}`}
              stroke={LEAF_VEIN} strokeWidth={0.5} fill="none" opacity={0.45} />
            <path d={`M ${bx} ${by} Q ${bx - 1} ${by + 5} ${bx - 4} ${by + 6}`}
              stroke={LEAF_VEIN} strokeWidth={0.5} fill="none" opacity={0.45} />
          </g>
        );
      })}
    </g>
  );
}

function FlowerNode({ flower }: { flower: Flower }) {
  const { wx, wy, scale, angle, palette } = flower;
  const deg = (angle * 180) / Math.PI;

  let shape: React.ReactNode;
  switch (palette.kind) {
    case 'peony':
      shape = <Peony pal={palette} />;
      break;
    case 'rose':
      shape = <Rose pal={palette} />;
      break;
    case 'anemone':
      shape = <Anemone pal={palette} />;
      break;
    case 'bud':
      shape = <Bud pal={palette} />;
      break;
    case 'leaf': {
      const variant = Math.abs(Math.round(wx + wy)) % 2;
      shape = <Leaf pal={palette} variant={variant} />;
      break;
    }
    default:
      shape = null;
  }

  return (
    <g
      transform={`translate(${wx} ${wy}) rotate(${deg}) scale(${scale})`}
      style={{ filter: 'drop-shadow(1px 2px 3px rgba(40,20,10,0.18))' }}
    >
      {shape}
    </g>
  );
}

// ─── Main component (unchanged from original) ─────────────────────────────────

export function HeartVineHero() {
  const reducedMotion = usePrefersReducedMotion();

  const stageRef = useRef<SVGSVGElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const stateRef = useRef<HeroState>({
    scrollY: 0,
    targetScrollY: 0,
    flowers: [],
    pathPoints: [],
    cumLen: [],
    totalLen: 0,
    initialized: false,
    lastFlipPhase: -1,
    startTime: typeof performance !== 'undefined' ? performance.now() : 0,
    winW: typeof window !== 'undefined' ? window.innerWidth : 1280,
    winH: typeof window !== 'undefined' ? window.innerHeight : 720,
    orbitRadius: typeof window !== 'undefined' ? orbitRadiusFor(window.innerWidth) : 60,
    docHeight: 0,
  });

  const [flipped, setFlipped] = useState(false);
  const flipRef = useRef(false);
  const [front, setFront] = useState<FaceState>(() => faceForPhase(0));
  const [back, setBack] = useState<FaceState>(() => faceForPhase(1));
  const [scene, setScene] = useState<{
    vineD: string;
    flowers: Flower[];
    docHeight: number;
    winW: number;
  }>({ vineD: '', flowers: [], docHeight: 0, winW: 0 });

  const rebuild = useCallback((vw: number, vh: number) => {
    const measuredDoc =
      typeof document !== 'undefined'
        ? Math.max(
            document.documentElement.scrollHeight,
            document.body ? document.body.scrollHeight : 0,
          )
        : SECTIONS.length * vh;
    const docH = Math.max(measuredDoc, SECTIONS.length * vh);
    const anchors = makePathPoints(docH, vw, vh);
    const pts = sampleSpline(anchors, 50);
    const cum: number[] = [0];
    for (let i = 1; i < pts.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    }
    const totalLen = cum[cum.length - 1];

    // Separate leaf and flower palettes
    const leafPals = FLOWER_PALETTES.filter(p => p.isLeaf);
    const bloomPals = FLOWER_PALETTES.filter(p => !p.isLeaf);

    const flowers: Flower[] = [];
    let d = 28;
    let idx = 0;
    while (d < totalLen - 20) {
      while (idx < cum.length - 1 && cum[idx] < d) idx++;
      const p = pts[Math.max(0, idx - 1)];
      const q = pts[idx];
      const segLen = cum[idx] - cum[Math.max(0, idx - 1)] || 1;
      const t = (d - cum[Math.max(0, idx - 1)]) / segLen;
      const x = p.x + (q.x - p.x) * t;
      const y = p.y + (q.y - p.y) * t;
      const tx = q.x - p.x;
      const ty = q.y - p.y;
      const nLen = Math.hypot(tx, ty) || 1;
      const nx = -ty / nLen;
      const ny = tx / nLen;

      const isLeaf = Math.random() < 0.42;
      const sideSign = flowers.length % 2 === 0 ? 1 : -1;

      let pal: FlowerPalette, side: number, baseScale: number, leafAngle: number;

      if (isLeaf) {
        pal = leafPals[Math.floor(Math.random() * leafPals.length)];
        side = sideSign * (5 + Math.random() * 12);
        baseScale = 0.85 + Math.random() * 0.7;
        leafAngle = Math.atan2(ty, tx) + (sideSign > 0 ? -Math.PI / 2.4 : Math.PI / 2.4)
          + (Math.random() - 0.5) * 0.3;
      } else {
        pal = bloomPals[Math.floor(Math.random() * bloomPals.length)];
        side = sideSign * (16 + Math.random() * 32);
        baseScale = pal.kind === 'peony'   ? 1.1 + Math.random() * 0.6
                  : pal.kind === 'rose'    ? 1.0 + Math.random() * 0.6
                  : pal.kind === 'anemone' ? 1.05 + Math.random() * 0.55
                  : 0.75 + Math.random() * 0.45; // bud
        leafAngle = Math.random() * Math.PI * 2;
      }

      flowers.push({
        wx: x + nx * side + (Math.random() - 0.5) * 5,
        wy: y + ny * side + (Math.random() - 0.5) * 5,
        pathDist: d,
        scale: baseScale,
        angle: leafAngle,
        palette: pal,
        petalCount: 6,
        sway: Math.random() * Math.PI * 2,
        bloomBoost: 1,
      });
      d += 17 + Math.random() * 14;
    }

    const s = stateRef.current;
    s.pathPoints = pts;
    s.cumLen = cum;
    s.totalLen = totalLen;
    s.flowers = flowers;
    s.docHeight = docH;
    s.initialized = true;

    setScene({ vineD: buildVineD(pts), flowers, docHeight: s.docHeight, winW: vw });
  }, []);

  const updateFrame = useCallback(
    (animated: boolean) => {
      const stage = stageRef.current;
      const heart = heartRef.current;
      const s = stateRef.current;
      if (!stage || !heart || !s.initialized) return;

      const sy = s.scrollY;
      const vh = s.winH;

      const maxScroll = Math.max(1, s.docHeight - vh);
      const progress = Math.min(1, Math.max(0, sy / maxScroll));
      const pathProgress = animated ? progress * 0.98 : 0;
      const sectionSize = maxScroll / Math.max(1, SECTIONS.length);

      const hp = pointAlongPath(s.pathPoints, s.cumLen, s.totalLen, pathProgress);

      const orbitAngle = animated ? pathProgress * Math.PI * 8 : 0;
      const orbitFade = Math.min(1, Math.max(0, pathProgress / 0.08));
      const orbitRadius = animated ? s.orbitRadius * orbitFade : 0;
      const nLen = Math.hypot(hp.tx, hp.ty) || 1;
      const nx = -hp.ty / nLen;
      const ny = hp.tx / nLen;
      const offsetMag = Math.cos(orbitAngle) * orbitRadius;
      const heartX = hp.x + nx * offsetMag;
      const heartWorldY = hp.y + ny * offsetMag;
      const heartScreenY = heartWorldY - sy;
      const depth = Math.sin(orbitAngle);
      const restScale = 1 + 0.55 * Math.max(0, 1 - pathProgress / 0.06);
      const scale = restScale * (1 + depth * 0.08);
      const heartZ = depth >= 0 ? 20 : 5;

      heart.style.transform = `translate(${heartX - 110}px, ${heartScreenY - 105}px) scale(${scale})`;
      heart.style.zIndex = String(heartZ);

      const fadeOpacity = String(Math.max(0, 1 - pathProgress / 0.08));
      if (titleRef.current) titleRef.current.style.opacity = fadeOpacity;
      if (collageRef.current) collageRef.current.style.opacity = fadeOpacity;

      stage.style.transform = `translateY(${-sy}px)`;

      if (animated) {
        let phase = 0;
        if (sy >= sectionSize * 2.5) phase = 3;
        else if (sy >= sectionSize * 1.5) phase = 2;
        else if (sy >= sectionSize * 0.5) phase = 1;
        if (phase !== s.lastFlipPhase) {
          s.lastFlipPhase = phase;
          const target = faceForPhase(phase);
          if (flipRef.current) setFront(target);
          else setBack(target);
          flipRef.current = !flipRef.current;
          setFlipped(flipRef.current);
        }
      }
    },
    [],
  );

  const tick = useCallback(() => {
    const s = stateRef.current;
    s.scrollY += (s.targetScrollY - s.scrollY) * 0.12;
    updateFrame(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [updateFrame]);

  useEffect(() => {
    const s = stateRef.current;
    s.winW = window.innerWidth;
    s.winH = window.innerHeight;
    s.orbitRadius = orbitRadiusFor(s.winW);
    rebuild(s.winW, s.winH);

    const onResize = () => {
      const st = stateRef.current;
      st.winW = window.innerWidth;
      st.winH = window.innerHeight;
      st.orbitRadius = orbitRadiusFor(st.winW);
      rebuild(st.winW, st.winH);
      if (reducedMotion) updateFrame(false);
    };
    const onScroll = () => { stateRef.current.targetScrollY = window.scrollY; };

    stateRef.current.targetScrollY = window.scrollY;
    stateRef.current.scrollY = window.scrollY;

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    const remeasure = () => rebuild(stateRef.current.winW, stateRef.current.winH);
    const raf1 = requestAnimationFrame(() => {
      remeasure();
      requestAnimationFrame(remeasure);
    });
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => remeasure())
        : null;
    if (ro && document.body) ro.observe(document.body);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf1);
      if (ro) ro.disconnect();
    };
  }, [rebuild, reducedMotion, updateFrame]);

  useEffect(() => {
    if (reducedMotion) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      updateFrame(false);
      return;
    }

    const start = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stop(); else start();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => { stop(); document.removeEventListener('visibilitychange', onVisibility); };
  }, [reducedMotion, tick, updateFrame]);

  return (
    <>
      <StageWrap aria-hidden="true">
        <Stage
          ref={stageRef}
          viewBox={`0 0 ${Math.max(scene.winW, 1)} ${Math.max(scene.docHeight, 1)}`}
          preserveAspectRatio="xMidYMin slice"
          style={{ height: scene.docHeight }}
        >
          <VineShadow d={scene.vineD} />
          <VineBody d={scene.vineD} />
          <VineHighlight d={scene.vineD} />
          {scene.flowers.map((f, i) => (
            <FlowerNode key={i} flower={f} />
          ))}
        </Stage>
      </StageWrap>
      <HeroCollage ref={collageRef} aria-hidden="true">
        <CollageSlot>
          {heroLeftUrl ? (
            <CollageImg src={heroLeftUrl} alt="" />
          ) : (
            <CollagePlaceholder>Add hero-left.jpg</CollagePlaceholder>
          )}
        </CollageSlot>
        <CollageSlot>
          {heroRightUrl ? (
            <CollageImg src={heroRightUrl} alt="" />
          ) : (
            <CollagePlaceholder>Add hero-right.jpg</CollagePlaceholder>
          )}
        </CollageSlot>
      </HeroCollage>
      <HeroTitle ref={titleRef}>
        <TitleWord>WE&apos;RE</TitleWord>
        <TitleWord>GETTING MARRIED</TitleWord>
      </HeroTitle>
      <HeartWrap ref={heartRef} aria-hidden={HEART_PHOTOS.some(Boolean) ? undefined : true}>
        <Flipper $flipped={flipped} $reduced={reducedMotion}>
          <Face>
            <FaceContent {...front} />
          </Face>
          <Face $back>
            <FaceContent {...back} />
          </Face>
        </Flipper>
      </HeartWrap>
    </>
  );
}
