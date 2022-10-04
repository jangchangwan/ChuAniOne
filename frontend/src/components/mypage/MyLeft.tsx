import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyAniChart   from "./MyAniChart";

import likeIcon from '../../assets/images/like.png'
import wish from '../../assets/images/wish.png'
import review1 from '../../assets/images/review1.png'
import review3 from '../../assets/images/review3.png'
import talktalk1 from '../../assets/images/talktalk1.png'
import talktalk3 from '../../assets/images/talktalk3.png'


import { useDispatch } from "react-redux"
import { myinfo, nicknameCheck, changeUserInfo } from '../../store/Loginslice'
import { getchallenge } from '../../store/mypageslice'
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
import { padding, width } from '@mui/system';
// 프로필 사진, 닉네임, 경험치 관련
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

`
const IntroDiv = styled.div`
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
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
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 1.5rem;
  /* margin: 0 0 1rem 0; */
`

// 경험치 바 위의 텍스트 박스
const ProfileContainerExpTextBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 0.5rem;
`

// 텍스트 박스 안의 왼쪽, 오른쪽 텍스트
const ProfileContainerExpText = styled.div`
  background-color: #f37b83;
  border-radius: 10%;
  padding: 2px;
  color: white;
  height: 1rem;
  font-size: 0.8rem;
  opacity: 1;
  transition: opacity 0.35s ease-in-out;
`

// 경험치 바 밖
const ProfileContainerExpOut = styled.div`
  border: solid 1px;
  width: 100%;
  height: 1rem;
  border-radius: 10px 10px 10px 10px;
  border-color: #f37b83;
  &:hover .remainExp {
    opacity: 1;
  }
`

// 경험치 바 안
const ProfileContainerExpIn = styled.div`
  height: 1rem;
  border-radius: 10px 10px 10px 10px;
  background-color: #f37b83; 
  &:hover .remainExp {
    opacity: 1;
  }
`

// 소개
const IntroductonBox = styled.div`
  width: 100%;
  border-radius: 1rem;
  margin: 2rem 0 0 0;
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

const BadgeDiv = styled.div`
  display: flex;
  float: left;
  flex-direction: row;
  align-items: center;
`
const BadgeImg = styled.img`
  width: 3rem;
  height: 3rem;
  filter: drop-shadow(1px 1px 1px #000);
`
const TotalChartDiv = styled.div`
  background-color: #FFF5E4;
  width: 100%;
  border-radius: 1rem;
  border: 0.5rem solid #967E76;
  padding: 1rem
`
const ChartDiv = styled.div`
  position: relative;
  left: 10%;
  width: 70%;
  padding: 1rem
`

function MyLeft() {
  const dispatch = useDispatch<typeof store.dispatch>()

  const [myChallengeList, setChallengeList] = useState<any>([])
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

  async function loadChallengeData() {
      const myChallenge = await dispatch(getchallenge())
      setChallengeList(myChallenge.payload)
    }
  
  

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
    console.log(changeDto)
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
    loadChallengeData()
    
  },[])

  return (
    <div
      style={{
        paddingTop: '3rem'
      }}
    >
      <IntroDiv style={{backgroundColor: '#FFF5E4', border: '0.5rem solid #967E76'}}>
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
              <Grid container
                sx={{ display: 'flex', width: '100%'}}
              >
                <Grid item xs={11}>
                <p style={{ margin : '0', width: '100%'}}>{mytier}({myexp})  {nickName}</p>
                </Grid>
                <Grid item xs={1}>
                  <MoreVertIcon
                    type='button'
                    onClick={handleClickOpen}
                    sx={{ paddingTop: '2px', cursor: 'pointer'}}
                  ></MoreVertIcon>
                </Grid>
              </Grid>
              
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
                  <Button component="label">
                    이미지 선택
                    <input hidden multiple type="file" />
                  </Button>
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
              <ProfileContainerExpText className='remainExp'>다음 레벨까지 : {100 - myexp} !!</ProfileContainerExpText>
            </ProfileContainerExpTextBox>
            <ProfileContainerExpOut>
              <ProfileContainerExpIn style={{ width: `${myexp}%`}}></ProfileContainerExpIn>
            </ProfileContainerExpOut>
          </ProfileContainerBox>
        </ProfileContainer>
        <IntroductonBox>
          <p style={{margin: '0'}}>{introduction}</p>
        </IntroductonBox>
        
      </IntroDiv>
      <div style={{backgroundColor: '#FFF5E4',width:'100%', height: '6rem', padding: '1rem', borderRadius:'1rem', marginBottom: '1rem', border: '0.5rem solid #967E76'}}>
          <p style={{marginTop: '0', color: '#967E76'}}>획득 뱃지</p>
          {
            myChallengeList ?
            ( myChallengeList.map((item, idx) => (
              <BadgeDiv>
              {
                item === '리뷰 작성 완료' ?
                <BadgeImg src={review1}></BadgeImg>
                : null
              }
              {
                item === '리뷰 3개 작성 완료' ?
                <BadgeImg src={review3}></BadgeImg>
                : null
              }
              {
                item === '톡톡 작성 완료' ?
                <BadgeImg src={talktalk1}></BadgeImg>
                : null
              }
              {
                item === '애니메이션 좋아요 완료' ?
                <BadgeImg src={likeIcon}></BadgeImg>
                : null
              }
              {
                item === '애니메이션 찜하기 완료' ?
                <BadgeImg src={wish}></BadgeImg>
                : null
              }
              {
                item === '톡톡 3개 작성 완료' ?
                <BadgeImg src={talktalk3}></BadgeImg>
                : null
              }
              </BadgeDiv>
            ))
            )
            : null
          }
      </div>
      <TotalChartDiv>
        <ChartDiv>
          { mygenres ?
            <MyAniChart genresData={mygenres}></MyAniChart>
            : null
          }
          
        </ChartDiv>
      </TotalChartDiv>
      
      
    </div>
  );
}

export default MyLeft;
