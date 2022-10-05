import React from 'react'

// MUI
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MyLeft from './MyLeft'
import MyRight from './MyRight'

// styled Component
import styled from 'styled-components'


const MyPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: #f7f8f9;
`

/** 마이페이지 전체페이지 */
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
        <Grid item md={0.5}></Grid>
        <Grid item xs={12} md={6}>
          <Box m={2} sx={{height:'100%'}}>
            <MyRight></MyRight>
          </Box>
        </Grid>
      </Grid>
    </MyPageContainer>
  )
}

export default MyPage
