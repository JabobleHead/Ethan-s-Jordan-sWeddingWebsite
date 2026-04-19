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

export function SiteHeader() {
  return (
    <Header>
      <Inner>
        <Names>
          {COUPLE.name1}
          <Ampersand aria-hidden="true">&amp;</Ampersand>
          {COUPLE.name2}
        </Names>
        <NavTabs />
      </Inner>
    </Header>
  );
}
