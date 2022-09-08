import React from 'react'
import styled from 'styled-components'
import ChatList from './ChatList'
import SendChat from './SendChat'

const Container = styled.div`
  width: 100%;
  height: 90%;
  /* background-color: green; */
`

function ChatBody() {
  return (
    <Container>
      <ChatList />
      <SendChat />
    </Container>
  )
}

export default ChatBody
