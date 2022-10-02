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


import { motion } from 'framer-motion'

// redux
import { useDispatch } from 'react-redux'
import store from '../store'
import { getAniAll } from '../store/anislice'


const Container = styled.div`
  width: 100%;
  height: 100%;
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
  /* background-color: aqua; */
  padding: 0 3rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  height: calc(100vh - 8rem);
  width: calc(65vw - 6rem);
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    /* background-color: ; */
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
  /* overflow: hidden; */
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


function Main() {


  const dispatch = useDispatch<typeof store.dispatch>()

  const [data, setData] = useState<any>()

  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [detailId, setDetailId] = useState<number | null>(null)

  const handleOpenDetail = (aniId) => {
    setOpenDetail(true)
    setDetailId(aniId)
  }
  
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  const carousel01 = useRef() as React.MutableRefObject<HTMLDivElement>
  const [now01X, setNow01X] = useState(0)

  useEffect(() => {
    if (carousel01 && carousel01.current) {
      carousel01.current.style.transform = `translateX(${now01X}vw)`
    }
  }, [now01X]) 

  const clickLeftButton = () => {
    setNow01X((prop) => prop + 19);
    console.log(`it's work ${now01X}`)
  }

  const clickRightButton = () => {
    setNow01X(now01X - 19)
    console.log(`it's work ${now01X}`)
  }

  useEffect(() => {
    loadData()
  }, [])


  async function loadData() {
    const res = await dispatch(getAniAll(1))
    if (res.meta.requestStatus==="fulfilled" && res.payload) {
      setData(res.payload.rDto)
      console.log(res.payload)
    }
  }

  const carouselImages: string[] = [
    'https://thumbnail.laftel.net/items/full/b54e5776-59b2-489c-8d7f-407cdad1a66c.jpg',
    'https://thumbnail.laftel.net/items/full/0f955696-79ea-4a92-a8a2-6c2b9021fd57.jpg',
    'https://thumbnail.laftel.net/items/full/83af4342-688c-4ab8-98f4-cfa946267f27.jpg',
    'https://thumbnail.laftel.net/items/full/456559d1-6b44-4e4c-894f-e1003c4934d1.jpg',
    'https://thumbnail.laftel.net/items/full/b88d779f-f25e-4722-a6de-8a124026379a.jpg',
  ]

  const carouselItem = (): JSX.Element | JSX.Element[] | undefined => {
    if (data) {
      const items = data.map((item, idx) => {

        return (
          <ItemDiv onClick={() => handleOpenDetail(item.ani_id)}>
            <ImgBox>
              <Img src={item.images[0].img_url}/>
            </ImgBox>
            <Name>{item.name}</Name>
          </ItemDiv>
        )
      })

      return items
    }
  }


  return (
    <Container>
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
        <LeftContainer>
          <Carousel
            navButtonsAlwaysVisible={false}
            indicators={false}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosNewIcon />}
            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                background: 'none',
              }
            }}
            animation={"slide"}
            interval={6000}
            duration={1000}
            swipe={true}
          >
            {carouselImages.map((item: string, idx: number) => (
              <CarouselPaper elevation={0}>
                <CarouselImg src={item} />
              </CarouselPaper>
            ))}
          </Carousel>
        </LeftContainer>
        
        <RightContainer>
          <CarouselContainer>
            <CarouselTitle>당신을 위한 추천 !</CarouselTitle>
            { now01X !== 0 ?
              <Left onClick={clickLeftButton}>
                <Btn>
                  <ArrowBackIosNewIcon />
                </Btn>
              </Left>
            : null }
            { now01X < -95 ?
              null
            :
              <Right onClick={clickRightButton}>
                <Btn>
                  <ArrowForwardIosIcon />
                </Btn>
              </Right>
            }
            <CarouselDiv ref={carousel01}>
              { carouselItem() }
            </CarouselDiv>
          </CarouselContainer>

        </RightContainer>
        
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
