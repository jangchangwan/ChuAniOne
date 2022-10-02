import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
  height: 100%;
`

const AniBox = styled.div`
`

const AniImgBox = styled.div`

`
const AniImg = styled.img`
  width: 90%;
  height: 100%;
  position: top;
  object-fit: cover;
`

const AniName = styled.p`
  margin: 0;
  padding-right: 0.5rem;
`

function MyAniMoreItem(myAniData) {

  return (
    <Container>
      <AniBox>
        <AniImgBox>
          <AniImg src={myAniData.myAniData.img} alt={myAniData.myAniData.name} />
        </AniImgBox>
        <AniName>{myAniData.myAniData.name}</AniName>
      </AniBox>
    </Container>
  );
}

export default MyAniMoreItem;
