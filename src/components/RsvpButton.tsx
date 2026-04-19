import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';
import { LINKS } from '../content';

type Variant = 'primary' | 'secondary';
type Props = { variant: Variant; children?: ReactNode };

const base = css`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 16px 36px;
  border-radius: 2px;
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
`;

const Primary = styled.a`
  ${base};
  background: ${({ theme }) => theme.colors.burgundy};
  color: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.burgundy};

  &:hover {
    background: ${({ theme }) => theme.colors.berry};
    border-color: ${({ theme }) => theme.colors.berry};
  }
`;

const Secondary = styled.a`
  ${base};
  background: transparent;
  color: ${({ theme }) => theme.colors.burgundy};
  border: 1px solid ${({ theme }) => theme.colors.burgundy};

  &:hover {
    background: ${({ theme }) => theme.colors.burgundy};
    color: ${({ theme }) => theme.colors.cream};
  }
`;

export function RsvpButton({ variant, children = 'RSVP' }: Props) {
  const Tag = variant === 'primary' ? Primary : Secondary;
  return (
    <Tag href={LINKS.rsvp} target="_blank" rel="noopener noreferrer">
      {children}
    </Tag>
  );
}
