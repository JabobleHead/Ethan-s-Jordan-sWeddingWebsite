import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COUPLE } from '../content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { KeyDetails } from './KeyDetails';
import { RsvpButton } from './RsvpButton';

function firstUrl(mods: Record<string, string>): string | null {
  return Object.values(mods)[0] ?? null;
}

const HERO_PHOTOS: string[] = [
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
].filter((url): url is string => Boolean(url));

const SLIDE_INTERVAL_MS = 5000;

const HeroWrap = styled.section`
  position: relative;
`;

const SlideStage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: clamp(360px, 62vh, 720px);
  background: ${({ theme }) => theme.colors.creamDeep};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    height: clamp(280px, 50vh, 420px);
  }
`;

const Slide = styled.img<{ $active: boolean; $reduced: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: ${({ $reduced }) => ($reduced ? 'none' : 'opacity 1.2s ease')};
`;

const HeroHeading = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(36px, 6vw, 72px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.cream};
  text-shadow: 0 2px 14px rgba(40, 20, 12, 0.55), 0 0 28px rgba(40, 20, 12, 0.35);
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: clamp(26px, 8vw, 40px);
  }
`;

const HeroDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 24px 60px;
`;

export function HeroSlideshow() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || HERO_PHOTOS.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <HeroWrap>
      <SlideStage>
        {HERO_PHOTOS.map((url, i) => (
          <Slide key={url} src={url} alt="" $active={i === index} $reduced={reducedMotion} />
        ))}
        <HeroHeading>
          {COUPLE.name1} &amp; {COUPLE.name2}
        </HeroHeading>
      </SlideStage>
      <HeroDetails>
        <KeyDetails />
        <RsvpButton variant="primary">RSVP</RsvpButton>
      </HeroDetails>
    </HeroWrap>
  );
}
