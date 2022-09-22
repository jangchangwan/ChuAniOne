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


import styled from 'styled-components'
// redux
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { signup, nicknameCheck, emailCheck } from '../../store/Loginslice'
import store from '../../store'

// 화면전환 애니메이션
// import { motion } from 'framer-motion';


const ErrorText = styled.span`
  width: 100%;
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`
const SuccessText = styled.span`
  width: 100%;
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 1rem;
`

function Signup() {
  // 필드 유효성검사
  const [emailValid, setEmailValid] = useState(true)
  const [nicknameValid, setNicknameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)

  // // 비밀번호 재확인 변수
  const [checkedPwd, setCheckedPwd] = useState(true)

  // 닉네임, 이메일 중복체크
  // t: 사용가능, f: 사용불가능
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] = useState(false)
  const [isDuplicateEmailChecked, setisDuplicateEmailChecked] = useState(false)

  // //필드 값 입력
  const [userEmail, setUserEmail] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [userGender, setUserGender] = useState('')
  const [userBirthday, setUserBirthday] = useState('')
  
  // 디플트 에러 메세지 방지
  const [defaultEmail, setDefaultEmail] = useState(false)
  const [defaultPwd, setDefaultPwd] = useState(false)
  const [defaultPwd2, setDefaultPwd2] = useState(false)
  const [defaultNickname, setDefaultNickname] = useState(false)

  const [confirmNickname, setConfirmNickname] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()

  // 유효성
  // 닉네임 유효성 1~10자
  const validateNickName = (e:any) => {
    if (e.target.value) {
      setDefaultNickname(true)
    } else {
      setDefaultNickname(false)
    }

    let regexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/
    if (
      regexp.test(e.target.value) &&
      e.target.value.length <= 10 &&
      e.target.value.length >= 2
    ){
      setNicknameValid(true)
    }
    else {
      setNicknameValid(false)
    } 
  }
  // 이메일 유효성 1 ~30자
  const validateEmail = (e:any) => {
    // ^ 시작일치, $ 끝 일치
    // {2, 3} 2개 ~ 3개
    // * 0회 이상, + 1회 이상
    // [-_.] - 또는 _ 또는 .
    // ? 없거나 1회
    if (e.target.value) {
      setDefaultEmail(true)
    } else {
      setDefaultEmail(false)
    }

    let regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (regexp.test(e.target.value)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    } 
  }
  // 비밀번호 유효성
  const validatePwd = (e:any) => {
    let patternEngAtListOne = new RegExp(/[a-zA-Z]+/) // + for at least one
    let patternSpeAtListOne = new RegExp(/[~!@#$%^]+/) // + for at least one
    let patternNumAtListOne = new RegExp(/[0-9]+/) // + for at least one

    if (e.target.value) {
      setDefaultPwd(true)
    } else {
      setDefaultPwd(false)
    }

    if (
      patternEngAtListOne.test(e.target.value) &&
      patternSpeAtListOne.test(e.target.value) &&
      patternNumAtListOne.test(e.target.value) &&
      e.target.value.length >= 8 &&
      e.target.value.length <= 15
    ) {
      setPwdValid(true)
      console.log(pwdValid)
    } else {
      setPwdValid(false)
      console.log(pwdValid)
    }
  }
  // 회원가입
  const SignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signupDto = {
      birthday: data.get('userBirthday'),
      email: data.get('userEmail'),
      gender: data.get('gender'),
      nickname: data.get('userNickname'),
      password: data.get('userPassword'),
      introduction: "오소이!",
      
    }
    console.log(signupDto);
    
    dispatch(signup(signupDto))
      .then((res) => {
        console.log(res.type)
        if (res.type === 'SIGNUP/rejected'){
          console.log("실패")
          console.log(res)
          alert("입력하신 정보를 한번 더 확인해주세요.")
        } else {
          console.log('성공')
          navigate('/EmailCertification')
        }
      })
  }

  // 이메일 중복체크
  const isDuplicateEmail = () => {
    dispatch(emailCheck(userEmail))
      .then((res) => {
        const data:any = res.payload
        if (data) {
          if (data.data === false){
            setisDuplicateEmailChecked(true)
          }
        }
    })
  }

  // 닉네임 중복체크
  const isDuplicateNickname = () => {
    console.log(userNickname);
    
    dispatch(nicknameCheck(userNickname))
      .unwrap()
      .then((res) => {
        console.log(res.data);
        if (res.data === false){
          setisDuplicateNicknameChecked(true)
        } else {
          setConfirmNickname(true)
        }
    })
  }
  
  // 비밀번호 재확인
  const samePassword = (e:any) => {

    if (e.target.value) {
      setDefaultPwd2(true)
    } else {
      setDefaultPwd2(false)
    }

    if (
      userPassword === userPassword2
    ) {
      setCheckedPwd(true)
    } else {
      setCheckedPwd(false)
    }
  }
  // 성별
  const changeGender = (e:any) => {
    setUserGender(e.target.value)
  }

  let btnDisabled = true
  if (
    pwdValid && // 비밀번호 유효성
    isDuplicateNicknameChecked && // 닉네임 중복
    isDuplicateEmailChecked &&// 이메일 중복
    checkedPwd && // 비밀번호체크
    nicknameValid && // 닉네임 유효성
    emailValid && // 이름 유효성
    userBirthday && // 생일 입력
    userGender  // 성별 체크
  ) { btnDisabled = false }

  return (
    <div style={{
        height: '100vh',
        backgroundImage: `url(${BackgroundImg})`,
      }}>
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
              name="userNickname"
              label="닉네임를 입력해주세요."
              id="userNickname"
              autoComplete="userNickname"
              onBlur={(e) => {validateNickName(e)}}
              onChange={(e) => {
                setUserNickname(e.target.value)
                if (isDuplicateNicknameChecked) { setisDuplicateNicknameChecked(false) }
              }}
              autoFocus
              value={userNickname}
            />
            </Grid>
            <Grid item xs={4}>
              <Button
                type='button'
                fullWidth
                variant="contained"
                onClick={isDuplicateNickname}
                sx={{
                  top: '1.5rem'
                }}
              >중복 체크</Button>
            </Grid>
          </Grid>
          {defaultNickname && !nicknameValid ? (
          <ErrorText>유효하지 않은 닉네임입니다</ErrorText>) : null}
          {defaultNickname && nicknameValid && !isDuplicateNicknameChecked && confirmNickname ? (
          <ErrorText>이미 존재하는 닉네임입니다</ErrorText>) : null}
          {defaultNickname && nicknameValid && isDuplicateNicknameChecked ? <SuccessText>사용가능한 닉네임입니다</SuccessText> : null}
          {/* 이메일 */}
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userEmail"
                label="이메일을 입력해주세요."
                onBlur={validateEmail}
                name="userEmail"
                autoComplete="userEmail"
                onChange={(e) => {
                  setUserEmail(e.target.value)
                  if (isDuplicateEmailChecked) { setisDuplicateEmailChecked(false) }
                }}
                autoFocus
                value={userEmail}
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                type='button'
                fullWidth
                variant="contained"
                onClick={isDuplicateEmail}
                sx={{
                  top: '1.5rem'
                }}
              >중복 체크</Button>
            </Grid>
          </Grid>
          {defaultEmail && !emailValid ? (
          <ErrorText>유효하지 않은 이메일입니다.</ErrorText>) : null}
          {defaultEmail && !isDuplicateEmailChecked && emailValid ? (
          <ErrorText>이미 존재하는 이메일입니다</ErrorText>) : null}
          {emailValid && isDuplicateEmailChecked ? <SuccessText>사용가능한 이메일입니다</SuccessText> : null}
          <TextField
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="비밀번호를 입력해주세요."
            type="password"
            id="userPassword"
            onBlur={validatePwd}
            autoComplete="current-password"
            onChange={(e) => {
              setUserPassword(e.target.value)
            }}
            value={userPassword}
          />
          {defaultPwd && !pwdValid ? (
          <ErrorText>유효하지 않은 비밀번호입니다</ErrorText>) : null}
          {defaultPwd && pwdValid ? (
          <SuccessText>사용가능한 비밀번호입니다</SuccessText>) : null}
          <TextField
            margin="normal"
            required
            fullWidth
            name="userPassword2"
            label="비밀번호를 재입력해주세요."
            type="password"
            id="userPassword2"
            autoComplete="current-password"
            onBlur={samePassword}
            onChange={(e) => {
              setUserPassword2(e.target.value)
            }}
            value={userPassword2}
          />
          {defaultPwd2 && !checkedPwd ? 
          <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> : null}
          {defaultPwd2 && checkedPwd ? 
          <SuccessText>비밀번호가 일치합니다</SuccessText> : null}

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
              <FormControlLabel 
                value="MALE" 
                control={<Radio />} 
                label="남성" 
                onChange={changeGender}
                checked={userGender ==="MALE"}
              />
              <FormControlLabel 
                value="FEMALE" 
                control={<Radio />} 
                label="여성" 
                onChange={changeGender}
                checked={userGender ==="FEMALE"}
              />
            </RadioGroup>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                disabled={btnDisabled}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                회원가입
              </Button>
        </Box>
      </Box>
      </Container>
      
    
    </div>
  );
}

export default Signup;
