import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// redux
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'


const Container = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #333333;

  &.mine {
    flex-direction: row-reverse;
    margin-top: 1rem;
    align-items: end;

    &:hover .delete {
      display: block;
    }
  }
`

const DeleteDiv = styled.div`
  display: none;
`

const Deletebtn = styled(IconButton)`
`

const DeleteIcon = styled(DeleteForeverIcon)`
`

const TalkBox = styled.div`
  display: flex;
  align-items: end;
`

const Time = styled.p`
  font-size: 0.8rem;
  margin: 0;
  margin: 0 0.5rem;
`

const UserName = styled.p`
  margin: 0;
  margin-left: 0.3rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.2rem;
`

const UserContent = styled.p`
  margin: 0;

  background-color: #ffb7bc;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  &.mine {
    background-color: #b7eeff;
  }
`

/** 톡톡 아이템 */
function TalkItem({ data, delTalk }: any): any {
  const userId = useSelector((state: initialState) => (state.login.userId))

  /** 시간 설정 */
  const [time, setTime] = useState<string>('')
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()


  /** 오늘인 경우, 시간 | 아닌 경우, 날짜 보여주기 */
  useEffect(() => {
    const value = data.date

    if (value[0] === year && value[1] === month && value[2] === day) {
      if (value[3] > 12) {
        if (value[4] < 10) {
          setTime(`오후 ${value[3]-12}:0${value[4]}`)
        } else setTime(`오후 ${value[3]-12}:${value[4]}`)
      } else {
        if (value[4] < 10) {
          setTime(`오전 ${value[3]}:0${value[4]}`)
        } else setTime(`오전 ${value[3]}:${value[4]}`)
      }
    }
    else setTime(`${value[1]}.${value[2]}`)
  }, [])



  return (
    userId === data.writer_id ?
      <Container className="mine">
          <DeleteDiv className="delete" onClick={() => delTalk(data.id)}>
            <Deletebtn>
              <DeleteIcon />
            </Deletebtn>
          </DeleteDiv>

        <UserContent className="mine">{data.content}</UserContent>
        <Time>{time}</Time>
      </Container>
    :
      <Container>
        <UserName>{data.writer_name}</UserName>
        <TalkBox>
          <UserContent>{data.content}</UserContent>
          <Time>{time}</Time> 
        </TalkBox>
      </Container>
  )
}

export default TalkItem
