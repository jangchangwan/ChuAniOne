import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import TalkList from './TalkList'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { createTalk, getTalk } from '../../store/anislice'

const Container = styled.div`
  width: 90%;
  height: 95%;
  padding: 2.5% 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TalkCount = styled.p`
  margin-top: 0;
  font-weight: bold;
`

const SendTalk = styled.div`
  width: 100%;
  position: relative;
`

const TalkInput = styled(TextField)`
  width: 100%;

`

const BtnDiv = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`

const Btn = styled(Button)`
  color: #5ec6e6 !important;
`

function Talk({ aniId }) {
  interface Data {
    animation: number,
    content: string,
    date: string,
    id: number,
    image: string,
    writer: number
  }

  const dispatch = useDispatch<typeof store.dispatch>()
  const [data, setData] = useState<Data[]>([])
  const [cnt, setCnt] = useState<number>(0)
  const [writeTalk, setWriteTalk] = useState<string>('')

  // 톡톡 불러오기
  async function loadData() {
    const res = await dispatch(getTalk(aniId))
    if (res.meta.requestStatus === "fulfilled") {
      setData(res.payload.talkList)
      setCnt(res.payload.totalCnt)
    }
  }

  // 톡톡 작성하기
  async function sendTalk() {
    if (!writeTalk.trim()) return

    const res = await dispatch(createTalk({
      content: writeTalk,
      image: '',
      id: aniId
    }))

    if (res.payload) {
      setWriteTalk('')
      loadData()
    } 
  }

  useEffect(() => {
    loadData()
  }, [aniId])

  return (
    <Container>
      <TalkCount>{cnt}개의 Talk</TalkCount>

      <SendTalk>
        <TalkInput 
          id="outlined-basic" 
          placeholder="이 작품에 대한 리뷰를 작성해보세요 !" 
          value={writeTalk}
          onChange={(e) => setWriteTalk(e.target.value)}
          onKeyUp={(e) => {
            if (e.code === "Enter") sendTalk()
          }}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#b7eeff"
          }}}}
        />
        <BtnDiv>
          <Btn onClick={sendTalk}>
            등록
          </Btn>
        </BtnDiv>
      </SendTalk>
      <TalkList data={data} />
    </Container>
  )
}

export default Talk
