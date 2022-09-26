import React, { useEffect, useState } from 'react'
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
import ClearIcon from '@mui/icons-material/Clear'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'

// Modal
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

// redux
import { useDispatch, useSelector } from 'react-redux'
import store from '../../store'
import initialState from '../../store/Loginslice'
import { leaveRoom, getChatInfo, updateChat } from '../../store/openchatslice'

const Container = styled.div`
  width: calc(100% - 2rem);
  height: calc(10% - 1rem);
  padding: 0.5rem 1rem;
  background-color: #f37b83;
  border-radius: 1rem 1rem 0 0;

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

const InfoContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  background-color: white;
  padding: 1rem 1rem 2rem 1rem;
  /* height: 60%; */
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InfoHeader = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  border-bottom: 3px solid #B1B2FF;
`

const InfoTitle = styled.h1`
  padding: 0 1rem;
  
`

const CloseBtnDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 70%;
`

const CloseBtn = styled(IconButton)`
`

const ModalCloseIcon = styled(ClearIcon)`
`

const InfoContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
const InfoContentHash = styled.p`
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  color: #999bf8;
  margin: 0 0.5rem;
`

const InfoContentTitle = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
  margin-top: 0.8rem;
  border-radius: 1rem 1rem 0 0;
  border-bottom: 2px solid #B1B2FF; 
  padding: 0.5em; 
  background: #EEF1FF;
`

const InfoContent = styled.p`
`

const InfoUserBox = styled.div`
  padding: 0.5rem 1rem;
  /* background-color: #EEF1FF; */
  border: 2px dashed #B1B2FF;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const UserInfo = styled.p`
  margin-left: 0.2rem;
  margin-right: 0.2rem;
`

const BtnBox = styled.div`
  display: flex;
  align-items: center;
`

const Btn = styled(Button)`
  margin-top: 2rem !important;
  font-size: 1.2rem !important;
  color: #999bf8 !important;
`

const LeaveBtn = styled(Button)`
  color: #999bf8 !important;
`


const UpdateContainer = styled.div`
  width: 100%;;
  height: 100%;
  margin: 0;
`

const NameInput = styled(TextField)`
  margin-bottom: 1rem !important;
`



function UpdateModal({ openedRoom, roomInfo, getChangeInfo }) {
  const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => (state.login.userId))
  
  const [changeInfo, setChangeInfo] = useState<any>({
    max: roomInfo.rDto.max,
    memberId: roomInfo.rDto.memberId,
    name: roomInfo.rDto.name,
    tag1: roomInfo.rDto.tag1,
    tag2: roomInfo.rDto.tag2,
    tag3: roomInfo.rDto.tag3,
  })
  const [name, setName] = useState<string>(roomInfo.rDto.name)
  const [tag1, setTag1] = useState<string>(roomInfo.rDto.tag1)
  const [tag2, setTag2] = useState<string>(roomInfo.rDto.tag2)
  const [tag3, setTag3] = useState<string>(roomInfo.rDto.tag3)

  const [openUpdate, setOpenUpdate] = useState(false)
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openFail, setOpenFail] = useState<boolean>(false)

  // Update Modal On/Off
  const openUpdateTrue = () => {
    setOpenUpdate(true)
  }

  const openUpdateFalse = () => {
    setOpenUpdate(false)
  }

  // 수정 요청하기
  async function reviseRequest() {
    const res = await dispatch(updateChat({
      ...changeInfo,
      id: roomInfo.rDto.id,
      name, tag1, tag2, tag3
    }))

    if (res) {
      setOpenSuccess(true)
      openUpdateFalse()
    } else {
      setOpenFail(true)
    }

    getChangeInfo()
  }

  const changeName = () => {
    if (changeInfo.name !== name && name.trim()) {
      setChangeInfo({ ...changeInfo, name: name.trim() })
    }
  }


  return (
    <UpdateContainer>
      <Btn onClick={openUpdateTrue}>수정</Btn>

      <Modal
        open={openUpdate}
        onClose={openUpdateFalse}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <InfoContainer>
          <InfoHeader>
            <InfoTitle>방 정보 수정</InfoTitle>
            <CloseBtnDiv>
              <CloseBtn onClick={openUpdateFalse}><ModalCloseIcon/></CloseBtn>
            </CloseBtnDiv>
          </InfoHeader>

          <NameInput id="outlined-basic" label="방이름" variant="outlined"
            placeholder={roomInfo.rDto.name}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#999bf8",
              }},
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#999bf8"
              }
            }}
            value={name}
            onChange={(e) => {
              if (e.target.value.trim().length <= 10) {
                setName(e.target.value)
              }
            }}
            onBlur={() => {
              setName(name.trim())
              changeName()
            }}
          />
      
          <NameInput id="outlined-basic" label="해시태그 1" variant="outlined"
            placeholder={roomInfo.rDto.tag1}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#999bf8",
              }},
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#999bf8"
              }
            }}
            value={tag1}
            onChange={(e) => {
              if (e.target.value.trim().length <= 8) {
                setTag1(e.target.value.trim())
              }
            }}
          />

          <NameInput id="outlined-basic" label="해시태그 2" variant="outlined"
            placeholder={roomInfo.rDto.tag2}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#999bf8",
              }},
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#999bf8"
              }
            }}
            value={tag2}
            onChange={(e) => {
              if (e.target.value.trim().length <= 8) {
                setTag2(e.target.value.trim())
              }
            }}
          />

          <NameInput id="outlined-basic" label="해시태그 3" variant="outlined"
            placeholder={roomInfo.rDto.tag3}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#999bf8",
              }},
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#999bf8"
              }
            }}
            value={tag3}
            onChange={(e) => {
              if (e.target.value.trim().length <= 8) {
                setTag3(e.target.value.trim())
              }
            }}
          />

          { roomInfo.rDto.memberId === userId ? 
            <InfoContentBox>
              <Btn onClick={reviseRequest}>저장</Btn>
            </InfoContentBox>
          : null }
        </InfoContainer>


      </Modal>

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(!openSuccess)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
        <Alert severity="success" sx={{ width: '100%' }}>
          방 정보가 성공적으로 수정되었습니다 😊
        </Alert>
      </Snackbar>

      <Snackbar open={openFail} autoHideDuration={3000} onClose={() => setOpenFail(!openFail)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
      <Alert severity="error" sx={{ width: '100%' }}>
        방 정보 수정에 실패했습니다 😥<br/> 다시 시도해주세요 !
      </Alert>
    </Snackbar>
    </UpdateContainer>
  )
}



function ChatHeader({ opened, openedRoom, handleOpened, handleClosed }: any) {

  const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => (state.login.userId))

  // 방정보 Modal
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [roomInfo, setRoomInfo] = useState<any>(null)
  const [changeInfo, setChangeInfo] = useState<boolean>(false)

  // 퇴장 Confirm
  const [leaveConfirm, setLeaveConfirm] = useState<boolean>(false)

  // 더보기
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // 더보기: Modal
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // 방정보 Modal 
  const openInfoTrue = () => {
    setOpenInfo(true)
  }

  const openInfoFalse = () => {
    setOpenInfo(false)
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

  const getChangeInfo = () => {
    setChangeInfo(!changeInfo)
  }
  
  // 방 정보 가져오기
  async function getInfo() {
    const res = await dispatch(getChatInfo(openedRoom.id))
    
    if (res.meta.requestStatus === "fulfilled" && res.payload) {
      await setRoomInfo(res.payload)
    }
  }

  useEffect(() => {
    getInfo()
  }, [changeInfo])

  useEffect(() => {
    getInfo()
  }, [])
  


  return (
    <>
      { openedRoom ?
        <Container>
          {/* 방이름, 뒤로가기 */}
          <NameBox>
            <BackIcon 
              onClick={closeChat}
            />
            { roomInfo ?
              <Name>
                {roomInfo.rDto.name}
              </Name>
              : null
            }
          </NameBox>

          {/* 더보기 메뉴 */}
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
            <MenuItem onClick={() => {
              openInfoTrue()
              handleClose()
            }}>방 정보</MenuItem>
            
            <MenuItem onClick={() => {
              handleClose()
              closeChat()
              }}>닫기</MenuItem>

            <MenuItem onClick={() => {
              handleClose()
              openConfirm() 
              }}>퇴장하기</MenuItem>
          </Menu>
          
          {/* 방 정보 Modal */}
          { roomInfo ?
            <Modal
              open={openInfo}
              onClose={openInfoFalse}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <InfoContainer>
                <InfoHeader>
                  <InfoTitle>{roomInfo.rDto.name}</InfoTitle>
                  <CloseBtnDiv>
                    <CloseBtn onClick={openInfoFalse}><ModalCloseIcon/></CloseBtn>
                  </CloseBtnDiv>
                </InfoHeader>
                <InfoContentBox>
                  { roomInfo.rDto.tag1 ? <InfoContentHash># {roomInfo.rDto.tag1}</InfoContentHash> : null }
                  { roomInfo.rDto.tag2 ? <InfoContentHash># {roomInfo.rDto.tag2}</InfoContentHash> : null }
                  { roomInfo.rDto.tag3 ? <InfoContentHash># {roomInfo.rDto.tag3}</InfoContentHash> : null }
                </InfoContentBox>

                  <InfoContentTitle>현재 인원 / 전체 인원 </InfoContentTitle>
                  <InfoContent>{ roomInfo.mDto.length } / { roomInfo.rDto.max }</InfoContent>
                
                <InfoUserBox>
                  { roomInfo.mDto.map((user, idx) => (
                    <UserInfo>{user.nickname}</UserInfo>
                  ))}
                </InfoUserBox>
                { roomInfo.rDto.memberId === userId ? 
                  <BtnBox>
                    <UpdateModal openedRoom={openedRoom} roomInfo={roomInfo} getChangeInfo={getChangeInfo}/>
                    <Btn onClick={openConfirm}>삭제</Btn>
                  </BtnBox>
                : null }
              </InfoContainer>
            </Modal>
          : null }

          {/* 퇴장하기 Modal */}
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
              <LeaveBtn onClick={leave}>떠나기</LeaveBtn>
              <LeaveBtn onClick={closeConfirm} autoFocus>머무르기</LeaveBtn>
            </DialogActions>
          </Dialog>
        </Container>
      : null }
    </>
  )
}

export default ChatHeader