import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import TalkItem from './TalkItem'

import initialState from '../../store/Loginslice'

const Container = styled.div`
`


function TalkList({ data }: any): any {
  const userId = useSelector((state: initialState) => (state.login.useId))
  
  return (
    <Container>
      { data.map((item, idx) => (
        userId === item.writer ?
          <TalkItem data={item} mine={true}/>
          : <TalkItem data={item} />
      ))}
    </Container>
  );
}

export default TalkList
