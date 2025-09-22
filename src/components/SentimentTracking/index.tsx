import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { Frown, Meh, Smile } from 'react-feather'

import { colors } from '../../theme/color'
import { Opacity } from '../../theme/style'

enum Sentiment {
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const PositiveSentimentIcon = styled(Smile)<{ selected: boolean }>`
  fill: ${(props) => (props.selected ? colors.greenVibrant : 'transparent')};
  opacity: ${(props) => (props.selected ? Opacity.FULL : Opacity.MEDIUM)};
  cursor: pointer;

  &:hover {
    fill: ${colors.greenVibrant};
  }
`

const NegativeSentimentIcon = styled(Frown)<{ selected: boolean }>`
  fill: ${(props) => (props.selected ? colors.redVibrant : 'transparent')};
  opacity: ${(props) => (props.selected ? Opacity.FULL : Opacity.MEDIUM)};
  cursor: pointer;

  &:hover {
    fill: ${colors.redVibrant};
  }
`

const NeutralSentimentIcon = styled(Meh)<{ selected: boolean }>`
  fill: ${(props) => (props.selected ? colors.yellowVibrant : 'transparent')};
  opacity: ${(props) => (props.selected ? Opacity.FULL : Opacity.MEDIUM)};
  margin: 0 0.2rem;
  cursor: pointer;

  &:hover {
    fill: ${colors.yellowVibrant};
  }
`

const StyledTextDiv = styled.div`
  font-size: 1rem;
  padding-right: 0.5rem;
`

export default function SentimentTracking() {
  const [selectedSentiment, setSelectedSentiment] = useState<null | Sentiment>(null)

  const isSentimentSelected = useCallback(
    (sentiment: Sentiment) => selectedSentiment && selectedSentiment === sentiment,
    [selectedSentiment]
  )

  return (
    <Container>
      <StyledTextDiv>Helpful?</StyledTextDiv>
      <PositiveSentimentIcon
        selected={isSentimentSelected(Sentiment.POSITIVE)}
        onClick={() => {
          setSelectedSentiment(Sentiment.POSITIVE)
        }}
      />
      <NeutralSentimentIcon
        selected={isSentimentSelected(Sentiment.NEUTRAL)}
        onClick={() => {
          setSelectedSentiment(Sentiment.NEUTRAL)
        }}
      />
      <NegativeSentimentIcon
        selected={isSentimentSelected(Sentiment.NEGATIVE)}
        onClick={() => {
          setSelectedSentiment(Sentiment.NEGATIVE)
        }}
      />
    </Container>
  )
}
