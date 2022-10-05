import React, { useState } from 'react'

// MUI
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import logoicon from '../../assets/images/logo2.png'
import Snackbar from '@mui/material/Snackbar'
import styled from "styled-components"

// 페이지 이동
import { useNavigate } from 'react-router-dom'

// redux 
import { useDispatch } from "react-redux"
import { login, myinfo } from '../../store/Loginslice'
import store from '../../store'

// Image
import BackgroundImg from '../../assets/images/memberBackground.png'


// 로그 이미지
const LogoImg = styled.img`
  padding: 2rem;
  width: 15rem;
  height: auto;
  object-fit: contain;
  background-color: 'transparent';
  cursor: pointer;
`

/** 로그인 페이지 */
function Login() {

  // 페이지 이동 함수 선언
  const navigate = useNavigate()
  // redux내 함수 사용 선언
  const dispatch = useDispatch<typeof store.dispatch>()
  
  // 로그인 실패 유무 확인
  const [LoginFail, setLoginFail] = useState<boolean>(false)

  /** 로그인 버튼 클릭 시 */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const loginDto = {
      email: data.get('email'),
      password: data.get('password')
    }
    await dispatch(login(loginDto))
      .unwrap()
      .then(() => {
        dispatch(myinfo())
        navigate('/')
        }
      ).catch((e) => {
        setLoginFail(true)
      })
  }

  /** 메인으로 가기 */
  const goMain = () => {
    navigate('/')
  }
  
  return (
    <div>
      <div
        style={{
          height: '100vh',
          backgroundImage: `url(${BackgroundImg})`,
        }}
      >
        <Container 
          component="main" 
          maxWidth="xs"
          sx = {{
            padding: '3.5rem',
            height: '100vh',
            display: 'flex',
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
              padding: 3,
              paddingBottom: '3rem',
              opacity: 0.9,
            }}
          >
            <LogoImg
            src={logoicon}
            alt="Logo"
            onClick={goMain}
            />
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              noValidate sx={{ 
                mt: 1
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일을 입력해주세요."
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호를 입력해주세요."
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Button
                fullWidth
                href='/signup'
                variant="contained"
                color="error"
                sx={{ mt: 1, mb: 3 }}
              >
                회원가입
              </Button>
              <Grid 
                container
                justifyContent="center"
                sx={{mt:2, mb:2}}
              >
                <Grid 
                  item xs
                  >
                  <Link 
                    href="/pwd" 
                    variant="body2">
                    비밀번호를 잊으셨나요?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
      <Snackbar 
        open={LoginFail} 
        autoHideDuration={3000}
        onClose={() => setLoginFail(!LoginFail)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="error" sx={{ width: '100%' }}>
          로그인에 실패하였습니다 😥
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
