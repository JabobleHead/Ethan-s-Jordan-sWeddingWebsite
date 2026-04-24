export type Point = { x: number; y: number };

export type Tangent = Point & { tx: number; ty: number };

export type FlowerKind = 'rose' | 'peony' | 'anemone' | 'bud' | 'leaf';

export type FlowerPalette = {
  /** Primary petal color (kept for backwards-compat) */
  petal: string;
  /** Ordered petal tones from outermost to innermost */
  petals?: string[];
  /** Darkest shadow / base tone */
  shadow?: string;
  /** Deprecated — use petals[1] */
  petalDeep?: string;
  center: string;
  /** Stamen ring color (anemone only) */
  centerRing?: string;
  isLeaf: boolean;
  kind: FlowerKind;
};

export type HeartPalette = {
  id: string;
  bg1: string;
  bg2: string;
  sil1: string;
  sil2: string;
  border: string;
  glow: string;
};

export type Flower = {
  wx: number;
  wy: number;
  pathDist: number;
  scale: number;
  angle: number;
  palette: FlowerPalette;
  petalCount: number;
  sway: number;
  bloomBoost: number;
};

export type SectionCopy = {
  label: string;
  title: string;
  body: string;
  accent: 'coral' | 'berry' | 'sage';
  bg: 'cream' | 'creamDeep';
  textSide: 'left' | 'right';
};
