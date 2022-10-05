import React, { useState } from 'react'

// MUI
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import BackgroundImg from '../../assets/images/memberBackground.png'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// 페이지이동
import { useNavigate } from 'react-router-dom'

// redux 
import { useDispatch } from "react-redux"
import { findPWD } from '../../store/Loginslice'
import store from '../../store'

/** 비밀번호 찾기 페이지 */
function PasswordFind() {
  
  // 페이지 이동 함수 선언
  const navigate = useNavigate()
  // redux내 함수 사용 선언
  const dispatch = useDispatch<typeof store.dispatch>()

  // 비밀번호 찾기 실패
  const [changeFail, setchangeFail] = useState<boolean>(false)
  
  // 유저 정보 변수
  const [userEmail, setUserEmail] = useState('')
  const [userBirthday, setUserBirthday] = useState('')


  /** 비밀번호 찾기 */
  const findPwd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userDto = {
      email: userEmail,
      birthday: userBirthday
    }
    await dispatch(findPWD(userDto))
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch(() =>{
        setchangeFail(true)
      })
  }
  /** 뒤로가기 */
  const moveback = () => {
    navigate(-1)
  }
  return (
    <div style={{
        height: '100vh',
        backgroundImage: `url(${BackgroundImg})`,
      }}>
      <Container 
        component="main" 
        maxWidth="xs"
        sx = {{
          padding: '5.5rem',
          position:'relative',
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        <Box
          boxShadow={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            border: 1,
            borderRadius: '1rem',
            padding: 4,
            paddingTop: 0,
            opacity: 0.9,
          }}
        >
          <IconButton
            onClick={moveback}
            sx={{
              position: 'relative',
              top: '2.6rem',
              left: '-9.5rem',
              
            }}
          >
            <ArrowBackIcon
              sx={{
                fontSize: '2rem',
                fontWeight: '700'
              }}
            />
          </IconButton>
          <Typography component="h1" variant="h5">
            비밀번호 찾기
          </Typography>
          <Box 
            component="form" 
            onSubmit={findPwd} 
            noValidate sx={{ 
              mt: 1
            }}
          >

            <TextField
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="이메일을 입력해주세요."
              name="userEmail"
              autoComplete="userEmail"
              onChange={(e) => {
                setUserEmail(e.target.value)
              }}
              autoFocus
              value={userEmail}
            />
            <TextField
              margin="normal"
              type="date"
              required
              fullWidth
              name="userBirthday"
              label="생일을 입력해주세요."
              id="userBirthday"
              autoComplete="userBirthday"
              defaultValue={"2022-10-07"}
              onChange={(e) => {
                setUserBirthday(e.target.value)
              }}
              />

            
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 1, mb: 3 }}
            >
              비밀번호 변경
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar open={changeFail} autoHideDuration={3000} onClose={() => setchangeFail(!changeFail)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
      <Alert severity="error" sx={{ width: '100%' }}>
        메일전송에 실패하였습니다 😥
      </Alert>
    </Snackbar>
    </div>

  )
}

export default PasswordFind
