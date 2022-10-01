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
  height: 22%;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`

const MyAniTitle = styled.p`
  font-size: 2rem;
`

function MyAniList() {
  const dispatch = useDispatch<typeof store.dispatch>()

  const [likeAniList, setLikeAniList] = useState<any>([])
  const [choiceaniList, setChoiceAniList] = useState<any>([])
  const [watchaniList, setWatchAniList] = useState<any>([])

  // 총데이터
  const [totalLikeAniList, setTotalLikeAniList] = useState<any>([])
  const [totalChoiceaniList, setTotalChoiceAniList] = useState<any>([])
  const [totalWatchaniList, setTotalWatchAniList] = useState<any>([])

  // 데이터 불러오기
  async function loadAniData() {
    const aniResponse = await dispatch(getMyAniList())
    const likeAniResponse = await dispatch(getChoiceAniList())
    const choiceAniResponse = await dispatch(getLikeAniList())
    const watchAniResponse = await dispatch(getWatchAniList())
    
    setLikeAniList(aniResponse.payload.choice)
    setChoiceAniList(aniResponse.payload.like)
    setWatchAniList(aniResponse.payload.watch)

    setTotalLikeAniList(likeAniResponse.payload)
    setTotalChoiceAniList(choiceAniResponse.payload)
    setTotalWatchAniList(watchAniResponse.payload)


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
            {
            watchaniList ?
            (
              watchaniList.map((item, idx) => (
                <MyAniItem key={idx} aniData={item}></MyAniItem>
                
              ))
            )
            : null
            }
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>

      <MyAniContainer>
        <MyAniTitle>내가 찜한 작품 목록</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            {
            choiceaniList ?
            (
              choiceaniList.map((item, idx) => (
                <MyAniItem key={idx} aniData={item}></MyAniItem>
                
              ))
            )
            : null
            }
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>

      <MyAniContainer>
        <MyAniTitle>내가 좋아요한 작품 목록</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            {
            likeAniList ?
            (
              likeAniList.map((item, idx) => (
                <MyAniItem key={idx} aniData={item}></MyAniItem>
                
              ))
            )
            : null
            }
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>
    </Container>
  )
}

export default MyAniList;
