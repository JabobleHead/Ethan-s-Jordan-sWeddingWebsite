import styled from 'styled-components';

const Link = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-120%);
  margin: 8px;
  padding: 10px 18px;
  background: ${({ theme }) => theme.colors.burgundy};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 2px;
  z-index: ${({ theme }) => theme.z.modal + 10};
  transition: transform 0.2s ease;

  &:focus,
  &:focus-visible {
    transform: translateY(0);
  }
`;

export function SkipToContent() {
  return <Link href="#main-content">Skip to content</Link>;
}
