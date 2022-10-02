import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyAniChart   from "./MyAniChart";


import { useDispatch } from "react-redux"
import { myinfo, nicknameCheck, changeUserInfo } from '../../store/Loginslice'
import store from '../../store'
// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// 프로필 사진, 닉네임, 경험치 관련
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// 프로필 사진
const ProfileImg = styled.img`
  margin: 0 1rem 0 0;
  width: 4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center; 
  align-items: center;
`

// 레벨, 닉네임, 경험치 관련
const ProfileContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

// 레벨과 닉네임
const ProfileContainerLv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 1.5rem;
  /* margin: 0 0 1rem 0; */
`

// 경험치 바 위의 텍스트 박스
const ProfileContainerExpTextBox = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: end;
  width: 100%;
  /* height: 1rem; */
  margin-bottom: 0.5rem;
`

// 텍스트 박스 안의 왼쪽, 오른쪽 텍스트
const ProfileContainerExpText = styled.div`
  height: 1rem;
  font-size: 0.8rem;
`

// 경험치 바 밖
const ProfileContainerExpOut = styled.div`
  border: solid 1px;
  width: 100%;
  height: 1rem;
  border-radius: 10px 10px 10px 10px;
  border-color: #f37b83;
`

// 경험치 바 안
const ProfileContainerExpIn = styled.div`
  height: 1rem;
  border-radius: 10px 10px 10px 10px;
  background-color: #f37b83; 
`

// 소개
const IntroductonBox = styled.div`
  margin: 2rem 0 2rem 0;
`


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

const ChartDiv = styled.div`
  margin-top: 10rem;
`

function MyLeft() {
  const dispatch = useDispatch<typeof store.dispatch>()


  // 개인정보수정 모달 열고 닫기
  const [open, setOpen] = React.useState(false);
  
  // 회원 정보
  const [nickName, setNickName] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')
  const [exp, setExp] = useState(0)
  const [mygenres, setMygenres] = useState()
  // 유효성검사
  const [nicknameValid, setNicknameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)

  // 디폴트 에러 메세지 방지
  const [defaultPwd, setDefaultPwd] = useState(false)
  const [defaultNickname, setDefaultNickname] = useState(false)
  const [confirmNickname, setConfirmNickname] = useState(false)
  
  // 닉네임 중복체크
  // t: 사용가능, f: 사용불가능
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] = useState(false)

  const tier:any = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
  const mytier:string = tier[Math.floor(exp/100)]  // 소수점 버림
  const myexp:number = exp%100



  // 비밀번호 유효성 검사
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
    } else {
      setPwdValid(false)
    }
  }
  // 닉네임 유효성 검사
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
  // 닉네임 중복체크
  const isDuplicateNickname = () => {
    console.log(nickName);
    
    dispatch(nicknameCheck(nickName))
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
  
  // 개인정보수정 창열기
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 개인정보수정 창닫기
  const handleClose = () => {
    setOpen(false);
  };

  // 개인정보수정
  const changeInfo = (event:any) => {
    const changeDto = {
      introduction: introduction,
      nickname: nickName,
      password: password,
      profile: profileImg,
      id: userId,
    }
    
    dispatch(changeUserInfo(changeDto))
    
    setOpen(false)
  }

  // 회원정보 받아오기
  useEffect(() => {
    dispatch(myinfo())
      .then((response:any) => {
        const data = response.payload.data
        setMygenres(data.genres)
        setNickName(data.member.nickname)
        setIntroduction(data.member.introduction)
        setUserId(data.member.memberId)
        setExp(data.exp)
      }).catch((e) => {
        console.log(e);
        
      })
  },[])

  return (
    <div
      style={{
        paddingTop: '3rem'
      }}
    >
      {/* 프로필사진, 경험치, 닉네임, 소개, 벳지 가져오기 */}
      <ProfileContainer>
        {
          profileImg ?
          <ProfileImg src={profileImg} alt="프로필사진"></ProfileImg>
          :
          <AccountCircleIcon 
            sx={{
            fontSize: '4rem',
            margin: `0 1rem 0 0`,
            width: `4rem`,
            display: `flex`,
            justifyContent: `center`, 
            alignItems: `center`}}/>
        }
        
        <ProfileContainerBox>
          <ProfileContainerLv>
              <p style={{ margin : '0'}}>{mytier}({myexp})  {nickName}</p>
            <MoreVertIcon
              type='button'
              onClick={handleClickOpen}
              sx={{ paddingTop: '2px',}}
            ></MoreVertIcon>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>회원정보 변경</DialogTitle>
              <DialogContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <DialogContentText>
                  프로필 사진, 자기소개, 닉네임 등을 꾸며보세요!
                </DialogContentText>
                <hr />
                <div style={{ justifyContent: 'center'}}>
                  {
                    profileImg ?
                    <img src={profileImg} alt="프로필사진" style={{ height: '10rem', width:'auto'}}/>
                    :
                    <AccountCircleIcon 
                      sx={{
                      fontSize: '10rem',
                      marginLeft: '4.5rem',
                      display: `flex`,
                      justifyContent: `center`, 
                      alignItems: `center`}}/>
                  }
                  
                </div>
                <Button>이미지 선택</Button>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="nickName"
                    label="닉네임를 입력해주세요."
                    id="nickName"
                    autoComplete="nickName"
                    onBlur={(e) => {validateNickName(e)}}
                    onChange={(e) => {
                      setNickName(e.target.value)
                      if (isDuplicateNicknameChecked) { setisDuplicateNicknameChecked(false) }
                    }}
                    autoFocus
                    value={nickName}
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="myintro"
                  label="자기소개을 입력해주세요"
                  type="myintro"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setIntroduction(e.target.value)
                  }}
                  value={introduction}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="비밀번호을 입력해주세요"
                  type="password"
                  onBlur={validatePwd}
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  value={password}
                />
                {defaultPwd && !pwdValid ? (
                <ErrorText>유효하지 않은 비밀번호입니다</ErrorText>) : null}
                {defaultPwd && pwdValid ? (
                <SuccessText>사용가능한 비밀번호입니다</SuccessText>) : null}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={changeInfo}>변경</Button>
              </DialogActions>
            </Dialog>
          </ProfileContainerLv>
          
          <ProfileContainerExpTextBox>
            {/* <ProfileContainerExpText style={{ color:"blue" }}>현재 경험치 : {myexp}</ProfileContainerExpText> */}
            <ProfileContainerExpText style={{ color:"red" }}>다음 레벨까지 : {100 - myexp} !!</ProfileContainerExpText>
          </ProfileContainerExpTextBox>
          <ProfileContainerExpOut>
            <ProfileContainerExpIn style={{ width: `${myexp}%`}}></ProfileContainerExpIn>
          </ProfileContainerExpOut>
        </ProfileContainerBox>
      </ProfileContainer>
      {/* <IntroductonBox style={{ color:"#f37b83" }}> */}
      <IntroductonBox>
        {introduction}
      </IntroductonBox>
      {/* <Grid container>
        <Grid item xs={2} xl={1.5} alignSelf="center">
          <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[0]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
          <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[1]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
          <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[2]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
          <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[3]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
          <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[4]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
        <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[5]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
        <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[6]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
        <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[7]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
        <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[8]]}></BadgeImg>
          </BadgeBox>
        </Grid>
        <Grid item xs={2} xl={1.5} alignSelf="center">
        <BadgeBox>
            <BadgeImg src={imgArr[imgArrId[9]]}></BadgeImg>
          </BadgeBox>
        </Grid>
      </Grid> */}
      <ChartDiv>
        { mygenres ?
          <MyAniChart genresData={mygenres}></MyAniChart>
          : null
        }
        
      </ChartDiv>
      
    </div>
  );
}

export default MyLeft;
