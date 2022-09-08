import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import { NightShelter } from '@mui/icons-material'

const Container = styled.div`
  width: calc(80% - 2rem);
  padding: 2rem;
  margin: 0.7rem 10%;
  height: calc(100% - 2rem - 1.4rem);
  background-color: #F4F4F4;
  border-radius: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const BoxDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Box = styled.div`
  width: 50%;
`

const Name = styled.h2`
  margin-left: 0.5rem;
`

const Hash = styled.p`

`

const InputField = styled(TextField)`
  fieldset {
    border-radius: 1rem;
  }
`

const CreateRoom = styled(Button)`
  font-size: 1.3rem !important;
  border-radius: 0.5rem !important;
  background-color: #f37b83 !important;
`

function MakeChat() {
  interface Room {
    name: string | null,
    hashtags: string[],
    member: number,
  }

  const [room, setRoom] = useState<Room>({
    name: null,
    hashtags: [],
    member: 2,
  })

  const [hash, setHash] = useState<string>('')

  function addHash(): void {
    if (room.hashtags.length < 3) {
      const hashs = [
        ...room.hashtags,
        hash
      ]
      setRoom ({
        ...room,
        hashtags: hashs,
      })
    }
  }

  function removeHash(hashtag: string): void {
    const hashs = room.hashtags.filter(function(data) {
      return data !== hashtag
    })
    setRoom ({
      ...room,
      hashtags: hashs,
    })
  }

  return (
    <Container>
      <BoxDiv>
        <Box>
          <Name>방제목</Name>
          <InputField variant="outlined" fullWidth
            value={room.name}  onChange={(e) => setRoom({...room, name: e.target.value})} />
        </Box>
        <Box>
          <Name>해시태그</Name>
          { room.hashtags.map((hashtag, idx) => (
            <Hash onClick={() => removeHash(hashtag)}># {hashtag}</Hash>
          ))}
          { room.hashtags.length < 3 ? 
            <InputField variant="outlined" fullWidth
              value={hash} onChange={(e) => setHash(e.target.value.trim())} onKeyUp={(e) => {
                if(e.key === "Enter" && hash) { 
                  addHash()
                  setHash('')
                }
              }}/>
          : null }
        </Box>
        <Box>
          <Name>최대 인원 수</Name>
          <InputField type="number" InputProps={{ inputProps: { min: 2, max: 5 } }} 
            variant="outlined" fullWidth value={room.member}
            onChange={(e) => setRoom({...room, member: parseInt(e.target.value)})}
            />
        </Box>
      </BoxDiv>
      <Box>
        <CreateRoom variant="contained" fullWidth
          onClick={() => console.log(room)}
        >방 만들기</CreateRoom>
      </Box>
    </Container>
  )
}

export default MakeChat
