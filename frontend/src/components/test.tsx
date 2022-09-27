import React from 'react';
// 이미지 불러오기

import Member1 from '../assets/images/member1.png'
import Member2 from '../assets/images/member2.png'
import Member3 from '../assets/images/member3.png'
import Member4 from '../assets/images/member4.png'
import Member5 from '../assets/images/member5.png'
import Member6 from '../assets/images/member6.png'
import IntroImg1 from '../assets/images/introImg.png'
// CSS
import Grid from '@mui/material/Grid';
import styled from "styled-components";
// 모션


const PageIntro3 = styled.div`
  background-color : #FFD1D1;
  width: 100%;
  height: 100%;
`
const MemberIntro = styled.div`
  width: 16rem;
  height: 16rem;
  background-color: white;
  transform: rotate(45deg);
`
const Spaceblock = styled.div`
  width: 8rem;
`
const NameBox = styled.p`
  width: 6rem;
  height: 2.5rem;
  background-color: red;
  color: white;
  transform: rotate(-45deg);
  position: relative;
  top: 60%;
  left: -10%;
`
const PartBox = styled.p`
  width: 9rem;
  height: 2rem;
  background-color: black;
  color: black;
  transform: rotate(-45deg);
  position: relative;
  top: 60%;
  left: 6.5%;
`

function test() {

  return (
    <div
      style={{
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
        width: '100%'
      }}
    >
      {/* 팀원소개 */}
      <PageIntro3
        style={{ backgroundImage: `url(${IntroImg1})`, height:'100vh'}}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginTop: 0,
            paddingTop: '2rem',
            paddingBottom: '3rem',
            textAlign: 'center'
          }}
        >MEMBERS</h1>
        <Grid container
          sx= {{
            position: 'relative',
            right: '-33%',
          }}
        >
          <MemberIntro style={{backgroundImage: `url(${Member1})`}}>
            <NameBox></NameBox>
            <PartBox></PartBox>
          </MemberIntro>
          <Spaceblock></Spaceblock>
          <MemberIntro></MemberIntro>
          <Spaceblock></Spaceblock>
          <MemberIntro></MemberIntro>
        </Grid>
        <Grid container
          sx= {{
            position: 'relative',
            top: '-5%',
            right: '-21.5%'
          }}
        >
          <MemberIntro></MemberIntro>
          <Spaceblock></Spaceblock>
          <MemberIntro></MemberIntro>
          <Spaceblock></Spaceblock>
          <MemberIntro></MemberIntro>
        </Grid>
      </PageIntro3>
    </div>

  );
}

export default test;
