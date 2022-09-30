import React, {useState, useEffect} from 'react'
import MyAniItem from './MyAniItem';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

import { useDispatch } from 'react-redux'
import {
  getMyAniList,
  getChoiceAniList,
  getLikeAniList,
  getWatchAniList
} from '../../store/mypageslice'
import store from '../../store'


const Container = styled.div`
  
`

const CarouselContainer = styled(Carousel)`
  margin-bottom: 1rem;
`

const CarouselPaper = styled(Paper)`
  width: 100%;
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
`

const MyAniContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`

const MyAniTitle = styled.p`
  font-size: 2rem;
`

function MyAniList() {
  const dispatch = useDispatch<typeof store.dispatch>()

  // const [aniList, setAniList] = useState<any>([])
  const [likeAniList, setLikeAniList] = useState<any>([])
  const [choiceaniList, setChoiceAniList] = useState<any>([])
  const [watchaniList, setWatchAniList] = useState<any>([])

  // 데이터 불러오기
  async function loadAniData() {
    const aniResponse = await dispatch(getMyAniList())
    const likeAniResponse = await dispatch(getChoiceAniList())
    const choiceAniResponse = await dispatch(getLikeAniList())
    const watchAniResponse = await dispatch(getWatchAniList())
    console.log(aniResponse);
    
    // setAniList(aniResponse.data)
    setLikeAniList(likeAniResponse.payload)
    setChoiceAniList(choiceAniResponse.payload)
    setWatchAniList(watchAniResponse.payload)



  }

  useEffect(() => {
    loadAniData()
  },[])
  return (
    <Container>
      <MyAniContainer>
        <MyAniTitle>최근 시청한 작품들</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            <MyAniItem></MyAniItem>
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>

      <MyAniContainer>
        <MyAniTitle>내가 찜한 작품 목록</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            <MyAniItem></MyAniItem>
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>

      <MyAniContainer>
        <MyAniTitle>내가 좋아요한 작품 목록</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            <MyAniItem></MyAniItem>
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>
    </Container>
  )
}

export default MyAniList;
