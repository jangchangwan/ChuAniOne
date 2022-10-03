import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import AniDetail from '../ani/AniDetail'
// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { getAni } from '../../store/anislice'
import { isConstructorDeclaration } from 'typescript'


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
  margin-right: 1rem;
  cursor: pointer;
`

const Namediv = styled.div`
  display: flex;
  flex-direction: row;
`

const AniName = styled.h3` 
  margin: 0;
`

const ReviewText = styled.p`
  margin: 0;
  white-space: pre-wrap;
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

function MyPageItem(review:any) {

  interface Images {
    option_name: string,
    img_url: string,
    crop_ratio: string,
  }

  interface Data extends Images {
    air_year_quarter: string,
    ani_id: number,
    author: string[],
    avg_rating: number,
    content: string,
    content_rating: string,
    genres: string[],
    highlight_video: {
      dash_url: string,
    },
    images: Images[],
    img: string,
    name: string,
    production: string,
    related: number[],
    _adult: boolean,
    _ending: boolean,
    _id: string,
  }
  const dispatch = useDispatch<typeof store.dispatch>()
  const [data, setData] = useState<Data>()

  // 상세페이지 연동
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [detailId, setDetailId] = useState<number | null>(null)
  
  // 상세페이지 켜기
  const handleOpenDetail = (aniId) => {
    setOpenDetail(true)
    setDetailId(aniId)
  }
  // 상세페이지 끄기
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  async function loadData() {
    const resAni = await dispatch(getAni(review.reviewData.animation))
    // console.log(resAni)
    if (resAni.meta.requestStatus === "fulfilled") {
      setData(resAni.payload)
    }
  }

  useEffect(() =>{    
    loadData()
  },[])
  return (
    <Container>
      <Namediv>
        <ReviewBox onClick={() => handleOpenDetail(review.reviewData.animation)}>
          {
            data ?
            <AniName>{data.name}</AniName>
            : null
          }
          
        </ReviewBox>
        <Rating
              name="customized-color"
              value={review.reviewData.rating}
              readOnly
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
      </Namediv>
      
      <ReviewText>
        {review.reviewData.content}
      </ReviewText>
      { detailId ?
        <Modal
          open={openDetail}
          onClose={handleCloseDetail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBoxDetail}>
            <AniDetail aniId={detailId} />
          </Box>
        </Modal>
      : null }
    </Container>
  );

}

export default MyPageItem;
