import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'

// redux
import { useDispatch } from 'react-redux'
import { enterRoom, getChatInfo } from '../../store/openchatslice'
import store from '../../store'
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

const Container = styled.div`
  width: 100%;
  height: 17%;
  margin-bottom: 1rem;
  background-color: #F4F4F4;
  border-radius: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  color: #333333;
`

const NameHashBox = styled.div`
  width: calc(75% - 2rem);
  padding-left: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const Name = styled.p`
  font-size: 1.3rem;
  margin: 0;
  font-weight: bold;
`

const HashTags = styled.div`
  width: 100%;
`

const HashTag = styled.span`
  margin-right: 0.5rem;
`

const RoomBox = styled.div`
  width: calc(25% - 2rem);
  padding-right: 2rem;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const MemberCountBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`

const MemberCount = styled.p`
  margin: 0;
  margin-right: 0.3rem;
`

const EnterRoomBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`

const EnterRoom = styled(Button)`
  margin: 0;
  font-size: 1.1rem;
  border-radius: 2rem !important;
  background-color: #f37b83 !important;
`


interface User {
  memberId: number,
  nickname: string,
  profile: string,
}

/** 전체 채팅방 아이템 */
function ChatTotalItem({ chatData, loadData, page }: any): any {
  const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => (state.login.userId))

  /**
    openSuccess: 채팅방 입장 성공
    openFail: 채팅방 입장 실패
    openAlready: 이미 입장한 채팅방
   */
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openFail, setOpenFail] = useState<boolean>(false)
  const [openAlready, setOpenAlready] = useState<boolean>(false)

  /** 채팅방 입장 */
  async function enterRequest() {
    // 1. 방 정보 가져오기
    const res = await dispatch(getChatInfo(chatData.id))

    if (res.meta.requestStatus === "fulfilled") {
      // 2. 입장 중인 방인지 확인하기
      const users: User[] = res.payload.mDto
      var joined = false

      users.map((user) => {
        if (user.memberId === userId) {
          joined = true
        }
      })

      // 3. 입장여부에 따라 동작
      if (!joined) {
        // 3-1. 입장하지 않은 방일 경우
        const res = await dispatch(enterRoom(chatData.id))
        if (res.payload) {
          // 3-1-1. 입장 성공 알림
          setOpenSuccess(true)
          loadData(page)
        } else {
          // 3-1-2. 입장 실패 알림
          setOpenFail(true)
        }
      } else {
        // 3-2. 이미 입장한 방 알림
        setOpenAlready(true)
      }
    }
  }
  
  return (
    <Container>
      <NameHashBox>
        <Name>{chatData.name}</Name>
        <HashTags>
          { chatData.tag1 ? <HashTag># {chatData.tag1}</HashTag> : null }
          { chatData.tag2 ? <HashTag># {chatData.tag2}</HashTag> : null }
          { chatData.tag3 ? <HashTag># {chatData.tag3}</HashTag> : null }
        </HashTags>
      </NameHashBox>
      <RoomBox>
        <MemberCountBox>
          <MemberCount>{chatData.count} / {chatData.max}</MemberCount>
        </MemberCountBox>
        <EnterRoomBox onClick={enterRequest}>
          <EnterRoom variant="contained">입장하기</EnterRoom>
        </EnterRoomBox>
      </RoomBox>

      {/* 입장 성공 시 */}
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(!openSuccess)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="success" sx={{ width: '100%' }}>
          방 입장 성공 ! <br/> 내 채팅목록에서 확인해주세요 😉
        </Alert>
      </Snackbar>

      {/* 입장 실패 시  */}
      <Snackbar open={openFail} autoHideDuration={3000} onClose={() => setOpenFail(!openFail)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="error" sx={{ width: '100%' }}>
          입장에 실패했습니다 😥<br/> 다시 시도해주세요 !
        </Alert>
      </Snackbar>

      {/*  이미 입장한 방일 경우  */}
      <Snackbar open={openAlready} autoHideDuration={3000} onClose={() => setOpenAlready(!openAlready)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="info" sx={{ width: '100%' }}>
          이미 입장 중인 방입니다. <br/> 내 채팅목록에서 확인해주세요 😉
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ChatTotalItem
