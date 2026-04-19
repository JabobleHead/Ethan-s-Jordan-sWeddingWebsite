import type { HeartPalette } from '../types';

export const HEART_PATH =
  'M110 188 C110 188 12 118 12 58 C12 28 36 8 64 8 C82 8 97 19 110 35 C123 19 138 8 156 8 C184 8 208 28 208 58 C208 118 110 188 110 188 Z';

type Props = { pal: HeartPalette };

export function HeartFace({ pal }: Props) {
  const clipId = `hc-${pal.id}`;
  const gradId = `hg-${pal.id}`;
  return (
    <svg
      viewBox="0 0 220 210"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={HEART_PATH} />
        </clipPath>
        <radialGradient id={gradId} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={pal.bg1} />
          <stop offset="100%" stopColor={pal.bg2} />
        </radialGradient>
      </defs>
      <path d={HEART_PATH} fill={`url(#${gradId})`} />
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="220" height="210" fill={pal.bg2} />
        <ellipse cx="84" cy="88" rx="22" ry="28" fill={pal.sil1} opacity="0.75" />
        <path
          d="M62 115 Q62 90 84 90 Q106 90 106 115 L106 178 Q84 185 62 178 Z"
          fill={pal.sil1}
          opacity="0.75"
        />
        <ellipse cx="138" cy="86" rx="20" ry="26" fill={pal.sil2} opacity="0.78" />
        <path
          d="M118 112 Q118 88 138 88 Q158 88 158 112 L158 178 Q138 182 118 178 Z"
          fill={pal.sil2}
          opacity="0.78"
        />
        <ellipse cx="111" cy="105" rx="80" ry="88" fill={pal.glow} opacity="0.22" />
      </g>
      <path d={HEART_PATH} fill="none" stroke={pal.border} strokeWidth="3" />
    </svg>
  );
}
