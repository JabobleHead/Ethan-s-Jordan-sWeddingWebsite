import styled from 'styled-components';
import { BRIDESMAIDS, GROOMSMEN } from '../content';
import type { WeddingPartyMember } from '../content';

type AccentKey = 'sage' | 'berry';

const partyPhotoModules = import.meta.glob('../assets/wedding-party/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function photoFor(slug: string): string | null {
  const match = Object.entries(partyPhotoModules).find(
    ([path]) => path.split('/').pop()?.replace(/\.[^.]+$/, '').toLowerCase() === slug,
  );
  return match ? match[1] : null;
}

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
  margin: 0 0 72px;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 8vw, 140px);
  max-width: clamp(720px, 70vw, 1200px);
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: 1fr;
    gap: 56px;
  }
`;

const ColumnLabel = styled.h2<{ $accent: AccentKey }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme, $accent }) => theme.colors[$accent]};
  margin: 0 0 40px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Member = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PhotoWrap = styled.div`
  width: clamp(180px, 24vw, 260px);
  height: clamp(180px, 24vw, 260px);
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.creamDeep};
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed ${({ theme }) => theme.colors.burgundy};
  border-radius: 50%;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 56px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Name = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(20px, 2.4vw, 24px);
  color: ${({ theme }) => theme.colors.ink};
`;

const Role = styled.div<{ $accent: AccentKey }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme, $accent }) => theme.colors[$accent]};
  margin-top: 6px;
`;

function MemberCard({ member, accent }: { member: WeddingPartyMember; accent: AccentKey }) {
  const url = photoFor(member.slug);
  return (
    <Member>
      <PhotoWrap>
        {url ? (
          <Photo src={url} alt={member.name} />
        ) : (
          <PhotoPlaceholder aria-hidden="true">{member.name[0]}</PhotoPlaceholder>
        )}
      </PhotoWrap>
      <Name>{member.name}</Name>
      <Role $accent={accent}>{member.role}</Role>
    </Member>
  );
}

export default function WeddingParty() {
  return (
    <Main id="main-content">
      <Heading>The Wedding Party</Heading>
      <Subheading>Standing By Our Side</Subheading>
      <Columns>
        <div>
          <ColumnLabel $accent="sage">Groomsmen</ColumnLabel>
          <List>
            {GROOMSMEN.map((member) => (
              <MemberCard key={member.slug} member={member} accent="sage" />
            ))}
          </List>
        </div>
        <div>
          <ColumnLabel $accent="berry">Bridesmaids</ColumnLabel>
          <List>
            {BRIDESMAIDS.map((member) => (
              <MemberCard key={member.slug} member={member} accent="berry" />
            ))}
          </List>
        </div>
      </Columns>
    </Main>
  );
}
