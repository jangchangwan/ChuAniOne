import React from 'react'
import styled from 'styled-components'
import TalkItem from './TalkItem'



const Container = styled.div`
`

/** 톡톡 리스트 */
function TalkList({ data, delTalk }: any): any {

  return (
    <Container>
      { data.map((item, idx) => (
        <TalkItem key={idx} data={item} delTalk={delTalk}/>
      ))}
    </Container>
  )
}

export default TalkList
