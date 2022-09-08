import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
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

function TalkItem({recommend, mine}: any): any {
  if (mine) {
    const container = document.querySelector(Container)
    const talkbox = document.querySelector(TalkBox)

    container?.setAttribute("className", "mine")
    talkbox?.setAttribute("className", "mine")
  }

  return (
    <Container>
      <TalkBox>
        <UserName>User</UserName>
        <UserContent>어머나 세상에</UserContent>
      </TalkBox>
    </Container>
  )
}

export default TalkItem
