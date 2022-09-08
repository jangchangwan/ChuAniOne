import React from 'react'
import styled from 'styled-components'
import TalkItem from './TalkItem';

const Container = styled.div`
`


function TalkList({recommend}: any): any {
  return (
    <Container>
      <TalkItem recommend={recommend} mine={true}/>
      <TalkItem recommend={recommend}/>
      <TalkItem recommend={recommend}/>
      <TalkItem recommend={recommend}/>
    </Container>
  );
}

export default TalkList
