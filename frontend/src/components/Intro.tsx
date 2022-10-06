import React from 'react'
import { NavLink } from "react-router-dom"

// image
import Member1 from '../assets/images/member1.png'
import Member2 from '../assets/images/member2.png'
import Member3 from '../assets/images/member3.png'
import Member4 from '../assets/images/member4.png'
import Member5 from '../assets/images/member5.png'
import Member6 from '../assets/images/member6.png'
import IntroBaseImg from '../assets/images/introImg.png'
import Intro1 from '../assets/images/introImg1.png'
import Intro2 from '../assets/images/introImg2.png'
import Intro3 from '../assets/images/introImg3.png'
import Intro4 from '../assets/images/introImg4.png'


// MUI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

// 모션
import { motion } from 'framer-motion'

// styled Component
import styled from "styled-components"

// 소개페이지 1
const PageIntro1 = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
`

// 소개페이지 2
const PageIntro2 = styled.div`
  background-color: #E3B55D;
  height: 100%;
  width: 100%;
`

// 소개페이지 3
const PageIntro3 = styled.div`
  background-color : #FFD1D1;
  width: 100%;
  height: 100%;
`

// 인트로 이미지
const IntroImg1 = styled.img`
  width: 60rem;
  height: 40rem;
  rotate: -25deg;
  margin-left: -5rem;
  margin-top: 2rem;
  border: 1px solid black;
`
const IntroImg2 = styled.img`
  width: 50rem;
  height: 25rem;
  rotate: 15deg;
  margin-left: -10rem;
  margin-top: 4rem;
`
const IntroImg3 = styled.img`
  width: 19rem;
  height: 30rem;
  rotate: 30deg;
  margin-left: 25rem;
  margin-top: -14rem;
`
const IntroImg4 = styled.img`
  width: 20rem;
  height: 35rem;
  rotate: -30deg;
  margin-right: 15rem;
  margin-top: -8rem;
`

// 메인으로 버튼
const PageButton = styled.button`
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.20);
  display: table-cell;

  & span {
  position: relative; 
  z-index: 1;

}

 &:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #f37b83;
  -webkit-transition: all .5s ease-in-out;
  transition: all .85s ease-in-out;
  -webkit-transform: translateX(-150%) translateY(-25%) rotate(45deg);
  transform: translateX(-150%) translateY(-25%) rotate(45deg);
}

  &:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
`

/** 소개 페이지 */
function Intro() {
  return (
    <div
      style={{
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
        width: '100%'
      }}
    >
      {/* 웹사이트 소개 */}
      <PageIntro1
        style={{ backgroundImage: `url(${IntroBaseImg})`}}
      >
        <Grid container
          sx={{
            paddingTop: '19rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <Grid item xs={3}>
            <h1 style={{ fontSize: '3rem' }}>더이상 애니 머 볼지 </h1>
            <h1 style={{ fontSize: '2rem' }}>고민 하지말고 츄 애니 원!</h1>
            <h3 style={{ fontSize: '1rem' }}>애니의 세상으로 함께 떠나보자고!</h3>
            <PageButton>
              <span>
                <NavLink to='/' style={{ color: 'white', textDecoration: 'none' }}>바로가기</NavLink>
              </span>
            </PageButton>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <iframe
              width="640px"
              height="350px"
              src="https://www.youtube.com/embed/ngQkkMlmzA8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </Grid>
        </Grid>
      </PageIntro1>
      {/* 기능소개 */}
      <PageIntro2
      >
        <motion.div
        >
          <Box component='div'
            sx={{
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <h1 style={{ fontSize: '3rem', color: 'white', marginTop: 0, paddingTop: '3rem' }}> Chu Ani One 은</h1>
            <h1 style={{ fontSize: '3rem', color: 'white', paddingBottom: '3rem' }}> 왜 사용해야 하나요?</h1>
          </Box>
        </motion.div>
        <Grid container maxWidth="xl"

        >
          <Grid container item xs={8} sx={{ justifyContent: 'end', paddingRight: '2rem' }}>
            <motion.div
              style={{ paddingBottom: '2rem' }}
            >
              <Box component='div'
                sx={{
                  width: '40rem',
                  height: '40rem',
                  backgroundColor: 'white',
                  borderRadius: '2rem',
                  padding: '3rem',
                  overflow: 'hidden',
                }}
              >

                <h1>누구에게나 딱 맞는 애니 맞춤 추천 서비스</h1>
                <Typography variant="body2" color="text.secondary">
                  봤던 애니에 리뷰를 달 경우 메인페이지에서 애니메이션을 추천 해드립니다!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  또한 선호하는 장르에 대한 애니메이션 추천도 따로 해드립니다!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: '1rem' }}>
                  흥미가 있는 애니메이션 클릭 시 유사한 애니메이션도 추천해드립니다!
                </Typography>
                <IntroImg1 src={Intro1}></IntroImg1>
              </Box>
            </motion.div>
          </Grid>
          <Grid container item xs={4} sx={{ justifyContent: 'start' }}>
            <motion.div
              style={{ paddingBottom: '2rem' }}
            >
              <Box component='div'
                sx={{
                  width: '30rem',
                  height: '27rem',
                  backgroundColor: '#FFF5E4',
                  borderRadius: '2rem',
                  padding: '3rem',
                  overflow: 'hidden',
                }}
              >

                <h1 style={{ color: '#f5af38' }}>자막 없이도 볼 수 있게 만드는 단어장</h1>
                <Typography variant="body2" color="#f5c26a">
                  리뷰를 달지 않더라도 전체 애니메이션 기준 총 단어 1000개 추천!!
                </Typography>
                <Typography variant="body2" color="#f5c26a">
                  리뷰를 달게 되면 해당 애니메이션 관련 자주 쓰이는 단어 추천!!
                </Typography>
                <Typography variant="body2" color="#f5c26a" sx={{ paddingBottom: '1rem' }}>
                  다 외운 단어를 체크시 단어장에서 사라지고 마이페이지에서 공부 가능!
                </Typography>
                <IntroImg2 src={Intro2}></IntroImg2>
              </Box>
            </motion.div>
          </Grid>
          <Grid container item xs={8} sx={{ justifyContent: 'end', paddingRight: '2rem' }}>
            <motion.div
              style={{ paddingBottom: '2rem' }}
            >
              <Box
                sx={{
                  width: '40rem',
                  height: '18rem',
                  backgroundColor: '#FFE3E1',
                  borderRadius: '2rem',
                  padding: '3rem',
                  overflow: 'hidden',
                }}>
                <h1 style={{ color: '#db7777' }}>애니 상세보기 다양한 기능 구현!</h1>
                <Typography variant="body2" color="#FF9494">
                  애니에 대한 줄거리 및 상세 정보 확인 가능
                </Typography>
                <Typography variant="body2" color="#FF9494">
                  리뷰를 통해 원하는 애니를 선택할 수 있고
                </Typography>
                <Typography variant="body2" color="#FF9494">
                  톡톡을 통해 같은 취향을 가진 사람들과 공감대 형성과
                </Typography>
                <Typography variant="body2" color="#FF9494">
                  애니와 비슷한 작품 추천까지
                </Typography>
                <IntroImg3 src={Intro3}></IntroImg3>
              </Box>
            </motion.div>
          </Grid>
          <Grid container item xs={4} sx={{ justifyContent: 'start' }}>
            <motion.div
              style={{ paddingBottom: '2rem' }}
            >
              <Box component='div'
                sx={{
                  position: 'relative',
                  top: '-35%',
                  width: '30rem',
                  height: '31rem',
                  backgroundColor: '#E1EFFF',
                  borderRadius: '2rem',
                  padding: '3rem',
                  overflow: 'hidden',
                  textAlign: 'right',
                }}
              >
                <h1 style={{ color: '#366087' }}>서로 비슷한 취향의 사람과의 오픈채팅</h1>


                <Typography variant="body2" color="#5D86D1">
                  본인이 원하는 태그를 만들고<br></br>방을 생성하여 취향이 유사한 사람들과<br></br>채팅을 할 수 있다.
                </Typography>
                <Typography variant="body2" color="#5D86D1" sx={{ paddingBottom: '1rem' }}>
                  마지막으로<br></br>이모지도 사용 가능!
                </Typography>
                <IntroImg4 src={Intro4}></IntroImg4>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </PageIntro2>

      {/* 팀원소개 */}
      <PageIntro3
        style={{ backgroundImage: `url(${IntroBaseImg})`}}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginTop: 0,
            paddingTop: '2rem',
            paddingBottom: '3rem',
            textAlign: 'center'
          }}
        >팀원 소개</h1>

        <Grid container
          sx={{
            paddingBottom: '2rem'
          }}
        >
          <Grid container item xs={12} md={6} xl={4} sx={{
            justifyContent: 'center',
            paddingBottom: '5rem'
          }}>
            <Card
              sx={{
                maxWidth: 345,
                textAlign: 'center'

              }}>
              <CardMedia
                component="img"
                height="234"
                image={Member2}
                alt="세영"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  사카모토 세영
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Back-End & 배포
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={12} md={6} xl={4} sx={{ justifyContent: 'center', paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="234"
                image={Member3}
                alt="유주"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  하츠네 유주
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Back-End
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={12} md={6} xl={4} sx={{ justifyContent: 'center', paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="234"
                image={Member1}
                alt="동운"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  타카키 동운
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Front-End & BigData
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={12} md={6} xl={4} sx={{ justifyContent: 'center', paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="234"
                image={Member5}
                alt="소영"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  아이자와 소영
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Back-End & BigData
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={12} md={6} xl={4} sx={{ justifyContent: 'center', paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="234"
                image={Member4}
                alt="승현"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  사사키 승현
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Front-End
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={12} md={6} xl={4} sx={{ justifyContent: 'center', paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="234"
                image={Member6}
                alt="창완"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  탄노 창완
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Front-End
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageIntro3>
    </div>

  )
}

export default Intro
