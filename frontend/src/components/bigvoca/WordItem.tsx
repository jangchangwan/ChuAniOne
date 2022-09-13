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


function textToSpeech( word:string ):void {
  // 크롬만 지원 가능
  if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
    alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
    return
  }
  // 읽고 있는 경우 멈추기
  window.speechSynthesis.cancel()


  const speechMsg = new SpeechSynthesisUtterance()
  console.log(window.speechSynthesis.getVoices());
  
  speechMsg.rate = 1 // 속도: 0.1 ~ 10      
  speechMsg.pitch = 1 // 음높이: 0 ~ 2
  speechMsg.lang = "ja-JP"
  speechMsg.text = word

  // 음성실행
  window.speechSynthesis.speak(speechMsg)
}


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
          onClick={() =>{
            textToSpeech('こんにちは')
          }}
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
