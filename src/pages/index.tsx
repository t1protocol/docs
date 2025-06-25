import './styles.module.css'

import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styled from '@emotion/styled'
import Discord from '@site/static/img/discord.svg'
import GitHub from '@site/static/img/github.svg'
import X from '@site/static/img/x.svg'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import { TraceEvent } from '@uniswap/analytics'
import {
  BrowserEvent,
  DocsHomepageElementName as ElementName,
  DocsSectionName as SectionName,
  SharedEventName,
} from '@uniswap/analytics-events'
import React from 'react'
import { ArrowUpRight as LinkIcon, BookOpen, Info, Link as Chain } from 'react-feather'

export const actions = [
  {
    title: 'Learn More',
    icon: Info,
    to: '/concepts/protocol/rtp',
    text: `Get familiar with the core concepts of the t1 Protocol.`,
  },
  {
    title: 't1 Testnet Portal',
    icon: Chain,
    to: 'https://testnet.t1protocol.com/',
    text: `Experience real time cross-chain interactions with t1.`,
  },
  {
    title: 't1 Smart Contracts',
    icon: BookOpen,
    to: 'https://github.com/t1protocol/t1/tree/canary/contracts',
    text: `Learn about the architecture of t1 smart contracts.`,
  },
]

export const developerLinks = [
  {
    title: 't1 Monorepo',
    href: 'https://github.com/t1protocol/t1',
    icon: GitHub,
  },
]

export const dAppGuides = [
  {
    title: 't1 RTP Intent Bridge',
    text: 'Deposit funds to start interacting with apps on t1 testnet.',
    to: 'https://testnet.t1protocol.com/bridge/?bridgeType=INTENT',
  },
  {
    title: 'More products coming soon',
    text: 'Stay tuned for additional dApps built on t1.',
    to: '#',
    disabled: true,
  },
]
export const smartContractGuides = [
  {
    title: 'ERC 7683 Cross Chain Intents',
    text: 'Read data from other chains and prove the results back to your contract.',
    to: '/integration/7683/xChainRead',
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 4.5rem;


  @media (max-width: 960px) {
    flex-direction: column;
    gap: 16px;
    margin: 0 2rem;
  }

  @media (max-width: 640px) {
    margin: 0 1rem;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  /* Tablet (2 columns) */
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 16px;
  }
  @media (max-width: 640px) {
    padding: 1rem;
  }
`

const RowCentered = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  width: 100%;

  /* Tablet (2 columns) */
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 16px;
  }
  @media (max-width: 640px) {
    padding: 1rem;
  }
`

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 330px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);
  /* flex: 1 1 0px; */

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`

const CenterCard = styled(Card)`
  min-width: 250px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0px;
  }
`

/* Card adjustments for Flexbox */
const ShadowCard = styled(Card)`
  flex: 1 1 200px; /* Grow, shrink, min-width */
  box-sizing: border-box;
  background: #ffffff10;

`

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 0.5rem;
`

const LinkIconWrapper = styled.div`
  opacity: 0.25;
`

const TopSection = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const LinkRow = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  a h3 {
    color: black !important;
  }
`

const DocsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
`

const StyledImage = styled(ThemedImage)`
  position: relative;
  z-index: -1;
  width: 100%;
  object-fit: cover;
`

const StyledTitleImage = styled(StyledImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  position: absolute;
  opacity: 0.2;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: var(--ifm-font-color-base);
  }
`

const DescriptionSection = styled.div`
  max-width: 1100px;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;
  text-align: center;
  line-height: 1.6;
`

const DescriptionText = styled.p`
  margin-bottom: 1.5rem;
  text-align: left;
`

const DescriptionList = styled.ul`
  text-align: left;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
`

const DescriptionListItem = styled.li`
  margin-bottom: 0.5rem;
`

const DappsContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    margin-top: 2rem;
    padding: 0 1rem;
  }
`

const ExploreContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    margin-top: 1rem;
    padding: 0 1rem;
  }
`

const LinksContainer = styled.div`
  margin: 2rem 0 3rem 0;

  @media (max-width: 640px) {
    margin: 0 0 3rem 0;
  }
`

export default function Home() {
  return (
    <Layout title={`t1 Docs`} description="Technical Documentation For The t1 Protocol">
      <StyledTitleImage
        sources={{
          light: useBaseUrl('/img/t1-cover-no-text.png'),
          dark: useBaseUrl('/img/t1-cover-no-text.png'),
        }}
      />
      <Container>
        <DocsHeader>
          <div
            style={{
              padding: '4rem 1rem 2rem 1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '2.5rem' }}> Welcome to t1 Docs</div>
          </div>
          <DescriptionSection>
            <DescriptionText>
              t1 is an EVM-based cross-chain application infrastructure that introduces Real-time proving (RTP) and
              programmability to address fragmentation and composability challenges in scaling Ethereum:
            </DescriptionText>

            <DescriptionList>
              <DescriptionListItem>
                <strong>Real-time proving:</strong> Using Trusted Execution Environments (TEEs), t1 proves its execution
                integrity to Ethereum and partner rollups in under 12 seconds. By running partner rollup nodes within
                its infrastructure, t1 aggregates and proves their state to Ethereum in 1-2 L1 blocks—enabling instant
                settlement between Ethereum and any partner rollup.
              </DescriptionListItem>
              <DescriptionListItem>
                <strong>Programmability:</strong> t1 smart contracts are able to read from and write to Ethereum and
                partner rollups. (coming soon)
              </DescriptionListItem>
            </DescriptionList>

            <DescriptionText>
              t1 provides the missing infrastructure for seamless cross-chain applications and liquidity movement—today.
            </DescriptionText>
          </DescriptionSection>

          <Row>
            {actions.map((action) => (
              <TraceEvent
                key={action.to}
                element={action.to}
                events={[BrowserEvent.onClick]}
                name={SharedEventName.PAGE_CLICKED}
                section={SectionName.WELCOME_LINKS}
              >
                <Link style={{ textDecoration: 'none' }} to={action.to}>
                  <ShadowCard key={action.title}>
                    <TopSection>
                      <IconWrapper>
                        <action.icon style={{ width: '24px' }} />
                      </IconWrapper>
                      <LinkIconWrapper>
                        <LinkIcon />
                      </LinkIconWrapper>
                    </TopSection>
                    <h3 style={{ marginBottom: '.75rem', fontWeight: 500 }}>{action.title}</h3>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 300 }}>{action.text}</p>
                  </ShadowCard>
                </Link>
              </TraceEvent>
            ))}
          </Row>
        </DocsHeader>
        <>
          {/* Smart Contracts Section */}
          <ExploreContainer>
            <div style={{ fontSize: '24px', fontWeight: 500, marginBottom: '0.5rem' }}>
              Integrate Your Smart Contracts
            </div>
            <p style={{ marginBottom: '1rem' }}>Build with t1&apos;s cross-chain capabilities</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {smartContractGuides.map((action) => (
                <TraceEvent
                  key={action.to}
                  element={action.to}
                  events={[BrowserEvent.onClick]}
                  name={SharedEventName.PAGE_CLICKED}
                  section={SectionName.SMART_CONTRACT_LINKS}
                >
                  <Link style={{ textDecoration: 'none', height: '100%' }} key={action.title} to={action.to}>
                    <Card style={{ height: '100%' }}>
                      <LinkRow>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '0rem' }}>{action.title}</h3>
                        </div>
                        <LinkIconWrapper>
                          <LinkIcon />
                        </LinkIconWrapper>
                      </LinkRow>
                      <p style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.text}</p>
                    </Card>
                  </Link>
                </TraceEvent>
              ))}
            </div>
          </ExploreContainer>

          {/* Explore dApps Section */}
          <DappsContainer>
            <div style={{ fontSize: '24px', fontWeight: 500, marginBottom: '0.5rem' }}>Explore dApps</div>
            <p style={{ marginBottom: '1rem' }}>See what&apos;s possible with t1</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {dAppGuides.map((action) => (
                <TraceEvent
                  key={action.title}
                  element={action.to}
                  events={[BrowserEvent.onClick]}
                  name={SharedEventName.PAGE_CLICKED}
                  section={SectionName.DAPP_LINKS}
                >
                  <Link style={{ textDecoration: 'none', height: '100%' }} key={action.title} to={action.to}>
                    <Card
                      style={{
                        height: '100%',
                        opacity: action.disabled ? 0.6 : 1,
                        cursor: action.disabled ? 'not-allowed' : 'pointer',
                        minWidth: 'auto',
                      }}
                    >
                      <LinkRow>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '0rem' }}>{action.title}</h3>
                        </div>
                        {!action.disabled && (
                          <LinkIconWrapper>
                            <LinkIcon />
                          </LinkIconWrapper>
                        )}
                      </LinkRow>
                      <p style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.text}</p>
                    </Card>
                  </Link>
                </TraceEvent>
              ))}
            </div>
          </DappsContainer>
        </>
        <hr />
        <LinksContainer>
          <RowCentered>
            <TraceEvent
              events={[BrowserEvent.onClick]}
              section={SectionName.BOTTOM_MENU_LINKS}
              element={ElementName.X}
              name={SharedEventName.PAGE_CLICKED}
            >
              <Link style={{ textDecoration: 'none' }} href={'https://x.com/t1protocol'}>
                <CenterCard>
                  <StyledIcon>
                    <X style={{ width: '40px', height: '40px' }} />
                  </StyledIcon>
                  <div>
                    <h3>X</h3>
                    <p>Stay up to date on X.</p>
                  </div>
                </CenterCard>
              </Link>
            </TraceEvent>
            <TraceEvent
              events={[BrowserEvent.onClick]}
              element={ElementName.DISCORD}
              section={SectionName.BOTTOM_MENU_LINKS}
              name={SharedEventName.PAGE_CLICKED}
            >
              <Link style={{ textDecoration: 'none' }} href={'https://discord.com/invite/nbvyXZHgke'}>
                <CenterCard>
                  <Discord style={{ width: '48px', height: '48px' }} />
                  <div>
                    <h3>Discord</h3>
                    <p>Join our Developer Community.</p>
                  </div>
                </CenterCard>
              </Link>
            </TraceEvent>
            <TraceEvent
              events={[BrowserEvent.onClick]}
              section={SectionName.BOTTOM_MENU_LINKS}
              element={ElementName.GITHUB}
              name={SharedEventName.PAGE_CLICKED}
            >
              <Link style={{ textDecoration: 'none' }} href={'https://github.com/t1protocol'}>
                <CenterCard>
                  <StyledIcon>
                    <GitHub style={{ width: '40px', height: '40px' }} />
                  </StyledIcon>
                  <div>
                    <h3>GitHub</h3>
                    <p>View all t1 repositories.</p>
                  </div>
                </CenterCard>
              </Link>
            </TraceEvent>
          </RowCentered>
        </LinksContainer>
      </Container>
    </Layout>
  )
}
