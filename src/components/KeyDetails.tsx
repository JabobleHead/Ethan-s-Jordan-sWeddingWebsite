import styled from 'styled-components';
import { WEDDING } from '../content';

const Wrap = styled.div`
  margin: 28px 0 32px;
`;

const DateLine = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 300;
  font-style: italic;
  font-size: clamp(28px, 3.5vw, 40px);
  color: ${({ theme }) => theme.colors.ink};
  letter-spacing: 0.04em;
  line-height: 1.1;
  margin: 0 0 10px;
`;

const VenueLine = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 300;
  font-style: italic;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

export function KeyDetails() {
  const venueLine = WEDDING.city ? `${WEDDING.venue} · ${WEDDING.city}` : WEDDING.venue;
  return (
    <Wrap>
      <DateLine>{WEDDING.dateDisplay}</DateLine>
      <VenueLine>{venueLine}</VenueLine>
    </Wrap>
  );
}
