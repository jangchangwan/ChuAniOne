import React from 'react';
import Grid from '@mui/material/Grid';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button'
import styled from "styled-components";


const KoreaWordItem = styled.div`
  height: 3rem;
  padding: 0.5rem;
  padding-left: 1.5rem; 
  margin-left: 1rem;
  border-width: 0 0 0 0.2rem ;
  border-style: solid;
  display : flex;
  align-items : center;
`
function MyWordItem() {
  return (
    <Grid container sx={{display: "flex", alignItems: 'center'}}>
      <Grid item xs={4.5} sx={{display: 'flex', justifyContent: 'center'}}>
        こんにちは こんにちは
      </Grid>
      <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
        <Button
          sx = {{
            padding: '0',
            height: '2rem',
            width: '2rem',
            border: '1px solid',
            boxShadow: '1px 1px 1px 1px black'
          }}
        >
          <VolumeUpIcon/> 
        </Button>
      </Grid>
      <Grid item xs={6}>
        <KoreaWordItem>안녕 안녕</KoreaWordItem>
      </Grid>
    </Grid>
  );
}

export default MyWordItem;
