import React from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import profileicon from '../../assets/images/kakao_icon.png' // 임시로 사진 가져옴
import badgeicon1 from '../../assets/images/google_icon.png' // 임시로 사진 가져옴
import badgeicon2 from '../../assets/images/kakao_icon.png' // 임시로 사진 가져옴
import badgeicon3 from '../../assets/images/Logo.png' // 임시로 사진 가져옴
// 방사형 그래프
// https://velog.io/@eunjin/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B7%B8%EB%9E%98%ED%94%84%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AA%A8%EC%9D%8C


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
  /* display: inline; */
  /* flex-direction: row; */
  /* align-items: flex-start; */
  /* align-items: center; */
  /* flex-wrap: wrap; */
  /* justify-content: left; */
`

// 벳지 이미지
const BadgeImg = styled.img`
  /* width: 2.5rem; */
  width: 2rem;
  height: 2rem;
  /* display: flex; */
  /* justify-content: center;  */
  /* align-items: center; */
  /* margin: 0; */
  /* margin: 2rem; */
  filter: drop-shadow(5px 5px 5px #000); // 배경 짤라야 온전하게 그림자 적용 가능
`


function MyLeft() {
  interface MyInfo {
    img: string,
    exp: number,
    nickname: string,
    introduction: string,
    badge: string,
  }

  const exp:number = 370
  const tier:any = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
  const mytier:string = tier[Math.floor(exp/100)]  // 소수점 버림
  const myexp:number = exp%100
  const imgArr:any = [0, badgeicon1, badgeicon2, badgeicon3]
  const imgArrId:any = [1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2] // 12개



  return (
    <div>
      <h1>MyLeft</h1>
      {/* 프로필사진, 경험치, 닉네임, 소개, 벳지 가져오기 */}
      <ProfileContainer>
        <ProfileImg src={profileicon}></ProfileImg>
        <ProfileContainerBox>
          <ProfileContainerLv>{mytier}({myexp})   닉네임</ProfileContainerLv>
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
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[0]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[1]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[2]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[3]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[4]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[5]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[6]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[7]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[8]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1} margin={1}>
          <BadgeImg src={imgArr[imgArrId[9]]}></BadgeImg>
        </Grid>
        {/* <Grid item xs={2} xl={1}>
          <BadgeImg src={imgArr[imgArrId[10]]}></BadgeImg>
        </Grid>
        <Grid item xs={2} xl={1}>
          <BadgeImg src={imgArr[imgArrId[11]]}></BadgeImg>
        </Grid> */}
      </Grid>
      {/* <BadgeBox>
        <BadgeImg src={imgArr[imgArrId[0]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[1]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[2]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[3]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[4]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[5]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[6]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[7]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[8]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[9]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[10]]}></BadgeImg>
        <BadgeImg src={imgArr[imgArrId[11]]}></BadgeImg>
      </BadgeBox> */}
    </div>
  );
}

export default MyLeft;
