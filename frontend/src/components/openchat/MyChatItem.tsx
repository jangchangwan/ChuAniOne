import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'

// redux
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
const NameBox = styled.div`
  height: 70%;
  display: flex;
  align-items: center;
`

const MineIcon = styled(LocalFloristIcon)`
  height: 100%;
  color: #FFAFAF;
`
const Name = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`

const CrownText = styled.p`
  margin: 0;
  background-color: #FFC0C2;
  border-radius: 1rem;
  margin-right: 0.5rem;
`

const HashTags = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
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

function MyChatItem({ roomData, opened, openedId,  handleOpened, handleClosed }: any): any {

  const userId = useSelector((state: initialState) => state.login.userId)

  const openChat = () => {
    handleOpened(roomData.id)
  }

  return (
    <Container>
      <NameHashBox>
        <NameBox>
          { userId === roomData.memberId ? 
              <CrownText>
                방장
              </CrownText>
            : null
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
