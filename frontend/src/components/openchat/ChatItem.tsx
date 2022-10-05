import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

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
  min-height: 1.2rem;
  margin-top: 0.5rem;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
` 

const Time = styled.p`
  margin-left: 0.3rem;
  margin-right: 0.4rem;
  margin-bottom: 1.5rem;
`

/** 채팅 아이템 */
function ChatItem({ data }: any) {
  const userId = useSelector((state: initialState) => (state.login.userId))
  
  return (
    data.memberId === userId ?
    <Container className="mine">
      <ContentBox className="mine">
        <Content className="mine">{data.message}</Content>
        <Time>{data.sendDate}</Time>
      </ContentBox>
    </Container>
    :
    <Container>
      <Username>{data.memberNickname}</Username>
      <ContentBox>
        <Content>{data.message}</Content>
        <Time>{data.sendDate}</Time>
      </ContentBox>
    </Container>
  )}

export default ChatItem
