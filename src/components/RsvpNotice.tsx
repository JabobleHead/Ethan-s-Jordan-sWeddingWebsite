import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useFocusTrap } from '../hooks/useFocusTrap';

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(58, 42, 32, 0.45);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ${({ theme }) => theme.easing.slow};
`;

const Panel = styled.div<{ $open: boolean }>`
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 56px 36px 40px;
  background: ${({ theme }) => theme.colors.cream};
  border-top: 2px solid ${({ theme }) => theme.colors.burgundy};
  border-radius: 2px;
  box-shadow: 0 24px 60px rgba(58, 42, 32, 0.25);
  text-align: center;
  transform: translateY(${({ $open }) => ($open ? '0' : '12px')});
  transition: transform 0.35s ${({ theme }) => theme.easing.slow};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: 52px 24px 32px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 28px;
  line-height: 1;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.coral};
  margin: 0 0 12px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(30px, 5vw, 40px);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 16px;
`;

const Body = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  font-weight: 300;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const OkButton = styled.button`
  margin-top: 32px;
  padding: 14px 32px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.burgundy};
  border: 1px solid ${({ theme }) => theme.colors.burgundy};
  border-radius: 2px;
  transition: background-color 0.25s ease, color 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.burgundy};
    color: ${({ theme }) => theme.colors.cream};
  }
`;

export function RsvpNotice({ open, onClose, triggerRef }: Props) {
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

  return createPortal(
    <Backdrop
      $open={open}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Panel
        ref={containerRef}
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-notice-title"
      >
        <CloseButton type="button" onClick={onClose} aria-label="Close" tabIndex={open ? 0 : -1}>
          ×
        </CloseButton>
        <Label>RSVP</Label>
        <Title id="rsvp-notice-title">Coming Soon</Title>
        <Body>
          RSVPs will open at a later date, closer to the wedding. We&apos;ll send out a reminder as soon
          as they&apos;re available — we can&apos;t wait to celebrate with you!
        </Body>
        <OkButton type="button" onClick={onClose} tabIndex={open ? 0 : -1}>
          Sounds Good
        </OkButton>
      </Panel>
    </Backdrop>,
    document.body,
  );
}
