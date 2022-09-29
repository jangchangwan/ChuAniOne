import React from 'react'
import styled from 'styled-components'
import TalkItem from './TalkItem'



const Container = styled.div`
`


function TalkList({ data, delTalk }: any): any {

  return (
    <Container>
      { data.map((item, idx) => (
        <TalkItem data={item} delTalk={delTalk}/>
      ))}
    </Container>
  )
}

export default TalkList
