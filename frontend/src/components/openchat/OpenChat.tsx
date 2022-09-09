import React from 'react'
import styled from 'styled-components'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'

const Container = styled.div`
  padding-top: 3.5rem;
  height: calc(100vh - 3.5rem);
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

function OpenChat() {
  return (
    <Container>
      <ChatLeft />
      <ChatRight />
    </Container>
  )
}

export default OpenChat;
