import React from 'react';

// CSS 관련
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button'
function WordItem() {
  const [checked, setChecked] = React.useState(false)

  const checkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(checked);
    
  }; 

  return (
    <Grid container>
      
      <Grid item xs={3}>
        <Checkbox color= 'secondary' onChange={checkChange} id = 'word'/>
        <label htmlFor="word">일본어</label>
        
      </Grid>
      
      <Grid item xs={2}>
        <Button>
          <VolumeUpIcon/> 
        </Button>
        
      </Grid>

      <Grid item xs={5}>
        <p> 한국어</p>
      </Grid>

    </Grid>
  );
}

export default WordItem;
