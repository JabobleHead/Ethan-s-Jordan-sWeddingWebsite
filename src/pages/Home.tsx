import styled from 'styled-components';
import { HeroSlideshow } from '../components/HeroSlideshow';

const Main = styled.main`
  position: relative;
  overflow-x: hidden;
`;

export default function Home() {
  return (
    <Main id="main-content">
      <HeroSlideshow />

    </Main>
  );
}
