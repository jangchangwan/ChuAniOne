import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'

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

function MyChatItem({ chatData }: any): any {
  return (
    <Container>
      <NameHashBox>
        <Name>{chatData.room_name}</Name>
        <HashTags>
          { chatData.hashTags.map((hash: string, idx: number) => (
            <HashTag>#{hash}</HashTag>
          ))}
        </HashTags>
      </NameHashBox>
      <RoomBox>
        <MemberCountBox>
          <MemberCount>{chatData.now_num} / {chatData.max_num}</MemberCount>
        </MemberCountBox>
        <EnterRoomBox>
          <EnterRoom variant="contained" color="secondary">입장하기</EnterRoom>
        </EnterRoomBox>
      </RoomBox>
    </Container>
  )
}

export default MyChatItem
