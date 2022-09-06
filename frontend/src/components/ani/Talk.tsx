import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import TalkList from './TalkList'

const Container = styled.div`
  width: 90%;
  height: 95%;
  padding: 2.5% 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TalkCount = styled.p`
  font-weight: bold;
`

const TalkInput = styled(TextField)`
  width: 100%;
`

function Talk({ recommend }: any): any {
  return (
    <Container>
      <TalkCount>232,356개의 Talk</TalkCount>
      <TalkInput id="outlined-basic" placeholder="이 작품에 대한 리뷰를 작성해보세요 !" variant="outlined" multiline rows={3}/>
      <TalkList recommend={recommend}/>
    </Container>
  )
}

export default Talk
