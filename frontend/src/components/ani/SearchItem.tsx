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
    image: JSON.parse(ani.images[0]).img_url
  }

  return (
    <Container>
      <ImgBox>
        <Img src={data.image}/>
      </ImgBox>
      <Name>{data.name}</Name>
    </Container>
  )
}

export default SearchItem
