import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`

const ImgBox = styled.div`
`

const Img = styled.img`
`

const Name = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

function SearchItem() {
  return (
    <Container>
      <ImgBox>
        <Img src="https://image.laftel.net/items/thumbs/big/3093f3b1-cb4f-4597-a49e-a708e965a802.jpg"/>
        <Name>호리미야</Name>
      </ImgBox>
    </Container>
  )
}

export default SearchItem
