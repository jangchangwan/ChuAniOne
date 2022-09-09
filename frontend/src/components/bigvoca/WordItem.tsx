import React from 'react';

// CSS 관련
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button'
import styled from "styled-components";


const KoreaWordItem = styled.div`
  height: 3rem;
  padding: 0.5rem;
  padding-left: 1rem; 
  margin-left: 1rem;
  border-width: 0 0 0 0.2rem ;
  border-style: solid;
  display : flex;
  align-items : center;
`

function WordItem() {
  const [checked, setChecked] = React.useState(false)

  const checkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(checked);
    
  }; 

  return (
    <Grid 
      container
      sx={{
        display: "flex",
        alignItems: 'center',
      }}
    >
      
      <Grid item xs={3}>
        <Checkbox color= 'secondary' onChange={checkChange} id = 'word'/>
        <label htmlFor="word" style={ checked ? { textDecoration: 'line-through' } : { textDecoration: 'none'}}>こんにちは</label>
        
      </Grid>
      
      <Grid item xs={2}>
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

      <Grid 
        item xs={5}
      >
        <KoreaWordItem>안녕</KoreaWordItem>
      </Grid>

    </Grid>
  );
}

export default WordItem;
