import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  width: 95%;
  padding: 2.5%;
  height: auto;
  background-color: #fff0f0;
`

const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const AniName = styled.h3` 
  margin: 0;
`

const ReviewText = styled.p`
  margin: 0;
`

function MyPageItem() {
  return (
    <Container>
      <ReviewBox>
        <AniName>도리벤</AniName>
      </ReviewBox>
      <ReviewText>
        너무너무 재밌어요 !
      </ReviewText>
    </Container>
  );

}

export default MyPageItem;
