import React, {useState, useEffect, useRef} from 'react'

// 하위컴포넌트
import MyAniMoreItem from './MyAniMoreItem'
import AniDetail from '../ani/AniDetail'

// MUI
import styled from 'styled-components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { IconButton } from '@mui/material'

// Redux
import { useDispatch } from 'react-redux'
import {
  getMyAniList,
  getChoiceAniList,
  getLikeAniList,
  getWatchAniList
} from '../../store/mypageslice'
import store from '../../store'


// Total Container
const Container = styled.div`
  overflow-x: hidden;
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

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const CarouselDiv = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  align-items: center;
  scroll-behavior: smooth;
  transition: transform 0.5s;

`

const Left = styled.div`
  position: absolute;
  top: 50%;
  left: 0%;
  color: white;
  z-index: 2;
`

const Right = styled.div`
  position: absolute;
  top: 50%;
  right: 0%;
  color: white;
  z-index: 2;
`

const Btn = styled(IconButton)`
  color: white !important;
`

const ItemDiv = styled.div`
  height: 100%;
  aspect-ratio: 7/6;
  margin-right: 1rem;
  cursor: pointer;
`

const ImgBox = styled.div`
  margin-top: 0.5rem;
  height: 70%;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
`

const Name = styled.p`
  margin: 0;
  margin-left: 0.5rem;
`

// 상세페이지
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

/** 마이 애니 리스트 */
function MyAniList() {
  const dispatch = useDispatch<typeof store.dispatch>()

  // 상세페이지 연동
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [detailId, setDetailId] = useState<number | null>(null)

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

  /** 상세페이지 켜기 */ 
  const handleOpenDetail = (aniId) => {
    setOpenDetail(true)
    setDetailId(aniId)
  }
  /** 상세페이지 끄기 */ 
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  // 캐러셀 이동
  const carousel01 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel02 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel03 = useRef() as React.MutableRefObject<HTMLDivElement>
  const [now01X, setNow01X] = useState(0)
  const [now02X, setNow02X] = useState(0)
  const [now03X, setNow03X] = useState(0)

  useEffect(() => {
    if (carousel01 && carousel01.current) {
      carousel01.current.style.transform = `translateX(${now01X}vw)`
    }
  }, [now01X])

  useEffect(() => {
    if (carousel02 && carousel02.current) {
      carousel02.current.style.transform = `translateX(${now02X}vw)`
    }
  }, [now02X])

  useEffect(() => {
    if (carousel03 && carousel03.current) {
      carousel03.current.style.transform = `translateX(${now03X}vw)`
    }
  }, [now03X]) 

  /** 리뷰 캐러셀 왼쪽 이동 */
  const clickLeftButton = () => {
    setNow01X((prop) => prop + 13.5)
    console.log(`it's work ${now01X}`)
  }

  /** 리뷰 캐러셀 오른쪽 이동 */
  const clickRightButton = () => {
    setNow01X(now01X - 13.5)
    console.log(`it's work ${now01X}`)
  }

  /** 찜 케러셀 왼쪽 이동 */
  const clickLeftButton2 = () => {
    setNow02X((prop) => prop + 13.5)
    console.log(`it's work ${now02X}`)
  }

  /** 찜 캐러셀 오른쪽 이동 */
  const clickRightButton2 = () => {
    setNow02X(now02X - 13.5)
    console.log(`it's work ${now02X}`)
  }

  /** 좋아요 캐러셀 왼쪽 이동 */
  const clickLeftButton3 = () => {
    setNow03X((prop) => prop + 13.5)
    console.log(`it's work ${now03X}`)
  }

  /** 좋아요 캐러셀 오른쪽 이동 */
  const clickRightButton3 = () => {
    setNow03X(now03X - 13.5)
    console.log(`it's work ${now03X}`)
  }

  /** 애니데이터 불러오기 */
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

  /** 리뷰 더보기 버튼 */
  const watchMoreData = () =>{
    if (watchMore) {
      setWatchMore(false)
    } else {
      setWatchMore(true)
    }
  }
  
  /** 찜 더보기 버튼 */
  const choiceMoreData = () =>{
    if (choiceMore) {
      setChoiceMore(false)
    } else {
      setChoiceMore(true)
    }
  }

  /** 좋아요 더보기 버튼 */
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
      { watchMore && watchaniList ?
        <CarouselContainer>
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
        { now01X !== 0 ?
          <Left onClick={clickLeftButton}>
            <Btn>
              <ArrowBackIosNewIcon />
            </Btn>
          </Left>
        : null }
        { now01X < -60 ?
          null
        :
          <Right onClick={clickRightButton}>
            <Btn>
              <ArrowForwardIosIcon />
            </Btn>
          </Right>
        }
        <CarouselDiv ref={carousel01}>
          { watchaniList.map((item, idx) => (
            <ItemDiv onClick={() => handleOpenDetail(item.ani_id)}>
              <ImgBox>
                <Img src={item.images[0].img_url}/>
              </ImgBox>
              <Name>{item.name}</Name>
            </ItemDiv>
          ))}
        </CarouselDiv>
        </CarouselContainer>
        : 
        <CarouselContainer>
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
        </CarouselContainer>
      }

      { choiceMore ?
        <CarouselContainer>
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
        { now02X !== 0 ?
          <Left onClick={clickLeftButton2}>
            <Btn>
              <ArrowBackIosNewIcon />
            </Btn>
          </Left>
        : null }
        { now02X < -70 ?
          null
        :
          <Right onClick={clickRightButton2}>
            <Btn>
              <ArrowForwardIosIcon />
            </Btn>
          </Right>
        }
        <CarouselDiv ref={carousel02}>
          { choiceaniList.map((item, idx) => (
            <ItemDiv onClick={() => handleOpenDetail(item.ani_id)}>
              <ImgBox>
                <Img src={item.images[0].img_url}/>
              </ImgBox>
              <Name>{item.name}</Name>
            </ItemDiv>
          ))}
        </CarouselDiv>
        </CarouselContainer>
        : 
        <CarouselContainer>
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
        </CarouselContainer>
      }
      { likeMore ?
        <CarouselContainer>
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
        { now03X !== 0 ?
          <Left onClick={clickLeftButton3}>
            <Btn>
              <ArrowBackIosNewIcon />
            </Btn>
          </Left>
        : null }
        { now03X < -70 ?
          null
        :
          <Right onClick={clickRightButton3}>
            <Btn>
              <ArrowForwardIosIcon />
            </Btn>
          </Right>
        }
        <CarouselDiv ref={carousel03}>
          { likeAniList.map((item, idx) => (
            <ItemDiv onClick={() => handleOpenDetail(item.ani_id)}>
              <ImgBox>
                <Img src={item.images[0].img_url}/>
              </ImgBox>
              <Name>{item.name}</Name>
            </ItemDiv>
          ))}
        </CarouselDiv>
        </CarouselContainer>
        : 
        <CarouselContainer>
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
        </CarouselContainer>
      }


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
  )
}

export default MyAniList
