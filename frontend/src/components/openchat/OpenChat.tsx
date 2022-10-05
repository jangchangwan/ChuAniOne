import React, { useState } from 'react'
import styled from 'styled-components'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'

// background
import { motion } from 'framer-motion' 
import aniimg from '../../assets/images/aniImg.png'

const Container = styled.div`
  padding-top: 3.5rem;
  height: calc(100vh - 3.5rem);
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow:hidden;
  background-image: url(${aniimg});
`

const Circlediv = styled.div`
  position: absolute;
  top: 5;
  width: 400px;
  border-radius: 50%;
`
const CircleWord = styled.span`
  color: #FFDE00;
  font-size: 10rem;
  height: 770px;
  position: absolute;
  width: 20px;
  left: 0;
  top: 0;
  transform-origin: bottom center;
`

/** 오픈채팅 페이지 */
function OpenChat() { 

  /**
    opened: 채팅방 on/off
    openedId: 열린 채팅방 id
  **/
  const [opened, setOpened] = useState<boolean>(false)
  const [openedId, setOpenedId] = useState<number | undefined>()

  /** 채팅방 열기 */
  const handleOpened = ( roomId: number ) => {
    setOpened(true)
    setOpenedId(roomId)
  }

  /** 채팅방 닫기 */
  const handleClosed = () => {
    setOpened(false)
    setOpenedId(undefined)
  }

  return (
    <Container>
      <motion.div
        initial = {{ 
          rotate: 0,
          transformOrigin : '1rem 48rem'
        }}
        animate = {{ 
          rotate: -360,
          transformOrigin : '1rem 48rem'
        }}
        transition = {{duration: 60, repeat: Infinity}}
        style={{
          position: 'absolute',
          left: '35%',
          zIndex: 1,
        }}
      >
        <Circlediv>
          <p>
            <CircleWord style={{transform: 'rotate(11deg)'}}>C</CircleWord>
            <CircleWord style={{transform: 'rotate(22deg)'}}>H</CircleWord>
            <CircleWord style={{transform: 'rotate(33deg)'}}>U</CircleWord>
            <CircleWord style={{transform: 'rotate(44deg)'}}> </CircleWord>
            <CircleWord style={{transform: 'rotate(55deg)'}}>A</CircleWord>
            <CircleWord style={{transform: 'rotate(66deg)'}}>N</CircleWord>
            <CircleWord style={{transform: 'rotate(77deg)'}}>I</CircleWord>
            <CircleWord style={{transform: 'rotate(88deg)'}}>O</CircleWord>
            <CircleWord style={{transform: 'rotate(99deg)'}}>N</CircleWord>
            <CircleWord style={{transform: 'rotate(110deg)'}}>E</CircleWord>
            <CircleWord style={{transform: 'rotate(121deg)'}}>!</CircleWord>
            <CircleWord style={{transform: 'rotate(132deg)'}}> </CircleWord>
            <CircleWord style={{transform: 'rotate(143deg)'}}>O</CircleWord>
            <CircleWord style={{transform: 'rotate(154deg)'}}>P</CircleWord>
            <CircleWord style={{transform: 'rotate(165deg)'}}>E</CircleWord>
            <CircleWord style={{transform: 'rotate(176deg)'}}>N</CircleWord>
            <CircleWord style={{transform: 'rotate(187deg)'}}>C</CircleWord>
            <CircleWord style={{transform: 'rotate(198deg)'}}>H</CircleWord>
            <CircleWord style={{transform: 'rotate(209deg)'}}>A</CircleWord>
            <CircleWord style={{transform: 'rotate(220deg)'}}>T</CircleWord>
            <CircleWord style={{transform: 'rotate(231deg)'}}> </CircleWord>
            <CircleWord style={{transform: 'rotate(242deg)'}}>C</CircleWord>
            <CircleWord style={{transform: 'rotate(253deg)'}}>H</CircleWord>
            <CircleWord style={{transform: 'rotate(264deg)'}}>U</CircleWord>
            <CircleWord style={{transform: 'rotate(275deg)'}}> </CircleWord>
            <CircleWord style={{transform: 'rotate(286deg)'}}>A</CircleWord>
            <CircleWord style={{transform: 'rotate(297deg)'}}>N</CircleWord>
            <CircleWord style={{transform: 'rotate(308deg)'}}>I</CircleWord>
            <CircleWord style={{transform: 'rotate(319deg)'}}>O</CircleWord>
            <CircleWord style={{transform: 'rotate(330deg)'}}>N</CircleWord>
            <CircleWord style={{transform: 'rotate(343deg)'}}>E</CircleWord>
            <CircleWord style={{transform: 'rotate(354deg)'}}>!</CircleWord>
          </p>
        </Circlediv>
      </motion.div>
  
      <ChatLeft 
        handleOpened={handleOpened}
      />
      <ChatRight 
        opened={opened} 
        openedId={openedId} 
        handleClosed={handleClosed}
      />
    </Container>
  )
}

export default OpenChat
