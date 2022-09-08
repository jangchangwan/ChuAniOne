import React from 'react'
import styled from 'styled-components'
import ChatItem from './ChatItem'

const Container = styled.div`
  width: calc(100% - 2.4rem);
  height: calc(85% - 2.4rem);
  background-color: yellow;
  padding: 1.2rem;
` 

function ChatList() {
  return (
    <Container>
      Chatting
    </Container>
  )
}

export default ChatList
