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
  // stomp.heartbeat.incoming = 0
  // stomp.heartbeatOutgoing = 2000
  var reconnect = 0

  // const client = new StompJs.Client({
  //   brokerURL: 'ws://localhost:8080/api/v1/stomp/chat.do',
  //   connectHeaders: {
  //     login: 'user',
  //     passcode: 'password',
  //   },
  //   debug: function (str: any) {
  //     console.log(str);
  //   },
  //   reconnectDelay: 5000,
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  // })


  // 메시지 보내기
  const sendMsg = () => {
    if (sendMessage.trim() === '') return
    console.log(sendMessage)

    stomp.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        roomId: `${openedRoom.id}`,
        memberId: `${userId}`,
        message: `${sendMessage}`,
      }),
      headers: {},
    })
  }

  // 메시지 수신
  const recvMsg = (recv: Msg) => {
    const val = [
      ...messages,
      recv
    ]
    setMessages(val)
  }
  

  // const connect = () => {
  //   stomp.connect(
  //     {},
  //     function (frame: any) {
  //       console.log('방번호', room.id)

  //       stomp.subscribe(`/sub/chat/room/${room.id}`, function (message) {
  //         var recv = JSON.parse(message.body)
  //         recvMsg(recv)

  //         //시간 차 사용해서 재랜더링 강제로 일으키기
  //         setTimeout(() => {
  //           setIsUpdated('')
  //         }, 200)

  //         // 상대방 메시지 불러오기
  //         setIsUpdated(' ')
  //       })
  //       stomp.send(
  //         '/pub/chat/enter',
  //         {},
  //         JSON.stringify({
  //           roomId: `${room.id}`,
  //           memberId: `${userId}`,
  //           message: '',
  //         }),
  //       )
  //     },
  //     function (error: any) {
  //       if (reconnect++ <= 5) {
  //         setTimeout(function () {
  //           console.log('connection reconnect')
  //           stomp = Stomp.over(function() {
  //             return new SockJS('http://localhost:8080/api/v1/stomp/chat.do')
  //           })
  //           connect()
  //         }, 10 * 1000)
  //       }
  //     },
  //   )
  // }


  // connection 맺기
  const connect = () => {
    stomp.onConnect = function (frame: any) {
      console.log('연결')
      stomp.publish({
        destination: '/pub/chat/enter',
        body: JSON.stringify({
          roomId: `${openedRoom.id}`,
          memberId: `${userId}`,
          message: '',
        }),
        headers: { },
      })

      stomp.subscribe(`/sub/chat/room/${openedRoom.id}`, function (message: any) {
        console.log(message)
        let recv = JSON.parse(message.body)
        console.log(recv)
        recvMsg(recv)
      })

    }
    
    
    stomp.onStompError = function (frame: any) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
    
    
    stomp.activate()
  }

  

  useEffect(() => {
    if (opened) {
      connect()
    }
  }, [opened])

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
          onChange={(event) => {
            if (event.target.value.length <= 1000) 
            setSendMessage(event.target.value)
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              sendMsg()
              setSendMessage('')
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
            setSendMessage('')
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
