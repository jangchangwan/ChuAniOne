import React, { useEffect } from 'react';
// 이미지 불러오기
import BigvocaImg from "../assets/images/bigvoca.png";
import MainImg from "../assets/images/main.png";
import OpenchatImg from "../assets/images/openchat.png";
import Member1 from '../assets/images/member1.png'
import Member2 from '../assets/images/member2.png'
import Member3 from '../assets/images/member3.png'
import Member4 from '../assets/images/member4.png'
import Member5 from '../assets/images/member5.png'
import Member6 from '../assets/images/member6.png'
import IntroBackground3 from '../assets/images/introBackground3.png'
// CSS
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// 모션
import { motion, useScroll } from 'framer-motion';


const PageIntro1 = styled.div`
  background-color : #FFD1D1;
  width: 100%;
  height: 100vh;
  padding: 0;
`
const PageIntro2 = styled.div`
  height: 100vh;
`
const PageIntro3 = styled.div`
  height: 100vh;
`

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

function Intro() {
  // const { scrollYProgress } = useScroll()
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     console.log(scrollYProgress);
  //   });
  //   return () => {
  //     window.removeEventListener('scroll', () => {});
  //   } 
  // }, []);
  return (
    <Container
      sx={{
        padding: 0,
        width: '100%'
      }}
    >
      
      {/* 웹사이트 소개 */}
      <PageIntro1>
        <Grid container
          sx={{
            paddingTop: '12rem',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
          <Grid item xs={3}>
          <h1>더이상 애니 머 볼지 </h1>
          <h1>고민 하지말고 츄 애니 원!</h1>
          <h3>애니의 세상으로 함께 떠나보자고</h3>
          <PageButton>
            <span>
              <NavLink to='/' style={{ color:'white', textDecoration : 'none'}}>바로가기</NavLink>
            </span> 
          </PageButton>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <iframe 
              width="440px" 
              height="250px" 
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
        style={{ height: '220vh'}}
        >
        <motion.div
        >
          <Box component='div'
            sx={{
              position: 'relative',
              left: '5%'
            }}
          >
            <h1> Chu Ani One 은</h1>
            <h2> 애니 쉽게 접근할 수 있는</h2>
            <h2> 확실한 웹사이트</h2>
          </Box>
        </motion.div>
        
        <motion.div>
          <Box component='div'
            sx={{
              position: 'relative',
              right: '-50%',
              top: '-5%',
              width: '30rem',
              height: '30rem',
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem',
              padding : '1rem',
            }}
          >
            <img 
              src={MainImg} 
              alt="메인 이미지" 
              style={{
                width: '30rem',
              }}
            />
            <h3>누구에게나 딱 맞는 애니 맞춤 추천 서비스</h3>
            <p>인간은 인간의 유소년에게서 구할 찾아 이상의 그들에게 불어 있는 운다. 
              방황하였으며, 별과 오직 살 사라지지 이상의 하는 소리다.이것은 싸인 것이다. 
              가진 새 끝에 그들은 밥을 그들은 속잎나고, 두기 아니다.</p>
            <PageButton>
              <span>
                <NavLink to='/' style={{ color:'white', textDecoration : 'none'}}>바로가기</NavLink>
              </span> 
            </PageButton>
          </Box>
        </motion.div>
        
        <motion.div>
          <Box component='div'
            sx={{
              position: 'relative',
              left: '5%',
              top: '-5%',
              width: '25rem',
              height: '29rem',
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem',
              padding:'1rem'
            }}
          >
            <img src={BigvocaImg} alt="빅보카 이미지" style={{
                width: '25rem',
              }}/>
            <h3>자막 없이도 볼 수 있게 만드는 단어장</h3>
            <p>것은 그들의 갑 낙원을 있음으로써 이상 할지라도 피다. 
              그림자는 동산에는 인도하겠다는 거친 것이다. 
              발휘하기 찾아 가는 천자만홍이 할지니, 속에서 모래뿐일 이것을 피어나는 것이다.
            </p>  
            <PageButton>
              <span>
                <NavLink to='/bigvoca' style={{ color:'white', textDecoration : 'none'}}>바로가기</NavLink>
              </span> 
            </PageButton>
          </Box>
        </motion.div>
        
        <motion.div>
          <Box component='div'
            sx={{
              position: 'relative',
              right: '-50%',
              top: '-5%',
              width: '25rem',
              height: '31rem',
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem',
              padding: '1rem'
            }}
          >
            <img src={OpenchatImg} alt="오픈채팅 이미지" style={{
                width: '25rem',
              }}/>
            <h3>서로 비슷한 애니 취향의 사람과의 오픈채팅</h3>
            <p>
              인간은 인간의 유소년에게서 구할 찾아 이상의 그들에게 불어 있는 운다. 
              방황하였으며, 별과 오직 살 사라지지 이상의 하는 소리다.이것은 싸인 것이다. 
              가진 새 끝에 그들은 밥을 그들은 속잎나고, 두기 아니다.
            </p>
            <PageButton>
              <span>
                <NavLink to='/openchat' style={{ color:'white', textDecoration : 'none'}}>바로가기</NavLink>
              </span> 
            </PageButton>
          </Box>
        </motion.div>
        
      </PageIntro2>

      {/* 팀원소개 */}
      <PageIntro3
        style={{backgroundImage:`url(${IntroBackground3})`}}
      >
        <h1
          style={{ paddingBottom: '5rem'}}
        >팀원 소개</h1>

        <Grid container
          sx={{paddingBottom: '2rem'}}
        >
          <Grid item xs={12} md={6} xl={4} sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345 }}>
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
          <Grid item xs={12} md={6} xl={4} sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345 }}>
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
          <Grid item xs={12} md={6} xl={4} sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345 }}>
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
          <Grid item xs={12} md={6} xl={4} sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345 }}>
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
          <Grid item xs={12} md={6} xl={4} sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345 }}>
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
          <Grid item xs={12} md={6} xl={4} sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ maxWidth: 345 }}>
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
    </Container>
    

  );
}

export default Intro;
