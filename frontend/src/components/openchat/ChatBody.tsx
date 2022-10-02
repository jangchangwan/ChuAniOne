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
import store from '../../store'
import { getChatList } from '../../store/openchatslice'

// chatting
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { $CombinedState } from 'redux'

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

  const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => state.login.userId)

  const [sendMessage, setSendMessage] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [isUpdated, setIsUpdated] = useState(' ')

  // SockJS 내부의 stomp 가져오기
  var stomp = Stomp.over(function() {
    // return new SockJS('http://localhost:8080/api/v1/stomp/chat.do')
    return new SockJS('https://j7e104.p.ssafy.io/api/v1/stomp/chat.do')
  })
  // stomp.reconnect_delay = 1000

  // 메시지 보내기
  function sendMsg() {
    if (sendMessage.trim() === '') return
    console.log('보낸다', sendMessage)
    connect()
    
    stomp.send('/pub/chat/message', 
      {},
      JSON.stringify({
        roomId: `${openedRoom.id}`,
        memberId: `${userId}`,
        message: `${sendMessage}`,
      }),
    )

    setSendMessage('')
  }

  // 연결 시, 콜백 함수
  const connect_callback = () => {
    console.log("STOMP Connection")

    // 입장용
    stomp.send('/pub/chat/enter', {}, 
      JSON.stringify({
        roomId: `${openedRoom.id}`,
        memberId: `${userId}`,
        message: '',
      }),
    )

        
    stomp.subscribe(`/sub/chat/room/${openedRoom.id}`, function (message: any) {
      // console.log('subscribe', message)
      // let recv = JSON.parse(message.body)
      // console.log('recv', recv)
      // recvMsg(recv)
      getChattings()
      message.ack()
    })

  }



  const error_callback = (err: any) => {
    console.log('!!!!!!!!!!! 에러 !!!!!!!!!!!')
  } 

  // connection 맺기
  function connect() {
    stomp.connect({}, connect_callback, error_callback)
  }

  // 채팅 기록 불러오기
  async function getChattings () {
    const res: any = await dispatch(getChatList(openedRoom.id))
    if (res.meta.requestStatus === "fulfilled") {
      setMessages(res.payload)
    }
  }

  useEffect(() => {
    connect()
  }, [sendMessage])

  // 방 바뀔때마다 메시지 새로 불러오기
  useEffect(() => {
    connect()
    getChattings()
  }, [openedRoom])

  useEffect(() => {
    connect()
  }, [])

  // const scrollRef = useRef<any>()
  const scrollRef = useRef<any>()
  useEffect(() => {
    // scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    console.log(scrollRef)

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])


  return (
    <Container>
      <ChatList ref={scrollRef}>
        { messages.map((chat: any, idx: number) => (
          <ChatItem data={chat}/>
        ))}
        {/* <div ref={scrollRef} /> */}
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
