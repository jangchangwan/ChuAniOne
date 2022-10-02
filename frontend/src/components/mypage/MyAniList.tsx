import React, {useState, useEffect} from 'react'

// 하위컴포넌트
import MyAniItem from './MyAniItem';
import MyAniMoreItem from './MyAniMoreItem'

// MUI
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid'

// Redux
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
  display: flex;
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
const Titlediv = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
`
const MyAniTitle = styled.p`
  margin: 0;
  margin-right: 1rem;
  font-size: 2rem;
`
const MoreIcon = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
`

function MyAniList() {
  const dispatch = useDispatch<typeof store.dispatch>()

  // 더보기 뒤로 버튼
  const [likeMore, setLikeMore] = useState(true)
  const [choiceMore, setChoiceMore] = useState(true)
  const [watchMore, setWatchMore] = useState(true)
  // 캐러셀 데이터
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
    const likeAniResponse = await dispatch(getLikeAniList())
    const choiceAniResponse = await dispatch(getChoiceAniList())
    const watchAniResponse = await dispatch(getWatchAniList())
        
    setLikeAniList(aniResponse.payload.like)
    setChoiceAniList(aniResponse.payload.choice)
    setWatchAniList(aniResponse.payload.watch)

    setTotalLikeAniList(likeAniResponse.payload.like)
    setTotalChoiceAniList(choiceAniResponse.payload.choice)
    setTotalWatchAniList(watchAniResponse.payload.watch)
  }
  // 더보기 버튼
  const watchMoreData = () =>{
    if (watchMore) {
      setWatchMore(false)
    } else {
      setWatchMore(true)
    }
  }
  const choiceMoreData = () =>{
    if (choiceMore) {
      setChoiceMore(false)
    } else {
      setChoiceMore(true)
    }
  }
  const likeMoreData = () =>{
    if (likeMore) {
      setLikeMore(false)
    } else {
      setLikeMore(true)
    }
  }
  
  useEffect(() => {
    loadAniData()
  },[])

  return (
    <Container>
      <MyAniContainer>
        <Titlediv>
          <MyAniTitle>최근 시청한 작품들</MyAniTitle>
          {
            watchMore ?
            <MoreIcon onClick={watchMoreData}>
              더보기<ArrowForwardIosIcon sx={{fontSize:'1rem'}}></ArrowForwardIosIcon>
            </MoreIcon>
            :
            <MoreIcon onClick={watchMoreData}>
              <ArrowBackIosIcon sx={{fontSize:'1rem'}}></ArrowBackIosIcon>뒤로가기
            </MoreIcon>
          }
          
        </Titlediv>
        {
          watchMore ?
          <CarouselContainer indicators={false}>
            <CarouselPaper elevation={0}>
              {
                watchaniList[0] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[0]}></MyAniItem></Grid>
                : null
              }
              {
                watchaniList[1] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[1]}></MyAniItem></Grid>
                : null
              }
              {
                watchaniList[2] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[2]}></MyAniItem></Grid>
                : null
              }
              {
                watchaniList[3] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[3]}></MyAniItem></Grid>
                : null
              }
            </CarouselPaper>
            <CarouselPaper elevation={1}>
            {
                watchaniList[4] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[4]}></MyAniItem></Grid>
                : null
              }
              {
                watchaniList[5] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[5]}></MyAniItem></Grid>
                : null
              }
              {
                watchaniList[6] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[6]}></MyAniItem></Grid>
                : null
              }
              {
                watchaniList[7] ?
                <Grid item xs={3}><MyAniItem aniData={watchaniList[7]}></MyAniItem></Grid>
                : null
              }
            </CarouselPaper>
          </CarouselContainer> :
            <Grid container>
            { totalWatchaniList ?
            
              ( totalWatchaniList.map((item, idx) => (
                <Grid item xs={3}>
                  <MyAniMoreItem key={idx} myAniData={item}/>
                </Grid>
                ))
              ) 
              : null
            }
            </Grid>
        }
        
      </MyAniContainer>

      <MyAniContainer>
        <Titlediv>
          <MyAniTitle>내가 찜한 작품 목록</MyAniTitle>
          {
            choiceMore ?
            <MoreIcon onClick={choiceMoreData}>
              더보기<ArrowForwardIosIcon sx={{fontSize:'1rem'}}></ArrowForwardIosIcon>
            </MoreIcon>
            :
            <MoreIcon onClick={choiceMoreData}>
              <ArrowBackIosIcon sx={{fontSize:'1rem'}}></ArrowBackIosIcon>뒤로가기
            </MoreIcon>
          }
        </Titlediv>
        {
          choiceMore ?
          <CarouselContainer indicators={false}>
            <CarouselPaper elevation={0}>
              {
                choiceaniList[0] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[0]}></MyAniItem></Grid>
                : null
              }
              {
                choiceaniList[1] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[1]}></MyAniItem></Grid>
                : null
              }
              {
                choiceaniList[2] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[2]}></MyAniItem></Grid>
                : null
              }
              {
                choiceaniList[3] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[3]}></MyAniItem></Grid>
                : null
              }
            </CarouselPaper>
            <CarouselPaper elevation={1}>
            {
                choiceaniList[4] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[4]}></MyAniItem></Grid>
                : null
              }
              {
                choiceaniList[5] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[5]}></MyAniItem></Grid>
                : null
              }
              {
                choiceaniList[6] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[6]}></MyAniItem></Grid>
                : null
              }
              {
                choiceaniList[7] ?
                <Grid item xs={3}><MyAniItem aniData={choiceaniList[7]}></MyAniItem></Grid>
                : null
              }
            </CarouselPaper>
          </CarouselContainer> :
          <Grid container>
          { totalChoiceaniList ?
          
            ( totalChoiceaniList.map((item, idx) => (
              <Grid item xs={3}>
                <MyAniMoreItem key={idx} myAniData={item}/>
              </Grid>
              ))
            ) 
            : null
          }
          </Grid>
        }
        
      </MyAniContainer>

      <MyAniContainer>
        <Titlediv>
          <MyAniTitle>내가 좋아요한 작품 목록</MyAniTitle>
          {
            likeMore ?
            <MoreIcon onClick={likeMoreData}>
              더보기<ArrowForwardIosIcon sx={{fontSize:'1rem'}}></ArrowForwardIosIcon>
            </MoreIcon>
            :
            <MoreIcon onClick={likeMoreData}>
              <ArrowBackIosIcon sx={{fontSize:'1rem'}}></ArrowBackIosIcon>뒤로가기
            </MoreIcon>
          }
        </Titlediv>
        { likeMore ?
          <CarouselContainer indicators={false}>
            <CarouselPaper elevation={0}>
              {
                likeAniList[0] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[0]}></MyAniItem></Grid>
                : null
              }
              {
                likeAniList[1] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[1]}></MyAniItem></Grid>
                : null
              }
              {
                likeAniList[2] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[2]}></MyAniItem></Grid>
                : null
              }
              {
                likeAniList[3] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[3]}></MyAniItem></Grid>
                : null
              }
            </CarouselPaper>
            <CarouselPaper elevation={1}>
            {
                likeAniList[4] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[4]}></MyAniItem></Grid>
                : null
              }
              {
                likeAniList[5] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[5]}></MyAniItem></Grid>
                : null
              }
              {
                likeAniList[6] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[6]}></MyAniItem></Grid>
                : null
              }
              {
                likeAniList[7] ?
                <Grid item xs={3}><MyAniItem aniData={likeAniList[7]}></MyAniItem></Grid>
                : null
              }
            </CarouselPaper>
          </CarouselContainer> :
          <Grid container>
          { totalLikeAniList ?
          
            ( totalLikeAniList.map((item, idx) => (
              <Grid item xs={3}>
                <MyAniMoreItem key={idx} myAniData={item}/>
              </Grid>
              ))
            ) 
            : null
          }
          </Grid>

        }
        
      </MyAniContainer>
    </Container>
  )
}

export default MyAniList;
