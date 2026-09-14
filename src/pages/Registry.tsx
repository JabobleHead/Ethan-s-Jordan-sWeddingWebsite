import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { HONEYMOON_FUND } from '../content';
import type { HoneymoonFundMethod } from '../content';

type AccentKey = 'coral' | 'berry' | 'sage' | 'apricot' | 'palePink' | 'burgundy';

const ACCENTS: AccentKey[] = ['coral', 'berry', 'sage', 'apricot', 'palePink', 'burgundy'];

const Main = styled.main`
  min-height: 100vh;
  padding: 64px 8% 120px;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(36px, 5vw, 56px);
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  margin: 0 0 12px;
`;

const Subheading = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 40px;
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  font-weight: 300;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
`;

const Ornament = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 56px 0;
  color: ${({ theme }) => theme.colors.coral};

  &::before,
  &::after {
    content: '';
    width: 64px;
    height: 1px;
    background: rgba(125, 32, 53, 0.2);
  }

  svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.burgundy};
  margin: 0 0 32px;
`;

const Grid = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 760px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Card = styled.li<{ $accent: AccentKey }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px 28px;
  background: ${({ theme }) => theme.colors.creamDeep};
  border-top: 2px solid ${({ theme, $accent }) => theme.colors[$accent]};
  border-radius: 2px;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(22px, 2.6vw, 28px);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`;

const Handle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.ink};
  margin: 10px 0 0;
`;

const HandleNote = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 2px 0 0;
`;

const CardBody = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 300px;
  margin: 10px 0 0;
`;

const Action = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const actionStyles = css`
  display: inline-block;
  min-width: 132px;
  padding: 10px 22px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.15em;
  line-height: 1.4;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.burgundy};
  border: 1px solid ${({ theme }) => theme.colors.burgundy};
  border-radius: 2px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.burgundy};
    color: ${({ theme }) => theme.colors.cream};
  }
`;

const ActionLink = styled.a`
  ${actionStyles}
`;

const ActionButton = styled.button`
  ${actionStyles}
`;

const ContactList = styled.ul`
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.ink};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.burgundy};
  }
`;

const ContactName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 19px;
`;

const Closing = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(22px, 3vw, 28px);
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  margin: 72px 0 0;
`;

function HeartOrnament() {
  return (
    <Ornament aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </Ornament>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = () => {
    navigator.clipboard?.writeText(value).then(
      () => setCopied(true),
      () => {},
    );
  };

  return (
    <ActionButton type="button" onClick={copy}>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </ActionButton>
  );
}

function MethodCard({ method, accent }: { method: HoneymoonFundMethod; accent: AccentKey }) {
  return (
    <Card $accent={accent}>
      <CardTitle>{method.name}</CardTitle>
      <Handle>{method.handle}</Handle>
      {method.note && <HandleNote>{method.note}</HandleNote>}
      <Action>
        {method.url ? (
          <ActionLink href={method.url} target="_blank" rel="noopener noreferrer">
            Open {method.name}
          </ActionLink>
        ) : (
          <CopyButton value={method.handle} />
        )}
      </Action>
    </Card>
  );
}

export default function Registry() {
  const methods = HONEYMOON_FUND.methods.filter((method) => method.handle);

  return (
    <Main id="main-content">
      <Heading>Honeymoon Fund</Heading>
      <Subheading>Your Presence Is Our Present</Subheading>
      <Intro>
        Celebrating with all of you is the greatest gift we could ask for. If you&apos;d like to give
        something more, a contribution toward our honeymoon would mean the world to us as we set off on
        our first adventure as newlyweds.
      </Intro>

      <HeartOrnament />

      <SectionLabel>Ways to Give</SectionLabel>
      <Grid>
        {methods.map((method, i) => (
          <MethodCard key={method.name} method={method} accent={ACCENTS[i % ACCENTS.length]} />
        ))}
      </Grid>

      <HeartOrnament />

      <Grid>
        <Card $accent="palePink">
          <CardTitle>Can&apos;t Make It?</CardTitle>
          <CardBody>
            We&apos;ll miss you! If you&apos;d still like to send a gift, message Jordan or Ethan directly.
          </CardBody>
          <ContactList>
            {HONEYMOON_FUND.contacts.map((contact) => (
              <li key={contact.name}>
                <ContactLink href={`sms:${contact.phone.replace(/\D/g, '')}`}>
                  <ContactName>{contact.name}</ContactName>
                  {contact.phone}
                </ContactLink>
              </li>
            ))}
          </ContactList>
        </Card>
        <Card $accent="burgundy">
          <CardTitle>On the Day</CardTitle>
          <CardBody>
            A cash box will be set out at the reception for anyone who would prefer to give in person.
          </CardBody>
        </Card>
      </Grid>

      <Closing>Thank you for your love &amp; generosity.</Closing>
    </Main>
  );
}
