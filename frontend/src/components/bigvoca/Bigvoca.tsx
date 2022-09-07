import React from 'react';

// CSS 관련
import Container from '@mui/material/Container';
import styled from "styled-components";
import Grid from '@mui/material/Grid';

// 화면전환 애니메이션
import { motion } from 'framer-motion';

// 하위 컴포넌트
import WordList from './WordList';

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
      <motion.div
        initial = {{ y:-400 }}
        animate = {{ y: -10 }}
        transition = {{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        <MajorTopic>
          <p>애니 자막없이 읽을 수 있는 완벽한 단어장</p>
        </MajorTopic>
      </motion.div>
      <motion.div
        initial = {{ y:-400 }}
        animate = {{ y: -10 }}
        transition = {{ delay: 0.4, type: 'spring', stiffness: 120  }}
      >
        <SubTopic>
          <p>30만개의 리뷰와 2355개의 애니 분석을 통해</p>
          <p>애니 자막의 89%를 이해한다!</p>
        </SubTopic>
      </motion.div>
      <motion.div
        initial = {{ y:-700 }}
        animate = {{ y: -10 }}
        transition = {{ delay: 0.6, type: 'spring', stiffness: 120  }}
      >
        <Grid container>
          <Grid item xs={5}>
            이미지
          </Grid>
          <Grid item xs={7}>
            <WordList></WordList>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Bigvoca;
