import React, { RefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChatItem from './ChatItem'

const Container = styled.div`
  width: calc(100% - 2.4rem);
  height: calc(85% - 2.4rem);
  padding: 1.2rem;

  overflow-y: auto;

  ::-webkit-scrollbar {
    /* background-color: ; */
    width: 0.5rem;
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background-color: #f37b83;
    height: 30%;
    box-shadow: inset 0px 0px 3px white;
  }

  ::-webkit-scrollbar-track {
    background-color: #ffcdce;
    box-shadow: inset 0px 0px 3px white;
  }
` 

const ChatBox = styled.div`
  width: 100%;
`

function ChatList() {
  interface Chat {
    user: string,
    content: string,
    time: string,
    mine: boolean
  }
  const chattings: Chat[] = [
    {
      user: '쏘앵',
      content: '옥수수빵 캐맛있음',
      time: '13:00',
      mine: false,
    },
    {
      user: '떼영',
      content: '카카카카',
      time: '13:05',
      mine: false,
    },
    {
      user: '타카키 동운',
      content: '우하하하하하하하하',
      time: '13:06',
      mine: false,
    },
    {
      user: '탄노',
      content: '에에에ㅔ에에에에에에에에에에ㅔ엥',
      time: '13:07',
      mine: false,
    },
    {
      user: '유쥬',
      content: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ',
      time: '13:08',
      mine: false,
    },
    {
      user: '승현',
      content: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
      time: '13:10',
      mine: true,
    },
  ]

  const scrollRef = useRef<any>()

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <Container>
      { chattings.map((chat: any, idx: number) => (
        <ChatItem data={chat}/>
      ))}
      <div ref={scrollRef} />
    </Container>
  )
}

export default ChatList
