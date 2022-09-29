import React, { useEffect } from 'react'
import styled from 'styled-components'
import { IconButton } from '@mui/material'



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
  margin: 0;

  &.mine {
    display: none;
  }
`

const UserContent = styled.p`
  margin: 0;
`

function TalkItem({ data, mine }: any): any {
  
  useEffect(() => {
    setMine()
    console.log(data)
  }, [])

  async function setMine(): Promise<void> {
    const container = await document.querySelector('.container')
    const talkbox = await document.querySelector('.talkBox')
    const name = await document.querySelector('.name')

    if (mine && container && talkbox && name) {
      await container.classList.add("mine")
      await talkbox.classList.add("mine")
      await name.classList.add("mine")
    }
  }

  return (
    <Container className="container">
      <TalkBox className="talkBox">
        <UserName className="name">{data.writer_name}</UserName>
        <UserContent>{data.content}</UserContent>
      </TalkBox>
    </Container>
  )
}

export default TalkItem
