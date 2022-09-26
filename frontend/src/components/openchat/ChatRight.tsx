import React from 'react'
import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'


const Container = styled.div`
  width: calc(38% - 6rem);
  height: 85%;
  padding: 0;
  margin: 7.5% 3rem;
  background-color: #FCE2DB;
  border-radius: 2rem;
  outline: 0.35rem solid #f37b83;

  display: flex;
  flex-direction: column;
`

function ChatRight({ opened, openedRoom, handleOpened, handleClosed }: any) {
  
  return (
    <>
      { opened ?
        <Container>
          <ChatHeader 
            opened={opened} 
            openedRoom={openedRoom} 
            handleOpened={handleOpened} 
            handleClosed={handleClosed}
          />
          <ChatBody
            opened={opened} 
            openedRoom={openedRoom} 
            handleOpened={handleOpened} 
            handleClosed={handleClosed}
          />
        </Container>
      : 
        null
      }
    </>
  )
}

export default ChatRight
