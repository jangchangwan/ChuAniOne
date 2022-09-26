import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import axios from "axios"
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import AniDetail from '../ani/AniDetail'

// recommend 부분 편의에 맞춰 바꿀 필요 있음

const Container = styled.div`
  
`

const MyAniBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const MyAniImgBox = styled.div`
  margin: 0.5rem;
  height: 10.375em; 
  position: relative;
  overflow-y: hidden;
  border-radius: 0.2rem;
`
const MyAniImg = styled.img`
  width: 100%;
  position: top;
  object-fit: cover;
`

const MyAniName = styled.p`
  margin: 0;
`

const styleBoxDetail = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: '0.3rem',
  border: 'none',
  boxShadow: 24,
}



function MyAniItem() {
  interface AniInfo {
    air_year_quarter: string,
    avg_rating: number,
    cnt_short_review: number,
    content: string,
    content_rating: string,
    distributed_air_time: string,
    genres: string[],
    highlight_video: {
      content_id: string,
      dash_url: string,
      hls_url: string,
    },
    id: number,
    images: Array<{
      crop_ratio: string,
      img_url: string,
      option_name: string,
    }>,
    img: string,
    is_adult: boolean,
    is_ending: boolean,
    name: string,
    production: string,
    tags: string[],
  }

  const [recommend, setRecommend] = useState<Partial<AniInfo>>({})

  const [openDetail, setOpenDetail] = useState<boolean>(false)

  const handleOpenDetail = () => setOpenDetail(true)
  const handleCloseDetail = () => setOpenDetail(false)

  useEffect(()=> {
    getAni()
  }, [])

  async function getAni(): Promise<void> {
    const ani = await axios.get('https://laftel.net/api/items/v2/40815/')
    await setRecommend({
      ...recommend,
      air_year_quarter: ani.data.air_year_quarter,
      img: ani.data.img,
      name: ani.data.name,
      avg_rating: ani.data.avg_rating,
      cnt_short_review: ani.data.cnt_short_review,
      content: ani.data.content,
      content_rating: ani.data.content_rating,
      distributed_air_time: ani.data.distributed_air_time,
      genres: ani.data.genres,
      highlight_video: ani.data.highlight_video,
      id: ani.data.id,
      images: ani.data.images,
      is_adult: ani.data.is_adult,
      is_ending: ani.data.is_ending,
      production: ani.data.production,
      tags: ani.data.tags,
    })
    console.log(ani.data)
  }

  return (
    <Container>
      { recommend ? 
        <Modal
          open={openDetail}
          onClose={handleCloseDetail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={styleBoxDetail}>
          <AniDetail recommend={recommend}/>
        </Box>
        </Modal> : null
      }

      <MyAniBox onClick={handleOpenDetail}>
        <MyAniImgBox>
          <MyAniImg src={recommend.img}/>
        </MyAniImgBox>
        <MyAniName>{recommend.name}</MyAniName>
      </MyAniBox>
    </Container>
  );
}

export default MyAniItem;
