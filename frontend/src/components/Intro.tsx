import React from 'react';

// CSS
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styled from "styled-components";
// 모션
import { motion } from 'framer-motion';


const PageIntro = styled.div`
  height: 100vh;
  background-color: blanchedalmond;
`

function Intro() {
  return (
    <Container maxWidth="xl"
      sx={{
        padding: '3.5rem'
      }}
    >
      
      {/* 웹사이트 소개 */}
      <PageIntro>
        <h1>더이상 애니 머 볼지 </h1>
        <h1>고민 하지말고 츄 애니 원!</h1>
        <h3>부제목</h3>
        <img src="" alt="시연영상" />
 
        <button>바로가기</button>

      </PageIntro>
      {/* 기능소개 */}
      <PageIntro
        style={{ height: '180vh'}}
        >
        <h1> Chu Ani One 은</h1>
        <h2> 애니 쉽게 접근할 수 있는</h2>
        <h2> 가장 확실한 웹사이트예요</h2>
        <Box component='div'
          sx={{
            position: 'relative',
            right: '-50%',
            top: '-5%',
            width: '30rem',
            height: '20rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem'
          }}
        >
          <img src="" alt="메인 이미지" />
          <h3>누구에게나 딱 맞는 애니 맞춤 추천 서비스</h3>
          <p>부연설명</p>
          <button>바로가기</button>
        </Box>
        <Box component='div'
          sx={{
            position: 'relative',
            left: '5%',
            top: '-5%',
            width: '25rem',
            height: '20rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem'
          }}
        >
          <img src="" alt="빅보카 이미지" />
          <h3>자막 없이도 볼 수 있게 만드는 단어장</h3>
          <p>부연설명</p>  
          <button>바로가기</button>
        </Box>
        <Box component='div'
          sx={{
            position: 'relative',
            right: '-50%',
            top: '-5%',
            width: '25rem',
            height: '30rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem'
          }}
        >
          <img src="" alt="오픈채팅 이미지" />
          <h3>서로 비슷한 애니 취향의 사람과의 오픈채팅</h3>
          <p>부연설명</p>
          <button>바로가기</button>
        </Box>
      </PageIntro>

      {/* 팀원소개 */}
      <PageIntro>
        <h1>팀원 소개</h1>

        <Grid container>
          <Grid item xs={4}>안세영</Grid>
          <Grid item xs={4}>박유주</Grid>
          <Grid item xs={4}>이소영</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>금동운</Grid>
          <Grid item xs={4}>이승현</Grid>
          <Grid item xs={4}>장창완</Grid>
        </Grid>
      </PageIntro>
    </Container>
    

  );
}

export default Intro;
