import React, { useState } from 'react'
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
  const [opened, setOpened] = useState<boolean>(false)
  const [openedRoom, setOpenedRoom] = useState<any>()

  const handleOpened = ( room: any ) => {
    setOpened(true)
    setOpenedRoom(room)
  }

  const handleClosed = ( ) => {
    setOpened(false)
    setOpenedRoom(null)
  }

  return (
    <Container>
      <ChatLeft 
        opened={opened} 
        openedRoom={openedRoom}
        handleOpened={handleOpened}
        handleClosed={handleClosed}
      />
      <ChatRight 
        opened={opened} 
        openedRoom={openedRoom} 
        handleOpened={handleOpened} 
        handleClosed={handleClosed}
      />
    </Container>
  )
}

export default OpenChat
