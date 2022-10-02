import React, { useState, useEffect, useRef } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
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
  height: calc(100vh - 4rem);
  width: calc(65vw - 6rem);

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
  height: 12rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  scroll-behavior: smooth;
`

const CarouselSection = styled.section`
  height: 80%;
  aspect-ratio: 4/3;
`





// const CarouselContainer = styled(Carousel)`
//   margin-bottom: 3rem;
// `

// const CarouselPaper = styled(Paper)`
//   width: 100%;
//   display: flex;
//   flex-direction: row; 
//   justify-content: center; 
//   align-items: center;
// `

// const CarouselImg = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: cover;
// `

// const CarouselImgIn = styled.img`
//   position: absolute;
//   left: 3.125em;
//   bottom: 11em;
//   max-width: 38.75em;
//   height: auto;
//   -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
//   box-sizing: inherit;
//   display: block;
// `

// const RecommendContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `

// const RecommendTitle = styled.h1`
//   margin-left: 4rem;
// `

// const RecommendBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-bottom: 1.5rem;
// `

// const RecommendImgBox = styled.div`
//   margin: 0.5rem;
//   height: 10.375em; 
//   position: relative;
//   overflow-y: hidden;
//   border-radius: 0.2rem;
// `
// const RecommendImg = styled.img`
//   width: 100%;
//   position: top;
//   object-fit: cover;
// `

// const RecommendName = styled.p`
//   margin: 0;
// `

// const styleBoxDetail = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '50%',
//   height: '90%',
//   bgcolor: 'background.paper',
//   borderRadius: '0.3rem',
//   border: 'none',
//   boxShadow: 24,
// }


function Main() {

  const dispatch = useDispatch<typeof store.dispatch>()

  const [data, setData] = useState<any>()

  const [openDetail, setOpenDetail] = useState<boolean>(false)

  const handleOpenDetail = () => setOpenDetail(true)
  const handleCloseDetail = () => setOpenDetail(false)

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
          { data ? 
            <CarouselContainer>
              { data.map((item, idx) => {
                <CarouselSection id={`section${idx}`}>
                  <div>{item.name}</div>
                </CarouselSection>
              })}
            </CarouselContainer>
          : null}
        </RightContainer>


        {/* <Modal
          open={openDetail}
          onClose={handleCloseDetail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBoxDetail}>
            <AniDetail aniId={item.ani_id} />
          </Box>
        </Modal> */}


        {/* 

        <RecommendContainer>
          <RecommendTitle>당신을 위한 추천 !</RecommendTitle>
          <CarouselContainer indicators={false}>
            <CarouselPaper elevation={0}>
              <RecommendBox onClick={handleOpenDetail}>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>

              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
            </CarouselPaper>

            <CarouselPaper elevation={0}>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
            </CarouselPaper>
          </CarouselContainer>
        </RecommendContainer>

        <RecommendContainer>
          <RecommendTitle>이번 추천은 ?!</RecommendTitle>
          <CarouselContainer indicators={false}>
            <CarouselPaper elevation={0}>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
            </CarouselPaper>

            <CarouselPaper elevation={0}>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
              <RecommendBox>
                <RecommendImgBox>
                  <RecommendImg src={recommend.img} />
                </RecommendImgBox>
                <RecommendName>{recommend.name}</RecommendName>
              </RecommendBox>
            </CarouselPaper>
          </CarouselContainer>
        </RecommendContainer> */}



      </motion.div>

    </Container>
  )
}

export default Main
