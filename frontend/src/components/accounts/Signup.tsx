import React, { useState } from 'react'

// CSS 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BackgroundImg from '../../assets/images/memberBackground.png'
// redux
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { signup } from '../../store/Loginslice'
import store from '../../store'

// 화면전환 애니메이션
import { motion } from 'framer-motion';


function Signup() {

  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()

  const [emailState, setEmailState] = useState<boolean>(false)


  // 회원가입
  const SignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signupDto = {
      email: data.get('email'),
      password: data.get('password'),
      gender: data.get('gender'),
      birthday: data.get('birthday'),
      nickname: data.get('nickname')
    }
    dispatch(signup(signupDto))
      .then((res) => {
        console.log(res.type)
        if (res.type === 'SIGNUP/rejected'){
          console.log("실패")
          
        } else {
          console.log('성공')
          navigate('/login')
        }
      })
  }
  // 이메일인증
  const EmailConfirm = () => {
    setEmailState(true)
    console.log("이메일 인증")
  }
  // 이메일인증번호
  const EmailConfirmCheck = () => {
    console.log("이메일 인증번호 체크");
    
  }
  // 닉네임 중복체크
  const nicknameConfirm = () => {
    console.log("닉네임 수정");
    
  }
  

  return (
    <motion.div
      style={{
        height: '100vh',
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      
      <Container
        component="main" 
        maxWidth="xs"
        sx = {{
          padding: '3rem',
          
        }}
        >
        <Box
          boxShadow={2}
          sx={{
            display: 'flex',
            marginTop: 8,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            border: 1,
            borderRadius: '1rem',
            backgroundColor: 'white',
            opacity: 0.9,
          }}
        >
        <Typography component="h1" variant="h5">
              회원가입
        </Typography>
        <Box 
          component="form" 
          onSubmit={SignUpSubmit} 
          noValidate sx={{ 
            mt: 1
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
              margin="normal"
              required
              fullWidth
              name="nickname"
              label="닉네임를 입력해주세요."
              id="nickname"
              autoComplete="nickname"
            />
            </Grid>
            <Grid item xs={4}>
              <Button
                type='button'
                fullWidth
                variant="contained"
                onClick={nicknameConfirm}
                sx={{
                  top: '1.5rem'
                }}
              >중복 체크</Button>
            </Grid>
          </Grid>
          
          <Grid container spacing={1}>
            <Grid item xs={8}>
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
            </Grid>

            <Grid item xs={4}>
              <Button
                type='button'
                fullWidth
                variant="contained"
                onClick={EmailConfirm}
                sx={{
                  top: '1.5rem'
                }}
              >번호 전송</Button>
            </Grid>
          </Grid>
          {
            emailState
            ? <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailcheck"
                label="인증번호을 입력해주세요."
                name="emailcheck"
                autoComplete="emailcheck"
                autoFocus
              />
            </Grid>

            <Grid 
              item xs={4}
              >
              <Button
                type='button'
                fullWidth
                variant="contained"
                onClick={EmailConfirmCheck}
                sx={{
                  top: '1.5rem'
                }}
              >인증 확인</Button>
            </Grid>
          </Grid> : null
          }
          
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

          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="비밀번호를 재입력해주세요."
            type="password"
            id="password2"
            autoComplete="current-password"
          />
          

            <TextField
            margin="normal"
            required
            fullWidth
            name="birthday"
            label="생일을 입력해주세요."
            id="birthday"
            autoComplete="birthday"
            />
            <FormControl
              sx={{ mt: 1, mb: 1, pl: 1 }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
              <RadioGroup
                aria-required
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
              >
                <FormControlLabel value="MALE" control={<Radio />} label="남성" />
                <FormControlLabel value="FEMALE" control={<Radio />} label="여성" />
              </RadioGroup>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                회원가입
              </Button>
        </Box>
      </Box>
      </Container>
      
    </motion.div>
  );
}

export default Signup;
