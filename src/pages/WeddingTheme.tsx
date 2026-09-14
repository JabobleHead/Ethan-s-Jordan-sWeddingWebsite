import styled from 'styled-components';

type AccentKey = 'coral' | 'berry' | 'sage' | 'apricot' | 'palePink' | 'burgundy';

type Swatch = { name: string; color: string };

type ColorNote = {
  title: string;
  body: string;
  swatches: string[];
  accent: AccentKey;
};

const inspirationModules = import.meta.glob('../assets/theme/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const INSPIRATION_PHOTOS = Object.entries(inspirationModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const COLORS_TO_AVOID: ColorNote[] = [
  {
    title: 'Maroon',
    body: 'Our bridesmaids will be in maroon, so we kindly ask guests to avoid that color so they stand out.',
    swatches: ['#7D2035'],
    accent: 'burgundy',
  },
  {
    title: 'White & Ivory',
    body: "Let's leave white and ivory to the bride.",
    swatches: ['#FFFFFF', '#F6EFDD'],
    accent: 'palePink',
  },
];

const FAIR_GAME: Swatch[] = [
  { name: 'Blush', color: '#F0B8C0' },
  { name: 'Apricot', color: '#F2C2A0' },
  { name: 'Butter', color: '#F3E3A1' },
  { name: 'Sage', color: '#B5C9A6' },
  { name: 'Sky', color: '#BBD4E8' },
  { name: 'Lavender', color: '#CDBDE3' },
];

const Main = styled.main`
  min-height: 100vh;
  padding: 64px 8% 120px;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(36px, 5vw, 56px);
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  margin: 0 0 12px;
`;

const Subheading = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 40px;
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 16px;
  font-weight: 300;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  max-width: 580px;
  margin: 0 auto;

  strong {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.burgundy};
  margin: 88px 0 32px;
`;

const NoteGrid = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 760px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const NoteCard = styled.li<{ $accent: AccentKey }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.creamDeep};
  border-top: 2px solid ${({ theme, $accent }) => theme.colors[$accent]};
  border-radius: 2px;
`;

const NoteLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 16px 0 4px;
`;

const NoteTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(22px, 2.6vw, 28px);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`;

const NoteBody = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 300px;
  margin: 10px 0 0;
`;

const SwatchRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const AvoidSwatch = styled.span<{ $color: string }>`
  position: relative;
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: inset 0 0 0 1px rgba(58, 42, 32, 0.15);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -10%;
    width: 120%;
    height: 1.5px;
    background: ${({ theme }) => theme.colors.ink};
    transform: rotate(-45deg);
  }
`;

const FairGame = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(24px, 3.2vw, 32px);
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  margin: 56px 0 24px;
`;

const Palette = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px 32px;
  }
`;

const PaletteItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const PaletteDot = styled.span<{ $color: string }>`
  display: block;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: inset 0 0 0 1px rgba(58, 42, 32, 0.08);
`;

const Collage = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 1080px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 640px;
    gap: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: 1fr;
    max-width: 440px;
    gap: 24px;
  }
`;

const CollageItem = styled.li`
  position: relative;
  transition: transform 0.4s ${({ theme }) => theme.easing.slow};

  &:nth-child(odd) {
    transform: rotate(-1.5deg);
  }

  &:nth-child(even) {
    transform: rotate(1.5deg);
  }

  &:hover {
    z-index: 1;
    transform: rotate(0deg) scale(1.02);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    &:nth-child(odd),
    &:nth-child(even) {
      transform: none;
    }
  }
`;

const Frame = styled.a`
  display: block;
  padding: 10px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 12px 32px rgba(58, 42, 32, 0.12);
`;

const Photo = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const CollageHint = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin: 28px 0 0;
`;

export default function WeddingTheme() {
  return (
    <Main id="main-content">
      <Heading>Our Theme</Heading>
      <Subheading>A Garden Party</Subheading>
      <Intro>
        We&apos;re going for a <strong>garden party</strong> vibe. Think light fabrics, florals, and
        pastels. Dress to feel comfortable outside for an afternoon and evening celebration.
      </Intro>

      <SectionLabel>A Couple of Notes</SectionLabel>
      <NoteGrid>
        {COLORS_TO_AVOID.map((note) => (
          <NoteCard key={note.title} $accent={note.accent}>
            <SwatchRow aria-hidden="true">
              {note.swatches.map((color) => (
                <AvoidSwatch key={color} $color={color} />
              ))}
            </SwatchRow>
            <NoteLabel>Please Avoid</NoteLabel>
            <NoteTitle>{note.title}</NoteTitle>
            <NoteBody>{note.body}</NoteBody>
          </NoteCard>
        ))}
      </NoteGrid>

      <FairGame>Everything else is fair game!</FairGame>
      <Palette aria-label="Color inspiration">
        {FAIR_GAME.map((swatch) => (
          <PaletteItem key={swatch.name}>
            <PaletteDot $color={swatch.color} />
            {swatch.name}
          </PaletteItem>
        ))}
      </Palette>

      {INSPIRATION_PHOTOS.length > 0 && (
        <>
          <SectionLabel>Outfit Inspiration</SectionLabel>
          <Collage>
            {INSPIRATION_PHOTOS.map((url, i) => (
              <CollageItem key={url}>
                <Frame href={url} target="_blank" rel="noopener noreferrer">
                  <Photo src={url} alt={`Guest outfit inspiration board ${i + 1}`} loading="lazy" />
                </Frame>
              </CollageItem>
            ))}
          </Collage>
          <CollageHint>Tap any image to see it full size.</CollageHint>
        </>
      )}
    </Main>
  );
}
