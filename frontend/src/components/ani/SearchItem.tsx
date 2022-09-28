import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const ImgBox = styled.div`
  width: 100%;
  height: 80%;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

`

const Name = styled.p`
  margin: 0;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`

function SearchItem({ ani }) {
  const data = {
    id: ani.ani_id,
    name: ani.name,
    img: ani.images[0].img_url,
    is_adult: ani._adult,
  }

  return (
    <Container>
      <ImgBox>
        <Img src={data.img}/>
      </ImgBox>
      <Name>{data.name}</Name>
    </Container>
  )
}

export default SearchItem
