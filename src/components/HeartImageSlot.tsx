import styled from 'styled-components';
import type { HeartPalette } from '../types';
import { HEART_PATH } from './HeartFace';

const Figure = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const ClippedImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  clip-path: path('${HEART_PATH}');
`;

const Overlay = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
`;

const PlaceholderCaption = styled.figcaption`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  pointer-events: none;
`;

type Props = { pal: HeartPalette; src: string | null };

export function HeartImageSlot({ pal, src }: Props) {
  if (src) {
    return (
      <Figure>
        <ClippedImg src={src} alt="Ethan and Jordan" />
        <Overlay viewBox="0 0 220 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d={HEART_PATH} fill="none" stroke={pal.border} strokeWidth="3" />
        </Overlay>
      </Figure>
    );
  }
  return (
    <Figure>
      <Overlay viewBox="0 0 220 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d={HEART_PATH}
          fill="none"
          stroke="#7D2035"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </Overlay>
      <PlaceholderCaption>Add your photo</PlaceholderCaption>
    </Figure>
  );
}
