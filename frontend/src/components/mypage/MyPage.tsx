import React from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'
import MyLeft from './MyLeft';
import MyRight from './MyRight';

const MyLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3rem;
`

function MyPage() {
  return (
    <div>
      <h1>MyPage</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MyLeftContainer>
            <MyLeft></MyLeft>
          </MyLeftContainer>
        </Grid>
        <Grid item xs={12} md={8}>
          <MyRight></MyRight>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyPage;
