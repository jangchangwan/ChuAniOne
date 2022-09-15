import * as React from 'react'
// MUI
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'



// 하위 컴포넌트
import GoogleLogin from './GoogleLogin'
import KakaoLogin from './KakaoLogin'

// redux 
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { login } from './Loginslice'
// 화면전환 애니메이션
import { motion } from 'framer-motion'
import store from '../../store'

const theme = createTheme()

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginDto = {
      email: data.get('email'),
      password: data.get('password')
    }
    dispatch(login(loginDto))
      .unwrap()
      .then(() =>
        navigate('/')
      )
    console.log(loginDto);
    
  };

  return (
    <motion.div
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      exit = {{opacity:0}}
      transition = {{ duration: 0.5}}
    >
      <ThemeProvider theme={theme}>
        <Container 
          component="main" 
          maxWidth="xs"
          sx = {{
            padding: '3rem'
          }}
          >
          <CssBaseline />
          <Box
            boxShadow={2}
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              border: 1,
              borderRadius: '1rem',
              padding: 3,
            }}
          >

            <Typography component="h1" variant="h5">
              Login
            </Typography>
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
      </ThemeProvider>
    </motion.div>
  );
}

export default Login;
