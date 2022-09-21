import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Menu, MenuItem, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// redux
import { useDispatch, useSelector } from 'react-redux'
import store from '../../store'
import initialState from '../../store/openchatslice'

const Container = styled.div`
  width: calc(100% - 2rem);
  height: calc(10% - 1rem);
  padding: 0.5rem 1rem;
  background-color: #f37b83;
  border-radius: 1.8rem 1.8rem 0 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NameBox = styled.div`
  display: flex;
  align-items: center;
`

const BackIcon = styled(ArrowBackIcon)`
  height: 100%;
  color: #333333;
  margin-right: 0.5rem;
`

const Name = styled.h3`
  color: #333333;
`

const IconBox = styled(IconButton)`
  height: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: row-reverse;
`

const Icon = styled(MoreVertIcon)`
  width: 70% !important;
  height: 100% !important;
  color: #333333;
`

function ChatHeader({ opened, openedRoom, handleOpened, handleClosed }: any) {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const chatRoom = useSelector((state: initialState) => state.openchat.chatRoom)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const closeChat = () => {
    handleClosed()
  }
  
  return (
    <>
      { chatRoom ?
        <Container>
          <NameBox>
            <BackIcon 
              onClick={closeChat}
            />
            <Name>
              {chatRoom.name}
            </Name>
          </NameBox>

          <IconBox
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Icon />
          </IconBox>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>방 정보</MenuItem>
            
            <MenuItem onClick={() => {
              handleClose()
              closeChat()
              }}>닫기</MenuItem>

            <MenuItem onClick={() => {
              handleClose()
              closeChat()
              }}>퇴장하기</MenuItem>
          </Menu>
        </Container>
      : null }
    </>
  )
}

export default ChatHeader