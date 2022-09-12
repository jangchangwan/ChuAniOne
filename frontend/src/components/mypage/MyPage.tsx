import React from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MyLeft from './MyLeft';
import MyRight from './MyRight';

// const MyContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin: 3rem;
// `

function MyPage() {
  return (
    <div>
      {/* <h1>MyPage</h1> */}
      <Grid container paddingTop={7}>
        <Grid item md={1}></Grid>
        <Grid item xs={12} md={3.5}>
          <Box m={2}>
            <MyLeft></MyLeft>
          </Box>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item xs={12} md={5.5}>
          <Box m={2}>
            <MyRight></MyRight>
          </Box>
        </Grid>
      </Grid>
      {/* <Grid spacing={2}>
        <Grid item xs={12} md={4} padding={0}>
          <MyContainer>
            <MyLeft></MyLeft>
          </MyContainer>
        </Grid>
        <Grid item xs={12} md={8}>
        <MyContainer>
          <MyRight></MyRight>
        </MyContainer>
        </Grid>
      </Grid> */}
    </div>
  );
}

export default MyPage;
