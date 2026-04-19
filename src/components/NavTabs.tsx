import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NAV_ITEMS } from '../content';
import { MobileDrawer } from './MobileDrawer';

const DesktopNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 36px;
  padding: 8px 0 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile - 1}px) {
    display: none;
  }
`;

const Tab = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink};
  opacity: 0.8;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: opacity 0.2s ease, border-color 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &.active {
    opacity: 1;
    border-bottom-color: ${({ theme }) => theme.colors.burgundy};
  }
`;

const HamburgerWrap = styled.div`
  display: none;
  justify-content: center;
  padding: 4px 0 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile - 1}px) {
    display: flex;
  }
`;

const HamburgerButton = styled.button`
  width: 44px;
  height: 44px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Line = styled.span`
  display: block;
  width: 24px;
  height: 1px;
  background: ${({ theme }) => theme.colors.burgundy};
`;

const DRAWER_ID = 'mobile-nav';

export function NavTabs() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <DesktopNav aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <Tab key={item.to} to={item.to} end={item.end}>
            {item.label}
          </Tab>
        ))}
      </DesktopNav>

      <HamburgerWrap>
        <HamburgerButton
          ref={triggerRef}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={DRAWER_ID}
          onClick={() => setOpen((v) => !v)}
        >
          <Line />
          <Line />
          <Line />
        </HamburgerButton>
      </HamburgerWrap>

      <MobileDrawer
        id={DRAWER_ID}
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}
