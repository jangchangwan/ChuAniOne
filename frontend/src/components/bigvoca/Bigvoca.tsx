import React from 'react';

// CSS 관련
import Container from '@mui/material/Container';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import ReadBookImg from  '../../assets/images/readbookImg.png'
// 화면전환 애니메이션
// import { motion } from 'framer-motion';

// 하위 컴포넌트
import WordList from './WordList';


// const PageChangeUpDiv = styled.div`
//   position: fixed;
//   z-index: 999;
//   top: -60rem;
//   left: -10rem;
//   height: 300vh;
//   width: 100vh;
//   background-color: #f37b83;
//   transform: rotate(65deg);
// `

// const PageChangeDownDiv = styled.div`
//   position: fixed;
//   z-index: 999;
//   top: 60rem;
//   right: -10rem;
//   height: 300vh;
//   width: 100vh;
//   background-color: #f07b4d;
//   transform: rotate(65deg);
// `

const MajorTopic = styled.div`
  font-size: 3rem;
  font-weight: 700;
`

const SubTopic = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`


function Bigvoca() {

  return (


    <Container maxWidth="xl"
      sx={{
        padding: '3.5rem'
      }}
    >
      {/* <motion.div
        initial={{ x: -1000, y: 500 }}
        animate={{ x: [-1500, 300, -1500], y: [500, -500, -800] }}
        exit={{ display: 'none' }}

        transition={{ duration: '1.5' }}
      >
        <PageChangeUpDiv id='pagemove'></PageChangeUpDiv>
      </motion.div>
      <motion.div
        initial={{ x: 1500, y: -2300 }}
        animate={{ x: [1500, -300, 2300, 2300, -1500], y: [-2300, -1500, -500, -3800, -3800] }}
        exit={{ display: 'none' }}
        transition={{ duration: '3' }}
      >
        <PageChangeDownDiv id='pagemove'></PageChangeDownDiv>
      </motion.div> */}

      {/* <motion.div
        initial={{ y: -400 }}
        animate={{ y: -10 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}
      > */}
      <div>
        <MajorTopic>
          <p>애니 자막없이 읽을 수 있는 완벽한 단어장</p>
        </MajorTopic>
      </div>
      {/* </motion.div> */}
      {/* <motion.div
        initial={{ y: -400 }}
        animate={{ y: -10 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 120 }}
      > */}
      <div>
        <SubTopic>
          <p>30만개의 리뷰와 2355개의 애니 분석을 통해</p>
          <p>선호하는 애니 자막의 89%를 이해한다!</p>
        </SubTopic>
      </div>
      {/* </motion.div> */}
      {/* <motion.div
        initial={{ y: -700 }}
        animate={{ y: -10 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 120 }}
      > */}
      <div>
        <Grid container>
          <Grid item xs={5}>
            <img src={ReadBookImg} style={{ paddingTop: '3rem'}}/>
          </Grid>
          <Grid item xs={7}>
            <WordList></WordList>
          </Grid>
        </Grid>
      </div>
      {/* </motion.div> */}
    </Container>
  );
}

export default Bigvoca;
