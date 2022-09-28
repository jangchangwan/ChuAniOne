import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { getSimilar } from '../../store/anislice'

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


function SimilarAni({ aniId }) {
  interface Data {
    ani_id: number,
    images: {
      option_name: string,
      img_url: string,
      crop_ratio: string,
    },
    img: string,
    name: string,
    _adult: boolean,
  }

  const dispatch = useDispatch<typeof store.dispatch>()
  const [data, setData] = useState<Data[]>([])

  async function loadData() {
    const res = await dispatch(getSimilar(aniId))
    if (res.meta.requestStatus === "fulfilled") {
      setData(res.payload)
      console.log(res.payload)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {data.map((item, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <ItemBox>
                <ImgBox>
                  <ImgTag src={item.images[0].img_url}/>
                </ImgBox>
                <ItemName>{item.name}</ItemName>
              </ItemBox>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default SimilarAni
