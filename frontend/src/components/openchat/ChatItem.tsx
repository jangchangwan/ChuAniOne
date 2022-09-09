import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;

  &.mine{
    align-items: flex-end;
  }
`

const Username = styled.p`
  margin: 0;
  margin-left: 0.5rem;
`

const ContentBox = styled.div`
  display: flex;
  margin: 0;
  height: fit-content;
  align-items: flex-end;

  &.mine{
    flex-direction: row-reverse;
  }
`

const Content = styled.p`
  max-width: 80%;
  margin-top: 0.5rem;
  text-align: center;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
` 


const Time = styled.p`
  margin-left: 0.3rem;
  margin-right: 0.4rem;
  margin-bottom: 1.5rem;
`

function ChatItem({ data }: any) {

  return (
    data.mine ?
    <Container className="mine">
      <ContentBox className="mine">
        <Content className="mine">{data.content}</Content>
        <Time>{data.time}</Time>
      </ContentBox>
    </Container>
    :
    <Container>
      <Username>{data.user}</Username>
      <ContentBox>
        <Content>{data.content}</Content>
        <Time>{data.time}</Time>
      </ContentBox>
    </Container>
  )}

export default ChatItem
