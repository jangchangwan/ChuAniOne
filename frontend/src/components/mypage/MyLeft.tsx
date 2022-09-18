import React from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'
import profileicon from '../../assets/images/kakao_icon.png' // 임시로 사진 가져옴
import badgeicon1 from '../../assets/images/google_icon.png' // 임시로 사진 가져옴
import badgeicon2 from '../../assets/images/kakao_icon.png' // 임시로 사진 가져옴
import badgeicon3 from '../../assets/images/Logo.png' // 임시로 사진 가져옴
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyAniChart   from "./MyAniChart";

// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

// 벳지 박스
const BadgeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`

// 벳지 이미지
const BadgeImg = styled.img`
  /* width: 2.5rem; */
  width: 2rem;
  height: 2rem;
  /* display: flex;
  justify-content: center; 
  align-items: center;
  margin: 0; */
  /* margin: 2rem; */
  filter: drop-shadow(5px 5px 5px #000); // 배경 짤라야 온전하게 그림자 적용 가능
`


function MyLeft() {
  const [open, setOpen] = React.useState(false);
  // interface MyInfo {
  //   img: string,
  //   exp: number,
  //   nickname: string,
  //   introduction: string,
  //   badge: string,
  // }

  const exp:number = 370
  const tier:any = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
  const mytier:string = tier[Math.floor(exp/100)]  // 소수점 버림
  const myexp:number = exp%100
  const imgArr:any = [0, badgeicon1, badgeicon2, badgeicon3]
  const imgArrId:any = [1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2] // 12개


  // 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      {/* 프로필사진, 경험치, 닉네임, 소개, 벳지 가져오기 */}
      <ProfileContainer>
        <ProfileImg src={profileicon}></ProfileImg>
        <ProfileContainerBox>
          <ProfileContainerLv>
            <p style={{ margin : '0'}}>{mytier}({myexp})   닉네임</p>
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
                  <img src="https://newsimg.sedaily.com/2022/07/10/268GU9UQSV_3.jpeg" alt="프로필사진" style={{ height: '10rem', width:'auto'}}/>
                </div>
                <Button>이미지 선택</Button>
                <TextField
                  autoFocus
                  margin="dense"
                  id="ninkname"
                  label="닉네임을 입력해주세요"
                  type="nickname"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="myintro"
                  label="자기소개을 입력해주세요"
                  type="myintro"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="ninkname"
                  label="닉네임을 입력해주세요"
                  type="nickname"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handleClose}>변경</Button>
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
        안녕하세요 아이자와 소영입니다! #도리벤 좋아함 암튼 자기소개 100자 간단 하 게 . . .... 잠오는ing 많관부 바이루
      </IntroductonBox>
      <Grid container>
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
      </Grid>

      <MyAniChart></MyAniChart>
    </div>
  );
}

export default MyLeft;
