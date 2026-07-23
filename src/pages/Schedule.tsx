import styled from 'styled-components';
import { SCHEDULE } from '../content';

type AccentKey = 'coral' | 'berry' | 'sage' | 'apricot' | 'palePink' | 'burgundy';

const ACCENTS: AccentKey[] = ['coral', 'berry', 'sage', 'apricot', 'palePink', 'burgundy'];

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
  margin: 0 0 72px;
`;

const Timeline = styled.ol`
  position: relative;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: clamp(620px, 60vw, 900px);

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 10px;
    bottom: 10px;
    width: 1px;
    background: rgba(125, 32, 53, 0.15);
  }
`;

const Item = styled.li`
  position: relative;
  padding-left: 40px;
  padding-bottom: 48px;

  &:last-child {
    padding-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding-left: 32px;
    padding-bottom: 36px;
  }
`;

const Dot = styled.span<{ $accent: AccentKey }>`
  position: absolute;
  left: 0;
  top: 5px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${({ theme, $accent }) => theme.colors[$accent]};
  box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.cream};
`;

const Time = styled.div<{ $accent: AccentKey; $confirmed: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 6px;
  color: ${({ theme, $confirmed, $accent }) => ($confirmed ? theme.colors[$accent] : theme.colors.muted)};
  font-style: ${({ $confirmed }) => ($confirmed ? 'normal' : 'italic')};
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(22px, 3vw, 28px);
  color: ${({ theme }) => theme.colors.ink};
`;

const Detail = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.muted};
  margin: 6px 0 0;
`;

export default function Schedule() {
  return (
    <Main id="main-content">
      <Heading>The Schedule</Heading>
      <Subheading>Saturday, July 17, 2027</Subheading>
      <Timeline>
        {SCHEDULE.map((item, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Item key={item.label}>
              <Dot $accent={accent} />
              <Time $accent={accent} $confirmed={item.confirmed}>
                {item.time}
              </Time>
              <Label>{item.label}</Label>
              {item.detail && <Detail>{item.detail}</Detail>}
            </Item>
          );
        })}
      </Timeline>
    </Main>
  );
}
