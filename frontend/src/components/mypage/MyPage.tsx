import React from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'

// rem min-height 

function MyPage() {
  return (
    <div>
      <h1>MyPage</h1>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          xs=8
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={8}>
          xs=8
        </Grid>
      </Grid>
    </div>
  );
}

export default MyPage;
