import styled from 'styled-components';
import { CONTACT } from '../content';

const Wrap = styled.div`
  margin: 20px 0 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Line = styled.a`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.burgundy};
  }
`;

export function ContactBlock() {
  return (
    <Wrap>
      <Line href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Line>
      {CONTACT.phone && <Line href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</Line>}
    </Wrap>
  );
}
