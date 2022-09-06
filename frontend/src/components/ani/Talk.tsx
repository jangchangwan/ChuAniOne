import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

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

const TalkList = styled.div`
`



const TalkItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  &.mine {
    flex-direction: row-reverse;
  }
`

const TalkBox = styled.div`
  margin-top: 1rem;
  background-color: #ffb7bc;
  width: fit-content;
  padding: 1rem;
  border-radius: 0.5rem;

  &.mine {
    background-color: #b7eeff;
  }
`

const UserName = styled.p`
  font-weight: bold;
  margin: 0;
`

const UserContent = styled.p`
  margin: 0;
`

function Talk({ recommend }: any): any {
  return (
    <Container>
      <TalkCount>232,356개의 Talk</TalkCount>
      <TalkInput id="outlined-basic" placeholder="이 작품에 대한 리뷰를 작성해보세요 !" variant="outlined" multiline rows={3}/>
      <TalkList>
        <TalkItem className="mine">
          <TalkBox className="mine">
            <UserName>User</UserName>
            <UserContent>어머나 세상에</UserContent>
          </TalkBox>
        </TalkItem>
        <TalkItem>
          <TalkBox>
            <UserName>User</UserName>
            <UserContent>어머나 세상에</UserContent>
          </TalkBox>
        </TalkItem>
        <TalkItem>
          <TalkBox>
            <UserName>User</UserName>
            <UserContent>어머나 세상에</UserContent>
          </TalkBox>
        </TalkItem>
        <TalkItem>
          <TalkBox>
            <UserName>User</UserName>
            <UserContent>어머나 세상에</UserContent>
          </TalkBox>
        </TalkItem>
      </TalkList>
    
    </Container>
  )
}

export default Talk
