import React from 'react'
import styled from 'styled-components'
import TalkItem from './TalkItem'


import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

const Container = styled.div`
`


function TalkList({ data }: any): any {
  const userId = useSelector((state: initialState) => (state.login.userId))
  console.log(userId)
  
  return (
    <Container>
      { data.map((item, idx) => (
        userId === item.writer_id ?
          <TalkItem data={item} mine={true}/>
          : <TalkItem data={item} />
      ))}
    </Container>
  )
}

export default TalkList
