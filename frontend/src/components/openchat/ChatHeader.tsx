import React, { useState } from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Menu, MenuItem, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// redux
import { useDispatch, useSelector } from 'react-redux'
import store from '../../store'
import initialState from '../../store/Loginslice'
import { leaveRoom } from '../../store/openchatslice'

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
  const userId = useSelector((state: initialState) => (state.login.userId))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [leaveConfirm, setLeaveConfirm] = useState<boolean>(false)
  const open = Boolean(anchorEl)

  // 더보기: Modal
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // 채팅방 닫기
  const closeChat = () => {
    handleClosed()
  }

  // 채팅방 퇴장하기: Confirm Modal
  const openConfirm = () => {
    setLeaveConfirm(true)
  }

  const closeConfirm = () => {
    setLeaveConfirm(false)
  }

  // 채팅방 퇴장
  const leave = () => {
    dispatch(leaveRoom(openedRoom.id))
    closeConfirm()
    handleClosed()
  }
  
  return (
    <>
      { openedRoom ?
        <Container>
          <NameBox>
            <BackIcon 
              onClick={closeChat}
            />
            <Name>
              {openedRoom.name}
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
              openConfirm() 
              }}>퇴장하기</MenuItem>
          </Menu>

          <Dialog
            open={leaveConfirm}
            onClose={closeConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"정말 떠나시겠습니까?"}
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                { openedRoom.memberId !== userId ? 
                  <>
                    방을 떠날 경우, 내 채팅목록에서 삭제됩니다.
                  </>
                : 
                  <>
                    당신은 방장입니다. <br/>
                    방을 떠날 경우, 현재 계신 채팅방은 삭제됩니다.
                  </>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={leave}>떠나기</Button>
              <Button onClick={closeConfirm} autoFocus>머무르기</Button>
            </DialogActions>
          </Dialog>
        </Container>
      : null }
    </>
  )
}

export default ChatHeader