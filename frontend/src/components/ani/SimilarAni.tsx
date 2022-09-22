import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Container = styled.div`
  width: 90%;
  height: 94%;
  padding: 3% 5%;
`

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ImgBox = styled.div`
  aspect-ratio: 2 / 1.3;
  width: 100%;
  height: auto;
  border-radius: 0.3rem;
  overflow: hidden;
`

const ImgTag = styled.img`
  width: 100%;
`

const ItemName = styled.p`
  margin: 0;
`

function SimilarAni({ recommend, }: any): any {
  return (
    <Container>
      {/* <Box sx={{ flexGrow: 1 }}> */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <ItemBox>
                <ImgBox>
                  <ImgTag src={recommend.img}/>
                </ImgBox>
                <ItemName>{recommend.name}</ItemName>
              </ItemBox>
            </Grid>
          ))}
        </Grid>
      {/* </Box> */}
    </Container>
  )
}

export default SimilarAni
