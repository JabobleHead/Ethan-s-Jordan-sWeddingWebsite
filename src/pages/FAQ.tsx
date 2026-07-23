import styled from 'styled-components';
import { FAQ, HOTELS } from '../content';

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

const List = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: clamp(640px, 55vw, 860px);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Item = styled.li<{ $accent: AccentKey }>`
  padding-left: 20px;
  border-left: 2px solid ${({ theme, $accent }) => theme.colors[$accent]};
`;

const Question = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(20px, 2.4vw, 25px);
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 8px;
`;

const Answer = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  font-weight: 300;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const StayHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(24px, 3vw, 32px);
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  margin: 96px 0 12px;
`;

const StaySubheading = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 300;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  max-width: 520px;
  margin: 0 auto 40px;
`;

const HotelList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: clamp(480px, 45vw, 760px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const HotelCard = styled.li`
  text-align: center;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.creamDeep};
  border-radius: 2px;
`;

const HotelName = styled.a`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(18px, 2.2vw, 22px);
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.burgundy};
    border-bottom-color: ${({ theme }) => theme.colors.burgundy};
  }
`;

const HotelAddress = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
  margin: 6px 0 0;
`;

export default function FAQPage() {
  return (
    <Main id="main-content">
      <Heading>Questions &amp; Answers</Heading>
      <Subheading>Everything You Need to Know</Subheading>
      <List>
        {FAQ.map((item, i) => (
          <Item key={item.question} $accent={ACCENTS[i % ACCENTS.length]}>
            <Question>{item.question}</Question>
            <Answer>{item.answer}</Answer>
          </Item>
        ))}
      </List>

      <StayHeading>Where to Stay</StayHeading>
      <StaySubheading>
        We&apos;ve found a couple of great, nearby options for out-of-town guests.
      </StaySubheading>
      <HotelList>
        {HOTELS.map((hotel) => (
          <HotelCard key={hotel.name}>
            <HotelName href={hotel.mapUrl} target="_blank" rel="noopener noreferrer">
              {hotel.name}
            </HotelName>
            <HotelAddress>{hotel.address}</HotelAddress>
          </HotelCard>
        ))}
      </HotelList>
    </Main>
  );
}
