import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MyLeft from './MyLeft';
import MyRight from './MyRight';

import styled from 'styled-components'

const MyPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`

function MyPage() {
  return (
    <MyPageContainer>
      <Grid container paddingTop={7}>
        <Grid item md={1}></Grid>
        <Grid item xs={12} md={3.5}>
          <Box m={2}>
            <MyLeft></MyLeft>
          </Box>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item xs={12} md={6}>
          <Box m={2} sx={{height:'100%'}}>
            <MyRight></MyRight>
          </Box>
        </Grid>
      </Grid>
    </MyPageContainer>
  );
}

export default MyPage;
