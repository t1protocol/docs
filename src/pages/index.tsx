import './styles.module.css'

import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styled from '@emotion/styled'
import Discord from '@site/static/img/discord.svg'
import GitHub from '@site/static/img/github.svg'
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
    title: 'What is 𝚝𝟷',
    icon: Info,
    to: '/concepts/overview',
    text: `Get familiar with the core concepts of the 𝚝𝟷 Protocol.`,
  },
  {
    title: '𝚝𝟷 devnet portal',
    icon: Chain,
    to: 'https://devnet.t1protocol.com/bridge',
    text: `Play with 𝚝𝟷 devnet.`,
  },
  {
    title: 'The 𝚝𝟷 smart contracts',
    icon: BookOpen,
    to: 'https://github.com/t1protocol/t1/tree/canary/contracts',
    text: `Learn about the architecture of 𝚝𝟷 smart contracts.`,
  },
]

export const developerLinks = [
  {
    title: 't1 monorepo',
    href: 'https://github.com/t1protocol/t1',
    icon: GitHub,
  },
]

export const dAppGuides = [
  {
    title: '𝚝𝟷 canonical bridge',
    text: 'Deposit funds to start interacting with apps on 𝚝𝟷 devnet.',
    to: 'https://devnet.t1protocol.com/bridge/',
  },
  {
    title: 'T-DEX',
    text: 'Swap tokens on 𝚝𝟷 without needing to bridge.',
    to: 'https://t-dex.devnet.t1protocol.com/',
  },
]
export const smartContractGuides = [
  {
    title: 'Setup your environment',
    text: 'Prepare your local environment for interacting with 𝚝𝟷.',
    to: 'https://devnet.t1protocol.com/',
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 960px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    max-width: 100%;
    margin: 0 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TwoRow = styled(Row)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 48px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
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

const ShadowCard = styled(Card)`
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff10;
  backdrop-filter: blur(10px);
  min-height: 200px;
  /* background-color: var(--ifm-color-emphasis-0); */
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
  svg {
    fill: var(--ifm-font-color-base);
  }
`

export default function Home() {
  return (
    <Layout title={`t1 Docs`} description="Technical Documentation For The 𝚝𝟷 Protocol">
      <Container>
        <DocsHeader>
          <div
            style={{
              padding: '4rem 0  ',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontWeight: 600 }}> Welcome to 𝚝𝟷 Docs</h1>
          </div>
          <StyledTitleImage
            sources={{
              light: useBaseUrl('/img/t1-cover-no-text.png'),
              dark: useBaseUrl('/img/t1-cover-no-text.png'),
            }}
          />
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
        <TwoRow
          style={{
            gap: '56px',
            marginTop: '4rem',
          }}
        >
          <div>
            <h2>Explore dApps</h2>
            <p>See what&apos;s possible with 𝚝𝟷.</p>
            <div>
              {dAppGuides.map((action) => (
                <TraceEvent
                  key={action.to}
                  element={action.to}
                  events={[BrowserEvent.onClick]}
                  name={SharedEventName.PAGE_CLICKED}
                  section={SectionName.DAPP_LINKS}
                >
                  <Link style={{ textDecoration: 'none' }} key={action.title} to={action.to}>
                    <Card key={action.title} style={{ marginBottom: '1rem' }}>
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
          </div>
          <div>
            <h2>Integrate your smart contracts</h2>
            <p>Get started integrating with 𝚝𝟷 in your smart contracts.</p>
            <div>
              {smartContractGuides.map((action) => (
                <TraceEvent
                  key={action.to}
                  element={action.to}
                  events={[BrowserEvent.onClick]}
                  name={SharedEventName.PAGE_CLICKED}
                  section={SectionName.SMART_CONTRACT_LINKS}
                >
                  <Link style={{ textDecoration: 'none' }} key={action.title} to={action.to}>
                    <Card key={action.title} style={{ marginBottom: '1rem' }}>
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
          </div>
        </TwoRow>
        <hr />
        <TwoRow>
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
                  <GitHub style={{ width: '48px', height: '48px' }} />
                </StyledIcon>
                <div>
                  <h3>GitHub</h3>
                  <p>View all 𝚝𝟷 repositories.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
        </TwoRow>
      </Container>
    </Layout>
  )
}
