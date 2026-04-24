import styled from 'styled-components';
import { COUPLE } from '../content';
import { NavTabs } from './NavTabs';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.z.header};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cream};
  box-shadow: 0 1px 0 rgba(58, 42, 32, 0.06);
`;

const Inner = styled.div`
  padding: 28px 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NamesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 32px);
`;

const Names = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(36px, 4.5vw, 48px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  line-height: 1.1;
`;

const Ampersand = styled.span`
  font-style: italic;
  font-weight: 400;
  margin: 0 0.35em;
  color: ${({ theme }) => theme.colors.burgundy};
`;

const FlowerSvg = styled.svg<{ $flip?: boolean }>`
  width: clamp(44px, 5vw, 64px);
  height: clamp(44px, 5vw, 64px);
  flex-shrink: 0;
  transform: ${({ $flip }) => ($flip ? 'scaleX(-1)' : 'none')};
  filter: drop-shadow(1px 2px 3px rgba(40, 20, 10, 0.18));
`;

function HeaderRose({ flip = false }: { flip?: boolean }) {
  const petal = '#8B1E3F';
  const deep = '#5A1028';
  const center = '#F5D090';
  const leaf = '#3F6B2E';
  const leafShadow = '#254A1C';
  const outer = [];
  const inner = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * 360;
    outer.push(
      <ellipse key={`o${i}`} cx={0} cy={-8} rx={6} ry={8} fill={petal} transform={`rotate(${a})`} />,
    );
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 360 + 25;
    inner.push(
      <ellipse key={`i${i}`} cx={0} cy={-5} rx={4} ry={5.5} fill={deep} transform={`rotate(${a})`} />,
    );
  }
  return (
    <FlowerSvg $flip={flip} viewBox="-30 -30 60 60" aria-hidden="true">
      <g transform="translate(-14 10) rotate(-30) scale(0.85)">
        <path
          d="M 0 0 C 8 -12 18 -8 22 0 C 18 8 8 12 0 0 Z"
          fill={leaf}
          stroke={leafShadow}
          strokeWidth={0.9}
        />
      </g>
      <g transform="translate(12 10) rotate(40) scale(0.7)">
        <path
          d="M 0 0 C 8 -12 18 -8 22 0 C 18 8 8 12 0 0 Z"
          fill={leaf}
          stroke={leafShadow}
          strokeWidth={0.9}
        />
      </g>
      <g>
        <circle r={14} fill={deep} />
        {outer}
        {inner}
        <circle r={2.5} fill={center} />
      </g>
    </FlowerSvg>
  );
}

export function SiteHeader() {
  return (
    <Header>
      <Inner>
        <NamesRow>
          <HeaderRose />
          <Names>
            {COUPLE.name1}
            <Ampersand aria-hidden="true">&amp;</Ampersand>
            {COUPLE.name2}
          </Names>
          <HeaderRose flip />
        </NamesRow>
        <NavTabs />
      </Inner>
    </Header>
  );
}
