import React from 'react';

// CSS 관련
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button'


function textToSpeech(word: string): void {
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



function TestItem() {
  const [checked, setChecked] = React.useState(false)

  const checkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    

  };



  return (
    <Grid
      container
      // sx={checked ? {backgroundColor: '#B7C4CF'} : {backgroundColor: 'white'}}
      sx={{
        display: "flex",
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: `1rem`,
        boxShadow: `0.5px 0.5px 0.5px 0.5px black`,
        padding: '0.5rem'
      }}
    >
      {/* 일본어 */}
        <Grid xs={2}></Grid>
        <Grid xs={4}
        >
          <label htmlFor="word" style={checked ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>遅い</label>
        </Grid>
        <Grid xs={6}>
          <Checkbox color='secondary' onChange={checkChange} id='word' />
        </Grid>
        <Grid xs={2}></Grid>
        <Grid xs={4}>
          <div>느려</div>
        </Grid>
        <Grid xs={6} alignItems="flex-end">
          <Button
            onClick={() => {
              textToSpeech('遅い')
            }}
            sx={{
              padding: '0',
              height: '2rem',
              width: '2rem',
              border: '1px solid',
              boxShadow: '1px 1px 1px 1px black'
            }}
          >
            <VolumeUpIcon />
          </Button>
        </Grid>

        
    </Grid>
  );
}

export default TestItem;
