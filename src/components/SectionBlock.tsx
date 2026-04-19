import styled from 'styled-components';
import type { ReactNode } from 'react';
import type { SectionCopy } from '../types';

type Props = {
  section: SectionCopy;
  isFirst?: boolean;
  isLast?: boolean;
  children?: ReactNode;
};

const Section = styled.section<{ $bg: SectionCopy['bg']; $side: SectionCopy['textSide']; $first: boolean }>`
  position: relative;
  min-height: 100vh;
  background: ${({ theme, $bg }) => theme.colors[$bg]};
  display: flex;
  align-items: ${({ $first }) => ($first ? 'flex-start' : 'center')};
  justify-content: ${({ $side }) => ($side === 'right' ? 'flex-end' : 'flex-start')};
  padding: ${({ $first }) => ($first ? 'calc(200px + clamp(320px, 52vh, 560px) + 60px) 8% 80px' : '80px 8%')};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    align-items: center;
    justify-content: center;
    padding: ${({ $first }) => ($first ? '160px 6% 60px' : '60px 6%')};
  }
`;

const Column = styled.div`
  position: relative;
  z-index: 1;
  max-width: 420px;
`;

const Label = styled.div<{ $accent: SectionCopy['accent'] }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme, $accent }) => theme.colors[$accent]};
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 300;
  font-style: italic;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.12;
  margin: 0 0 20px;
  white-space: pre-line;
`;

const Body = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  line-height: 1.85;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const Hint = styled.div<{ $accent: SectionCopy['accent'] }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 36px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme, $accent }) => theme.colors[$accent]};

  span {
    display: block;
    width: 28px;
    height: 1px;
    background: ${({ theme, $accent }) => theme.colors[$accent]};
  }
`;

export function SectionBlock({ section, isFirst = false, isLast = false, children }: Props) {
  return (
    <Section $bg={section.bg} $side={section.textSide} $first={isFirst}>
      <Column>
        <Label $accent={section.accent}>{section.label}</Label>
        <Title>{section.title}</Title>
        <Body>{section.body}</Body>
        {children}
        {!isLast && (
          <Hint $accent={section.accent}>
            <span />
            scroll to continue
          </Hint>
        )}
      </Column>
    </Section>
  );
}
