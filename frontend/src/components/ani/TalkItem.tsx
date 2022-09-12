import React, { useEffect } from 'react'
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
  console.log(mine)
  
  useEffect(() => {
    setMine()
  }, [])

  async function setMine(): Promise<void> {
    const container = await document.querySelector('.container')
    const talkbox = await document.querySelector('.talkBox')

    if (mine && container && talkbox) {
      await container.classList.add("mine")
      await talkbox.classList.add("mine")
    }
  }

  return (
    <Container className="container">
      <TalkBox className="talkBox">
        <UserName>User</UserName>
        <UserContent>어머나 세상에</UserContent>
      </TalkBox>
    </Container>
  )
}

export default TalkItem
