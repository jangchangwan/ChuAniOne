import React, { useState, useEffect, useRef } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, IconButton } from '@mui/material'
import styled from "styled-components"
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import AniDetail from './ani/AniDetail'
import './Main.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import backImg from '../assets/images/mainImg.png'

import { motion } from 'framer-motion'

// redux
import { useDispatch } from 'react-redux'
import store from '../store'
import { getMain } from '../store/anislice'


const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${backImg});
  background-size: cover;
`

const LeftContainer = styled.div`
  height: 100vh;
  width: 35vw;
`

const CarouselPaper = styled(Paper)`
  width: 100%;
  height: 100vh;
`

const CarouselImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const RightContainer = styled.div`
  padding: 0 3rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  height: calc(100vh - 8rem);
  width: calc(65vw - 6rem);
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background-color: #f37b83;
    height: 30%;
    box-shadow: inset 0px 0px 3px white;
  }

  ::-webkit-scrollbar-track {
    background-color: #ffcdce;
    box-shadow: inset 0px 0px 3px white;
  }
`

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const CarouselTitle = styled.h1`
  margin-bottom: 0;
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

/** 메인페이지 */
function Main() {
  const dispatch = useDispatch<typeof store.dispatch>()

  /** 추천 애니메이션 데이터 */
  const [data, setData] = useState<any>()

  /**
    openDetail: 상세페이지 모달
    detailId: 상세페이지가 열려있는 애니메이션 id
    arr: data 중 보여줄 데이터 랜덤 선택
  **/
  const [openDetail, setOpenDetail] = useState<boolean>(false)  
  const [detailId, setDetailId] = useState<number | null>(null)
  const [arr, setArr] = useState<string[]>([])
  
  // title: data의 key에 따른 제목
  const title = {
    '0': '판타지 액션',    // 판타지 액션
    '1': '드라마 로맨스',  // 드라마 로맨스
    '2': '모험 무협',      // 모험 무협
    '3': '이세계 판타지',  // 이세계 판타지
    '4': '모험 SF',        // 모험 SF
    '5': '스포츠 드라마',  // 스포츠 드라마
    '6': '공포 스릴러',    // 공포 스릴러
    '7': '치유',           // 치유 
    '8': '음악 로맨스',    // 음악 로맨스 
    '9': '음식 일상',      // 음식 일상
    '10': '개그 하렘',     // 개그 하렘
    '11': '내 이름은 코난, 탐정이죠 !', // 추리
    '12': '내가 찾던 게 바로 이거잖아',
  }


  /** 상세페이지 모달 열기(aniId) */
  const handleOpenDetail = (aniId) => {
    setOpenDetail(true)
    setDetailId(aniId)
  }
  
  /** 상세페이지 모달 닫기 */
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  // 추천작 캐러셀
  const carousel00 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel01 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel02 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel03 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel04 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel05 = useRef() as React.MutableRefObject<HTMLDivElement>
  const carousel06 = useRef() as React.MutableRefObject<HTMLDivElement>

  // 캐러셀 좌우이동 값
  const [now00X, setNow00X] = useState(0)
  const [now01X, setNow01X] = useState(0)
  const [now02X, setNow02X] = useState(0)
  const [now03X, setNow03X] = useState(0)
  const [now04X, setNow04X] = useState(0)
  const [now05X, setNow05X] = useState(0)
  const [now06X, setNow06X] = useState(0)

  // 캐러셀 좌우값 변화에 따라 transform
  useEffect(() => {
    if (carousel00 && carousel00.current) {
      carousel00.current.style.transform = `translateX(${now00X}vw)`
    }
  }, [now00X]) 

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

  useEffect(() => {
    if (carousel04 && carousel04.current) {
      carousel04.current.style.transform = `translateX(${now04X}vw)`
    }
  }, [now04X]) 

  useEffect(() => {
    if (carousel05 && carousel05.current) {
      carousel05.current.style.transform = `translateX(${now05X}vw)`
    }
  }, [now05X]) 

  useEffect(() => {
    if (carousel06 && carousel06.current) {
      carousel06.current.style.transform = `translateX(${now06X}vw)`
    }
  }, [now06X]) 


  // 데이터 불러오기
  useEffect(() => {
    loadData()
    shuffle()
  }, [])

  /** 애니메이션 데이터 불러오기 */
  async function loadData() {
    const res = await dispatch(getMain())
    if (res.meta.requestStatus==="fulfilled" && res.payload) {
      setData(res.payload)
    }
  }

  /** 데이터 랜덤 섞기 */
  function shuffle() {
    const array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    setArr(array.slice(0, 6))
}


  /** 좌측 캐러셀 이미지 */
  const carouselImages = [ 
    { id: 38912,
      img: 'https://thumbnail.laftel.net/items/full/b54e5776-59b2-489c-8d7f-407cdad1a66c.jpg',
    },
    { id: 40815,
      img: 'https://thumbnail.laftel.net/items/full/0f955696-79ea-4a92-a8a2-6c2b9021fd57.jpg',
    },
    { id: 40394,
      img: 'https://thumbnail.laftel.net/items/full/83af4342-688c-4ab8-98f4-cfa946267f27.jpg',
    },
    { id: 24485,
      img:  'https://thumbnail.laftel.net/items/full/456559d1-6b44-4e4c-894f-e1003c4934d1.jpg',
    },
    { id: 34318,
      img: 'https://thumbnail.laftel.net/items/full/b88d779f-f25e-4722-a6de-8a124026379a.jpg',
    },
  ]

  return (
    <Container>
      {/* 시작 애니메이션 */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 0,
          transitionEnd: {
            display: "none"
          }
        }}
        exit={{display:'none'}}
        transition={{ duration: '4' }}
      >
        <div className="animation01">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="animation02">
          <div></div>
          <div></div>
        </div>
        <div className="animation03">
          <div className="circle">
            <div className="circle_element01"></div>
          </div>
          <div className="circle">
            <div className="circle_element02"></div>
          </div>
          <div className="circle">
            <div className="circle_element03"></div>
          </div>
          <div className="animation04">
            <div className="line_wrapper line_wrapper01">
              <span className="line line01"></span>
            </div>
            <div className="rotate45">
              <div className="line_wrapper line_wrapper02">
                <span className="line line02"></span>
              </div>
            </div>
            <div className="line_wrapper line_wrapper03">
              <span className="line line03"></span>
            </div>
            <div className="rotate135">
              <div className="line_wrapper line_wrapper04">
                <span className="line line04"></span>
              </div>
            </div>
            <div className="line_wrapper line_wrapper05">
              <span className="line line05"></span>
            </div>
            <div className="rotate-135">
              <div className="line_wrapper line_wrapper06">
                <span className="line line06"></span>
              </div>
            </div>
            <div className="line_wrapper line_wrapper07">
              <span className="line line07"></span>
            </div>
            <div className="rotate-45">
              <div className="line_wrapper line_wrapper08">
                <span className="line line08"></span>
              </div>
            </div>
          </div>
          <div className="animation05">
            <div className="double_wrapper02 green02">
              <div className="double_wrapper01 green01">
                <div className="double_block green00"></div>
              </div>
            </div>
            <div className="double_wrapper02 navy02">
              <div className="double_wrapper01 navy01">
                <div className="double_block navy00"></div>
              </div>
            </div>
            <div className="double_wrapper02 yellow02">
              <div className="double_wrapper01 yellow01">
                <div className="double_block yellow00"></div>
              </div>
            </div>
            <div className="double_wrapper02 blue02">
              <div className="double_wrapper01 blue01">
                <div className="double_block blue00"></div>
              </div>
            </div>
            <div className="double_wrapper02 red02">
              <div className="double_wrapper01 red01">
                <div className="double_block red00"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="animation06">
          <div className="rhombus05">
            <div className="rhombus04">
              <div className="rhombus03">
                <div className="rhombus02">
                  <div className="rhombus01"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="animation07">
          <div className="circle">
            <div className="circle_element01"></div>
          </div>
          <div className="line_wrapper line_wrapper01">
            <span className="line line01"></span>
          </div>
          <div className="rotate60">
            <div className="line_wrapper line_wrapper02">
              <span className="line line02"></span>
            </div>
          </div>
          <div className="rotate120">
            <div className="line_wrapper line_wrapper03">
              <span className="line line03"></span>
            </div>
          </div>
          <div className="line_wrapper line_wrapper04">
            <span className="line line04"></span>
          </div>
          <div className="rotate-120">
            <div className="line_wrapper line_wrapper05">
              <span className="line line05"></span>
            </div>
          </div>
          <div className="rotate-60">
            <div className="line_wrapper line_wrapper06">
              <span className="line line06"></span>
            </div>
          </div>
        </div>
      
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}

        transition={{ duration: '7' }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

        {/* 좌측 캐러셀 */}
        <LeftContainer>
          <Carousel
            navButtonsAlwaysVisible={false}
            indicators={false}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosNewIcon />}
            navButtonsProps={{
              style: {
                background: 'none',
              }
            }}
            animation={"slide"}
            interval={6000}
            duration={1000}
            swipe={true}
          >
            {carouselImages.map((item, idx) => (
              <CarouselPaper key={idx} elevation={0} onClick={()=>handleOpenDetail(item.id)}>
                <CarouselImg src={item.img} />
              </CarouselPaper>
            ))}
          </Carousel>
        </LeftContainer>
        
        <RightContainer>
          {/* 추천 애니메이션 */}
          { data && data['12'] ? 
            <CarouselContainer>
              <CarouselTitle>{title['12']}</CarouselTitle>
              { now00X !== 0 ?
                <Left onClick={() => setNow00X((prop) => prop + 18)}>
                  <Btn><ArrowBackIosNewIcon /></Btn>
                </Left>
              : null }
              { now00X < -126 ? null :
                <Right onClick={() => setNow00X(now00X - 18)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel00}>
                { data['12'].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          : null }

          {/* 0번 */}
          { data && arr ? (
            <CarouselContainer>
              <CarouselTitle>{title[arr[0]]}</CarouselTitle>
              { now01X !== 0 ?
                <Left onClick={() => setNow01X((prop) => prop + 17)}>
                  <Btn>
                    <ArrowBackIosNewIcon />
                  </Btn>
                </Left>
              : null }
              { now01X < -68 ? null :
                <Right onClick={() => setNow01X(now01X - 17)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel01}>
                { data[arr[0]].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          ) : null}

          {/* 1번 */}
          { data && arr ? (
            <CarouselContainer>
              <CarouselTitle>{title[arr[1]]}</CarouselTitle>
              { now02X !== 0 ?
                <Left onClick={() => setNow02X((prop) => prop + 17)}>
                  <Btn>
                    <ArrowBackIosNewIcon />
                  </Btn>
                </Left>
              : null }
              { now02X < -68 ? null :
                <Right onClick={() => setNow02X(now02X - 17)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel02}>
                { data[arr[1]].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          ) : null}

          {/* 2번 */}
          { data && arr ? (
            <CarouselContainer>
              <CarouselTitle>{title[arr[2]]}</CarouselTitle>
              { now03X !== 0 ?
                <Left onClick={() => setNow03X((prop) => prop + 17)}>
                  <Btn>
                    <ArrowBackIosNewIcon />
                  </Btn>
                </Left>
              : null }
              { now03X < -68 ? null 
                :
                <Right onClick={() => setNow03X(now03X - 17)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel03}>
                { data[arr[2]].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          ) : null}

          {/* 3번 */}
          { data && arr ? (
            <CarouselContainer>
              <CarouselTitle>{title[arr[3]]}</CarouselTitle>
              { now04X !== 0 ?
                <Left onClick={() => setNow04X((prop) => prop + 17)}>
                  <Btn>
                    <ArrowBackIosNewIcon />
                  </Btn>
                </Left>
              : null }
              { now04X < -68 ? null :
                <Right onClick={() => setNow04X(now04X - 17)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel04}>
                { data[arr[3]].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          ) : null}

          {/* 4번 */}
          { data && arr ? (
            <CarouselContainer>
              <CarouselTitle>{title[arr[4]]}</CarouselTitle>
              { now05X !== 0 ?
                <Left onClick={() => setNow05X((prop) => prop + 17)}>
                  <Btn>
                    <ArrowBackIosNewIcon />
                  </Btn>
                </Left>
              : null }
              { now05X < -68 ? null :
                <Right onClick={() => setNow05X(now05X - 17)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel05}>
                { data[arr[4]].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          ) : null}

          {/* 5번 */}
          { data && arr ? (
            <CarouselContainer>
              <CarouselTitle>{title[arr[5]]}</CarouselTitle>
              { now06X !== 0 ?
                <Left onClick={() => setNow06X((prop) => prop + 17)}>
                  <Btn>
                    <ArrowBackIosNewIcon />
                  </Btn>
                </Left>
              : null }
              { now06X < -68 ? null :
                <Right onClick={() => setNow06X(now06X - 17)}>
                  <Btn><ArrowForwardIosIcon /></Btn>
                </Right>
              }
              <CarouselDiv ref={carousel06}>
                { data[arr[5]].map((item, idx) => (
                  <ItemDiv key={idx} onClick={() => handleOpenDetail(item.ani_id)} >
                    <ImgBox>
                      <Img src={item.images[0].img_url}/>
                    </ImgBox>
                    <Name>{item.name}</Name>
                  </ItemDiv>
                ))}
              </CarouselDiv>
            </CarouselContainer>
          ) : null}

        </RightContainer>
        
        {/* 상세 페이지 모달 */}
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

      </motion.div>
    </Container>
  )
}

export default Main
