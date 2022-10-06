import React from 'react'

// MUI
import Container from '@mui/material/Container'
import styled from "styled-components"
import Grid from '@mui/material/Grid'

// Image
import ReadBookImg from  '../../assets/images/readbookImg.png'
import bigvocaImg from  '../../assets/images/bigvocaImg.png'

// 화면전환 애니메이션
import { motion } from 'framer-motion'

// 하위 컴포넌트
import WordList from './WordList'

// 위쪽 화면전환
const PageChangeUpDiv = styled.div`
  position: fixed;
  z-index: 999;
  top: -60rem;
  left: -10rem;
  height: 300vh;
  width: 100vh;
  background-color: #f37b83;
  transform: rotate(65deg);
`

// 아래쪽 화면전환 
const PageChangeDownDiv = styled.div`
  position: fixed;
  z-index: 999;
  top: 60rem;
  right: -10rem;
  height: 300vh;
  width: 100vh;
  background-color: #f07b4d;
  transform: rotate(65deg);
`

// 주 제목
const MajorTopic = styled.div`
  font-size: 3rem;
  font-weight: 700;
`

// 부 제목
const SubTopic = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`

//** 빅보카 페이지 */
function Bigvoca() {
  return (
    <div
      style={{
        backgroundImage: `url(${bigvocaImg})`,
        height: '100vh',
      }}
    >
      <Container maxWidth="xl"
        sx={{
          padding: '3.5rem',
          
        }}
      >
        <motion.div
          initial={{ x: -1000, y: 500 }}
          animate={{ 
            x: [-1500, 300,-1500], 
            y: [500, -500,-1500],
            transitionEnd: {display: 'none'}
          }}
          exit={{ display: 'none' }}

          transition={{ duration: '1.5' }}
        >
          <PageChangeUpDiv id='pagemove'></PageChangeUpDiv>
        </motion.div>
        <motion.div
          initial={{ x: 1500, y: -2300 }}
          animate={{ 
            x: [1500, -300, 1500], 
            y: [-2300, -1500,1500],
            transitionEnd: {display: 'none'}
          }}
          exit={{ display: 'none' }}
          transition={{ duration: '1.5' }}
        >
          <PageChangeDownDiv id='pagemove'></PageChangeDownDiv>
        </motion.div>

        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: -10 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}
        >
        <div>
          <MajorTopic>
            <p>애니 자막없이 읽을 수 있는 완벽한 단어장</p>
          </MajorTopic>
        </div>
        </motion.div>
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: -10 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 120 }}
        >
        <div>
          <SubTopic>
            <p>30만개의 리뷰와 6229개의 애니 분석을 통해</p>
            <p>선호하는 애니 자막의 89%를 이해한다!</p>
          </SubTopic>
        </div>
        </motion.div>
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay: 1.6, duration: 2 }}
        >
        <div>
          <Grid container>
            <Grid item xs={4}>
              <img src={ReadBookImg} alt='책보는소년' style={{ paddingTop: '3rem'}}/>
            </Grid>
            <Grid item xs={8}>
              <WordList></WordList>
            </Grid>
          </Grid>
        </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Bigvoca
