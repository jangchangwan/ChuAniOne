import React from 'react';

// CSS 관련
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { insertMyVoca, deleteMyVoca } from '../../store/bigvocaslice'
import { useDispatch } from "react-redux"
import store from '../../store'
import styled from 'styled-components';

const WordItemGrid = styled(Grid)`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0.5px 0.5px 0.5px 0.5px black;
  padding: 0.5rem;
`

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



function WordItem({ vocaData }) {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [checked, setChecked] = React.useState(false)

  const checkChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (checked) {
      dispatch(deleteMyVoca(vocaData.vocaId))
    } else {
      dispatch(insertMyVoca(vocaData.vocaId))
    }
    setChecked(event.target.checked);
  };



  return (
    <WordItemGrid
      container
      sx={checked ? {backgroundColor: '#CFD2CF'} : {backgroundColor: 'white'}}

    >
      {/* 일본어 */}
        <Grid xs={1}></Grid>
        <Grid xs={1}>
          <VolumeUpIcon 
            sx={checked ? 
              {
                color: '#535453',
                paddingTop: '0.5rem',
                cursor: 'pointer'
              } : {
                color: '#FA9494',
                paddingTop: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => {
              textToSpeech(vocaData.japanese)
              }} 
            />
        </Grid>
        <Grid xs={3}
        >
          <label htmlFor="word" >{vocaData.japanese}</label>
        </Grid>
        <Grid xs={5}
        >
          <p>({vocaData.pronunciation})</p>
        </Grid>
        <Grid xs={2}>
          <Checkbox color='default' onChange={checkChange} id='word' 
            sx={{ 
              paddingBottom: '1rem',
              paddingLeft: '2rem'
          }}
          />
        </Grid>
        <Grid xs={2}></Grid>
        <Grid xs={10}>
          <div>{vocaData.korean}</div>
        </Grid>

    </WordItemGrid>
  );
}

export default WordItem;
