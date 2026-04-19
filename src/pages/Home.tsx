import styled from 'styled-components';
import { SECTIONS } from '../content';
import { ContactBlock } from '../components/ContactBlock';
import { HeartVineHero } from '../components/HeartVineHero';
import { KeyDetails } from '../components/KeyDetails';
import { RsvpButton } from '../components/RsvpButton';
import { SectionBlock } from '../components/SectionBlock';

const Main = styled.main`
  position: relative;
  overflow-x: hidden;
`;

export default function Home() {
  return (
    <Main id="main-content">
      <HeartVineHero />
      <SectionBlock section={SECTIONS[0]} isFirst>
        <KeyDetails />
        <RsvpButton variant="primary">RSVP</RsvpButton>
      </SectionBlock>
      <SectionBlock section={SECTIONS[1]} />
      <SectionBlock section={SECTIONS[2]} isLast>
        <ContactBlock />
        <RsvpButton variant="secondary">RSVP</RsvpButton>
      </SectionBlock>
    </Main>
  );
}
