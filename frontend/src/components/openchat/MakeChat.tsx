import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, Snackbar } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { createChat } from '../../request/openchat'
import Alert from '@mui/material/Alert'

const Container = styled.div`
  width: calc(80% - 2rem);
  padding: 2rem;
  margin: 0.7rem 10%;
  height: calc(100% - 2rem - 1.4rem);
  background-color: #f5f5f5;
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
  width: fit-content;
  margin-left: 0.5rem;

  margin-bottom: 0.5rem;
  padding: 0 0.4rem 0 0.4rem;
  /* color: #333333; */
`

const Hashes = styled.div`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`

const HashDiv = styled.div`
  display: flex;
  align-items: center;
`

const Hash = styled.p`
  color: #333333;
  margin-right: 0.3rem;
  flex-wrap: nowrap;
`

const CancelIcon = styled(Cancel)`
  margin-right: 0.5rem;
  color: #808080;
`

const InputField = styled(TextField)`
  fieldset {
    border-radius: 1rem;
  }
`

const CreateRoom = styled.button`
  border-radius: 0.5rem;
  border: none;
  outline: none;
  width: 100%;
  padding: 1rem 0;
  
  color: #ffffff;
  font-size: 1.3rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;

  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  
  position: relative;
  display: inline-block;
  z-index: 1;

  background-color: #f37b83;
  background-image: linear-gradient(315deg, #f37b83 0%, #f19199 74%);
  box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5),
  7px 7px 20px 0px rgba(0,0,0,.1),
  4px 4px 5px 0px rgba(0,0,0,.1);

  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 0.5rem;
    background-color: #f19199;
    background-image: linear-gradient(315deg, #f19199 0%, #f37b83 74%);
    box-shadow:
    -7px -7px 20px 0px #fff9,
    -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002,
    4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #fff;
  }
  &:hover:after {
    top: 0;
    height: 100%;
  }
  &:active {
    top: 2px;
  }
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

  const [name, setName] = useState<string>('')
  const [hash, setHash] = useState<string>('')
  const [deleteHash, setDeleteHash] = useState<any>({
    0: false,
    1: false,
    2: false
  })

  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openFail, setOpenFail] = useState<boolean>(false)

  function getName(e: any): void {
    setName(name.trim())
    setRoom({
      ...room, name: name.trim()
    })
  }

  function addHash(): void {
    if (room.hashtags.length < 3) {
      // room에 hashtag 추가
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

  function removeHash(hashtag: string, idx: number): void {
    const hashs = room.hashtags.filter(function(data) {
      return data !== hashtag
    })
    setRoom ({
      ...room,
      hashtags: hashs,
    })

    let change = { ...deleteHash }
    for (var i = idx; i < 2; i++) {
      change[i] = change[i + 1]
    }
    change[deleteHash.length - 1] = false
    setDeleteHash(change)
  }

  async function createRoom() {
    if (room.name) {
      const data: any = {
        max: room.member,
        name: room.name,
        memberId: 1,
      }
      await room.hashtags.map((hash, idx) => (
        data[`tag${idx+1}`] = hash
      ))
      await createChat(data, setOpenSuccess, setOpenFail)
      await setRoom({
        name: null,
        hashtags: [],
        member: 2,
      })
      await setName('')
      await setHash('')
    } else {
      setOpenFail(true)
    }
  } 

  return (
    <Container>
      <BoxDiv>
        <Box>
          <Name>방제목</Name>
          <InputField variant="outlined" fullWidth
            value={name}  onChange={(e) => {
              const val = e.target.value.trim()
              if(val.length <= 10) setName(e.target.value)
            }}
            onBlur={(e) => getName(e)} 
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#f37b83"
            }}}}/>
        </Box>

        <Box>
          <Name>해시태그</Name>
          <Hashes>
            { room.hashtags.map((hashtag, idx) => (
              <HashDiv>
                <Hash onClick={() => {
                  const val = {...deleteHash}
                  val[idx] = !deleteHash[idx]
                  setDeleteHash(val)
                }}># {hashtag}</Hash>
                { deleteHash[idx] === true ? 
                  <CancelIcon onClick={() => removeHash(hashtag, idx)}/>
                  : null
                }
              </HashDiv>
            ))}
          </Hashes>
          { room.hashtags.length < 3 ? 
            <InputField variant="outlined" fullWidth
              value={hash} onChange={(e) => {
                const val = e.target.value.trim()
                if(val.length <= 8) setHash(e.target.value.trim())
              }} 
              onKeyUp={(e) => {
                if(e.key === "Enter" && hash) { 
                  addHash()
                  setHash('')
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                  borderColor: "#f37b83"
              }}}}
              />
          : null }
        </Box>

        <Box>
          <Name>최대 인원 수</Name>
          <InputField type="number" InputProps={{ inputProps: { min: 2, max: 5 } }}
            inputProps={{ inputMode: 'numeric', pattern: '[2-5]*' }}
            variant="outlined" fullWidth value={room.member}
            onChange={(e) => setRoom({...room, member: parseInt(e.target.value)})}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#f37b83"
            }}}}/>
        </Box>
      </BoxDiv>

      <Box>
        <CreateRoom 
          onClick={createRoom}
        ><span>방 만들기</span></CreateRoom>
      </Box>
      
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(!openSuccess)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="success" sx={{ width: '100%' }}>
          방 생성 성공 !
        </Alert>
      </Snackbar>

      <Snackbar open={openFail} autoHideDuration={3000} onClose={() => setOpenFail(!openFail)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="error" sx={{ width: '100%' }}>
          방 생성에 실패하였습니다 😥
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default MakeChat
