import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { TextField, Snackbar } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { createChat } from '../../store/openchatslice'
import Alert from '@mui/material/Alert'
import store from '../../store'
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

const Container = styled.div`
  width: calc(80% - 2rem);
  padding: 2rem;
  margin: 0.7rem 10%;
  height: calc(100% - 2rem - 1.4rem);
  background-color: #f5f5f5cf;
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

/** 채팅방 만들기 */
function MakeChat() {
  /** room type */
  interface Room {
    name: string | null,
    hashtags: string[],
    max: number,
  }

  const dispatch = useDispatch<typeof store.dispatch>()
  const userId = useSelector((state: initialState) => (state.login.userId))

  // 방 정보
  const [room, setRoom] = useState<Room>({
    name: null,
    hashtags: [],
    max: 2,
  })

  // 이름, 해시태그 입력값
  const [name, setName] = useState<string>('')
  const [hash, setHash] = useState<string>('')
  
  // 해시태그 삭제 버튼 표시 여부
  const [deleteHash, setDeleteHash] = useState<any>({
    0: false,
    1: false,
    2: false
  }) 

  /**
    openSuccess: 생성 성공
    openFail: 생성 실패
   */
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openFail, setOpenFail] = useState<boolean>(false)

  /** 방 제목 설정 */
  function getName(e: any): void {
    setName(name.trim())
    setRoom({
      ...room, name: name.trim()
    })
  }

  /** 해시태그 추가 */
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

  /** 해시태그 삭제 */
  function removeHash(hashtag: string, idx: number): void {
    const hashs = room.hashtags.filter(function(data) {
      return data !== hashtag
    })
    setRoom ({
      ...room,
      hashtags: hashs,
    })

    // X 아이콘 순서대로 재배치
    let change = { ...deleteHash }
    for (var i = idx; i < 2; i++) {
      change[i] = change[i + 1]
    }
    change[deleteHash.length - 1] = false
    setDeleteHash(change)
  }

  /** 방 생성 */
  async function createRoom() {
    if (room.name) {
      const data: any = {
        max: room.max,
        name: room.name,
        memberId: userId,
      }
      await room.hashtags.map((hash, idx) => (
        data[`tag${idx+1}`] = hash
      ))

      const res = await dispatch(createChat(data))
      
      if (res.type === "CREATECHAT/fulfilled" && res.payload) {
        await setOpenSuccess(true)
        await setRoom({
          name: null,
          hashtags: [],
          max: 2,
        })
        await setName('')
        await setHash('')
      } else {
        setOpenFail(true)
      }
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
            variant="outlined" fullWidth value={room.max}
            onChange={(e) => setRoom({...room, max: parseInt(e.target.value)})}
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
