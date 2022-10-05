import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatItem from './ChatItem'

import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import IconSend from '@mui/icons-material/Send'

// redux
import { useSelector, useDispatch } from 'react-redux'
import initialState from '../../store/Loginslice'
import store from '../../store'
import { getChatList } from '../../store/openchatslice'

// chatting
import * as StompJs from '@stomp/stompjs'
import SockJS from 'sockjs-client'


const Container = styled.div`
  width: 100%;  
  height: 90%;
`

const ChatList = styled.div`
  width: calc(100% - 2.4rem);
  height: calc(85% - 2.4rem);
  padding: 1.2rem;
  color: #333333;

  overflow-y: auto;

  ::-webkit-scrollbar {
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

const SendChat = styled.div`
  width: calc(100% - 2.4rem);
  height: calc(15% - 2.4rem);
  padding: 1.2rem;
  position: relative;
`

const SendInput = styled(TextField)`
  fieldset {
    border-radius: 1.5rem;
  }
`

const SendDiv = styled.div`
  position: absolute;
  top: 1.7rem;
  right: 2rem;
`

const IconBtn = styled(IconButton)`
`

const SendIcon = styled(IconSend)`
  color: #f37b83;
`

/** 채팅하기 */
function ChatBody({ openedId }: any) {
  // message type
  interface Msg {
    roomId: number,
    memberId: number,
    memberNickname: string,
    url: string,
    message: string,
    sendDate: string,
  }

  const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => state.login.userId)

  /**
    sendMessage: 보내는 메시지
    messages: 채팅방 메시지 목록
  **/
  const [sendMessage, setSendMessage] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])

  const client = useRef<any>({})

  /** 채팅 연결하기 */
  const connect = () => {
    // SockJs 설정
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS('https://j7e104.p.ssafy.io/api/v1/stomp/chat.do'),
      debug: function (str) {
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 연결된 경우, 구독하기
      onConnect: () => {
        client.current.subscribe(`/sub/chat/room/${openedId}`, ({ body }) => {
          const msg = JSON.parse(body)
          if (messages[messages.length-1] !== msg) {
            setMessages(messages => [...messages, msg])
          }
        })
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    })

    // 활성화
    client.current.activate()
  }

  /** 채팅방 연결 해제 */
  const disconnect = () => {
    client.current.deactivate()
  }

  /** 메시지 보내기 */
  const sendMsg = () => {
    if (!client.current.connected) return
    if (!sendMessage.trim()) return

    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({ 
        roomId: `${openedId}`,
        memberId: `${userId}`,
        message: `${sendMessage}`,
      }),
    })

    setSendMessage('')
  }


  /** 채팅 기록 불러오기 */
  async function getChattings () {
    const res: any = await dispatch(getChatList(openedId))
    if (res.meta.requestStatus === "fulfilled") {
      setMessages(res.payload)
    }
  }


  // 방 바뀔때마다 메시지 새로 불러오기
  useEffect(() => {
    getChattings()
    connect()

    return () => disconnect()
  }, [openedId])


  // 채팅 스크롤
  const scrollRef = useRef<any>()
  
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])


  return (
    <Container>
      {/* 채팅 내역 */}
      <ChatList ref={scrollRef}>
        { messages.map((chat: any, idx: number) => (
          <ChatItem key={idx} data={chat}/>
        ))}
      </ChatList>

      {/* 채팅 보내기: input */}
      <SendChat>
        <SendInput 
          fullWidth
          placeholder='메시지를 입력하세요'
          value={sendMessage}
          onChange={(event: any) => {
            if (event.target.value.length <= 1000) 
            setSendMessage(event.target.value)
          }}
          onKeyPress={(event: any) => {
            if (event.key === 'Enter') {
              sendMsg()
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: 'white',
              borderRadius: '1.5rem',
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#f37b83",
              
          }}}}
        />
        <SendDiv 
          onClick={() => {
            sendMsg()
          }}
        >
          <IconBtn>
            <SendIcon/>
          </IconBtn>
        </SendDiv>
      </SendChat>
    </Container>
  )
}

export default ChatBody
