import React, { useEffect } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  height: 100%;
`

const AniBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const AniImgBox = styled.div`
  margin: 0.5rem;
  width: 90%;
  height: 10.375em; 
  position: relative;
  overflow-y: hidden;
  border-radius: 0.2rem;
  overflow: hidden;
`
const AniImg = styled.img`
  width: 100%;
  height: 100%;
  position: top; 
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
      </AniBox>
    </Container>
  );
}

export default MyAniItem;
