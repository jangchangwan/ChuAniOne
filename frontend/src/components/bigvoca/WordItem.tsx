import React, { useEffect } from 'react'

// MUI
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

// styled Component
import styled from 'styled-components'

// redux
import { insertMyVoca, deleteMyVoca } from '../../store/bigvocaslice'
import { useDispatch } from "react-redux"
import store from '../../store'

// 단어 박스
const WordItemGrid = styled(Grid)`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0.5px 0.5px 0.5px 0.5px black;
  padding: 1rem;
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
function WordItem({ vocaData }) {
  // redux내 함수 사용 선언
  const dispatch = useDispatch<typeof store.dispatch>()
  // 체크 유무
  const [checked, setChecked] = React.useState(false)

  /** 체크 클릭시 등록 및 삭제 */
  const checkChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (checked) {
      dispatch(deleteMyVoca(vocaData.vocaId))
    } else {
      dispatch(insertMyVoca(vocaData.vocaId))
    }
    setChecked(event.target.checked)
  }

  useEffect(() =>{
    setChecked(false)
  },[vocaData])

  return (
    <WordItemGrid
      container
      sx={checked ? {backgroundColor: '#CFD2CF'} : {backgroundColor: 'white'}}

    >
      {/* 일본어 */}
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
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
              textToSpeech(vocaData.japanese)
              }} 
            />
        </Grid>
        <Grid item xs={3}
        >
          <label htmlFor="word" >{vocaData.japanese}</label>
        </Grid>
        <Grid item xs={5}
        >
          <p style={{margin:0}}>{vocaData.korean}</p>
        </Grid>
        <Grid item xs={2}>
          <Checkbox checked={checked} color='default' onChange={checkChange} id='word' 
            sx={{ 
          }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={2}></Grid>
        <Grid xs={10}>
          <div>({vocaData.pronunciation})</div>
        </Grid>
      </Grid>
    </WordItemGrid>
  )
}

export default WordItem
