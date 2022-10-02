import React, { useEffect } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  height: 14rem;
`

const AniBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const AniImgBox = styled.div`
  margin: 0.5rem;
  height: 10.375em; 
  position: relative;
  overflow-y: hidden;
  border-radius: 0.2rem;
`
const AniImg = styled.img`
  width: 100%;
  height: 100%;
  position: top;
  object-fit: cover;
`

const AniName = styled.p`
  margin: 0;
`

function MyAniItem(aniData) {

  useEffect(() =>{
    // console.log(aniData.aniData)
  }, [])

  return (
    <Container>
      <AniBox>
        <AniImgBox>
          <AniImg src={aniData.aniData.img} alt={aniData.aniData.name} />
        </AniImgBox>
        <AniName>{aniData.aniData.name}</AniName>
      </AniBox>
    </Container>
  );
}

export default MyAniItem;
