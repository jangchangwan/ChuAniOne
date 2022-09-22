import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatItem from './ChatItem'

import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import IconSend from '@mui/icons-material/Send'
import IconPhoto from '@mui/icons-material/AddPhotoAlternate'

// redux
import { useSelector, useDispatch } from 'react-redux'
import initialState from '../../store/Loginslice'
import openChatReducerType from '../../store/openchatslice'
import store from '../../store'

// chatting
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { IPublishParams } from '@stomp/stompjs'
import { SettingsInputComponent } from '@mui/icons-material'
const StompJs = require('@stomp/stompjs')


const Container = styled.div`
  width: 100%;  
  height: 90%;
`

const ChatList = styled.div`
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

const ImgDiv = styled.div`
  position: absolute;
  top: 1.7rem;
  right: 5rem;
`


const SendDiv = styled.div`
  position: absolute;
  top: 1.7rem;
  right: 2rem;
`

const IconBtn = styled(IconButton)`
`

const PhotoIcon = styled(IconPhoto)`
  color: #f37b83;
`

const SendIcon = styled(IconSend)`
  color: #f37b83;
`


function ChatBody({ opened, openedRoom, handleOpened, handleClosed }: any) {
  interface Msg {
    roomId: number,
    memberId: number,
    memberNickname: string,
    url: string,
    message: string,
    sendDate: string,
  }

  // const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => state.login.userId)

  const [sendMessage, setSendMessage] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [isUpdated, setIsUpdated] = useState(' ')

  // SockJS 내부의 stomp 가져오기
  var stomp = Stomp.over(function() {
    return new SockJS('http://localhost:8080/api/v1/stomp/chat.do')
  })
  stomp.reconnect_delay = 5000
  var reconnect = 0

  // 웹 소켓이 연결될 때까지 실행
  function waitForConnection(stomp, callback) {
    setTimeout(
      function() {
        if(stomp.ws) {
          callback()
        } else {
          waitForConnection(stomp, callback)
        }
      }, 1
    )
  }

  // 메시지 보내기
  function sendMsg() {
    if (sendMessage.trim() === '') return
    // console.log(sendMessage)

    // stomp.send('/pub/chat/message', 
    //   {},
    //   JSON.stringify({
    //     roomId: `${openedRoom.id}`,
    //     memberId: `${userId}`,
    //     message: `${sendMessage}`,
    //   }),
    // )
    // setSendMessage('')

    waitForConnection(stomp, function() {
      stomp.send('/pub/chat/message', 
      {},
      JSON.stringify({
        roomId: `${openedRoom.id}`,
        memberId: `${userId}`,
        message: `${sendMessage}`,
      }),
    )
    setSendMessage('')
    })
  }

  // 메시지 수신
  function recvMsg(recv: Msg) {
    const val = [
      ...messages,
      recv
    ]
    setMessages(val)
  }

  // 연결 시, 콜백 함수
  const connect_callback = () => {
    console.log("STOMP Connection")
      
    stomp.subscribe(`/sub/chat/room/${openedRoom.id}`, function (message: any) {
      console.log('subscribe', message)
      let recv = JSON.parse(message.body)
      console.log(recv)
      recvMsg(recv)

      message.ack()
    })

    stomp.send('/pub/chat/enter', {}, 
      JSON.stringify({
        roomId: `${openedRoom.id}`,
        memberId: `${userId}`,
        message: '',
      }),
    )

  }


  const error_callback = (err: any) => {
    console.log('!!!!!!!!!!! 에러 !!!!!!!!!!!')
  } 

  // connection 맺기
  function connect() {
    stomp.connect({}, connect_callback, error_callback)
  }

  useEffect(() => {
    if (openedRoom) {
      stomp.disconnect()
      connect()
    }
  }, [openedRoom])

  // 채팅방 스크롤 맨아래로
  const scrollRef = useRef<any>()

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  })


  return (
    <Container>
      <ChatList>
        { messages.map((chat: any, idx: number) => (
          <ChatItem data={chat}/>
        ))}
        <div ref={scrollRef} />
      </ChatList>

      {/* 채팅 보내기: input */}
      <SendChat>
        <SendInput fullWidth
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
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#f37b83"
          }}}}
        />
        <ImgDiv>
          <IconBtn>
            <PhotoIcon/>
          </IconBtn>
        </ImgDiv>
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
