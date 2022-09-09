import React from 'react'
import styled from 'styled-components'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import IconSend from '@mui/icons-material/Send'
import IconClip from '@mui/icons-material/Attachment'
import IconPhoto from '@mui/icons-material/AddPhotoAlternate'


const Container = styled.div`
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

const ClipIcon = styled(IconPhoto)`
  color: #f37b83;
`

const SendIcon = styled(IconSend)`
  color: #f37b83;
`


function SendChat() {
  return (
    <Container>
      <SendInput fullWidth
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
            borderColor: "#f37b83"
        }}}}
      />
      <ImgDiv>
        <IconBtn><ClipIcon/></IconBtn>
      </ImgDiv>
      <SendDiv>
        <IconBtn><SendIcon/></IconBtn>
      </SendDiv>
    </Container>
  )
}

export default SendChat
