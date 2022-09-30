import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MyLeft from './MyLeft';
import MyRight from './MyRight';



function MyPage() {
  return (
    <div>
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
    </div>
  );
}

export default MyPage;
