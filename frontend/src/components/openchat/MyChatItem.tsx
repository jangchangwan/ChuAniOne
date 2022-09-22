import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'

// redux
import { useSelector, useDispatch } from 'react-redux'
import initialState from '../../store/Loginslice'
// import { setChattingOpen } from '../../store/openchatslice'
import store from '../../store'

const Container = styled.div`
  width: 100%;
  height: 17%;
  margin-bottom: 1rem;
  background-color: #F4F4F4;
  border-radius: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
`

const NameHashBox = styled.div`
  width: calc(75% - 2rem);
  padding-left: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const NameBox = styled.div`
  display: flex;
  text-align: center;
`

const MineIcon = styled(LocalFloristIcon)`
  height: 100%;
  color: #FFAFAF;
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

function MyChatItem({ roomData, opened, openedRoom,  handleOpened, handleClosed }: any): any {

  const userId = useSelector((state: initialState) => state.login.userId)

  const openChat = () => {
    handleOpened(roomData)
  }

  return (
    <Container>
      <NameHashBox>
        <NameBox>
          { userId === roomData.memberId ? 
            <MineIcon /> : null
          }
          <Name>{roomData.name}</Name>
        </NameBox>
        <HashTags>
          { roomData.tag1 ? <HashTag># {roomData.tag1}</HashTag> : null }
          { roomData.tag2 ? <HashTag># {roomData.tag2}</HashTag> : null }
          { roomData.tag3 ? <HashTag># {roomData.tag3}</HashTag> : null }
        </HashTags>
      </NameHashBox>
      <RoomBox>
        <MemberCountBox>
          <MemberCount>{roomData.count} / {roomData.max}</MemberCount>
        </MemberCountBox>
        <EnterRoomBox>
          <EnterRoom variant="contained" color="secondary" onClick={openChat}>채팅열기</EnterRoom>
        </EnterRoomBox>
      </RoomBox>
    </Container>
  )
}

export default MyChatItem
