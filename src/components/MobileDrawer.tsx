import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { NAV_ITEMS } from '../content';
import { useFocusTrap } from '../hooks/useFocusTrap';

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  id: string;
};

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.cream};
  z-index: ${({ theme }) => theme.z.drawer};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ${({ theme }) => theme.easing.slow};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 28px;
  line-height: 1;
`;

const List = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const Link = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.ink};
  opacity: 0.8;
  padding: 6px 2px;

  &.active {
    opacity: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.burgundy};
  }
`;

export function MobileDrawer({ open, onClose, triggerRef, id }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <Backdrop
      id={id}
      ref={containerRef}
      $open={open}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <CloseButton
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      >
        ×
      </CloseButton>
      <List aria-label="Primary (mobile)">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            {item.label}
          </Link>
        ))}
      </List>
    </Backdrop>
  );
}
