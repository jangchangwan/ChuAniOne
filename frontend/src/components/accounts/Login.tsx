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
// 하위 컴포넌트
import GoogleLogin from './GoogleLogin'
import KakaoLogin from './KakaoLogin'

// redux 
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { login, myinfo } from '../../store/Loginslice'
import store from '../../store'
// 화면전환 애니메이션
// import { motion } from 'framer-motion'
import BackgroundImg from '../../assets/images/memberBackground.png'

import styled from "styled-components"
const LogoImg = styled.img`
  width: 10rem;
  height: auto;
  object-fit: contain;
  background-color: 'transparent';
`

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [LoginFail, setLoginFail] = useState<boolean>(false)

  // 로그인
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginDto = {
      email: data.get('email'),
      password: data.get('password')
    }
    console.log(loginDto)
    await dispatch(login(loginDto))
      .unwrap()
      .then(() => {
        dispatch(myinfo())
        navigate('/')
        }
      ).catch((e) => {
        setLoginFail(true)
      })
  };

  // 홈으로 가기
  const goMain = () => {
    navigate('/')
  }
  
  return (
    // <motion.div
    // >
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
            padding: '3.5rem'
          }}
          >
          <CssBaseline />
          <Box
            boxShadow={2}
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              border: 1,
              borderRadius: '1rem',
              padding: 3,
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
                    비밀번호 찾기
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={3}>
                  <GoogleLogin></GoogleLogin>
                </Grid>
                <Grid item xs={3}>
                  <KakaoLogin></KakaoLogin>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Container>
      </div>
      <Snackbar open={LoginFail} autoHideDuration={3000} onClose={() => setLoginFail(!LoginFail)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="error" sx={{ width: '100%' }}>
          로그인에 실패하였습니다 😥
        </Alert>
      </Snackbar>
    </div>
    // </motion.div>
  );
}

export default Login;
