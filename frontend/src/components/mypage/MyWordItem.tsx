import React from 'react'

// MUI
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

// redux
import { insertMyVoca, deleteMyVoca } from '../../store/bigvocaslice'
import { useDispatch } from "react-redux"
import store from '../../store'

// styled Component
import styled from 'styled-components'


const WordItemGrid = styled(Grid)`
  display: flex;
  align-items: center;
  width: 90% !important;
  border-radius: 1rem;
  box-shadow: 0.5px 0.5px 0.5px 0.5px black;
  margin-top: 1rem;
  padding: 1rem;
  margin-bottom: 2.5rem;
`
/** TTS : 일본어 읽어주기  */
function textToSpeech(word: string): void {
  
  // 크롬만 지원 가능
  if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
    alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
    return
  }
  // 읽고 있는 경우 멈추기
  window.speechSynthesis.cancel()

  
  const speechMsg = new SpeechSynthesisUtterance()

  speechMsg.rate = 1 // 속도: 0.1 ~ 10      
  speechMsg.pitch = 1 // 음높이: 0 ~ 2
  speechMsg.lang = "ja-JP"
  speechMsg.text = word

  // 음성실행
  window.speechSynthesis.speak(speechMsg)
}


/** 개별 단어 Component */ 
function MyWordItem(wordData:any) {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [checked, setChecked] = React.useState(false)

  const checkChange = () => {
    if (checked) {
      dispatch(insertMyVoca(wordData.wordData.voca.vocaId))
      setChecked(false)
    } else {
      dispatch(deleteMyVoca(wordData.wordData.voca.vocaId))
      setChecked(true)
    }
  }

  return (
    <WordItemGrid
      container
      sx={checked ? {backgroundColor: '#CFD2CF'} : {backgroundColor: 'white'}}

    >
      {/* 일본어 */}
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <VolumeUpIcon 
            sx={checked ? 
              {
                color: '#535453',
                cursor: 'pointer'
              } : {
                color: '#FA9494',
                cursor: 'pointer'
              }}
              onClick={() => {
              textToSpeech(wordData.wordData.voca.japanese)
              }} 
            />
        </Grid>
        <Grid item xs={4}
        >
          <label htmlFor="word" >{wordData.wordData.voca.japanese}</label>
        </Grid>
        <Grid item xs={3}
        >
          <p style={{margin:0}}>{wordData.wordData.voca.korean}</p>
        </Grid>
        <Grid item xs={1}
          sx = {{
            position: 'relative',
            top: '-1rem',
          }}
        >
          {
            checked ?
            <Button 
              onClick={checkChange}
              sx ={{
                color: '#2b2c2b'
              }}
            >취소</Button>
            :
            <Button 
              onClick={checkChange}
              sx ={{
                color: '#CD104D'
              }}
            >삭제</Button>
          }
          
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <div>({wordData.wordData.voca.pronunciation})</div>
        </Grid>
      </Grid>
    </WordItemGrid>
  )
}

export default MyWordItem
