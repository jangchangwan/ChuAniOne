import { NavLink } from "react-router-dom"
import styled from "styled-components"
import logoicon from '../assets/images/logo2.png'
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// redux
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout, logoutUser, resetUser, myinfo } from '../store/Loginslice'
import initialState from '../store/Loginslice'
import store from '../store'

// Nav 전체 틀
const NavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  z-index: 999;
  align-items: center;
  transition-timing-function: ease-in;
  transition: all 0.5s;
`

// 로고 이미지
const LogoImg = styled.img`
  position: fixed;
  left: 0.5%;
  top: -6%;
  width: 10rem;
  height: auto;
  object-fit: contain;
  background-color: 'transparent';
`

const NavGrid = styled(Grid)`
  &:hover Navhref{
    scale: 1.2;
    transition: 0.5s;
  }
`

const Navhref = styled(NavLink)`
  text-decoration : none;
  color: black;
  font-weight: 700;
  margin-left: 2rem;

  &:hover{
    scale: 1.2;
    transition: 0.5s;
  }

`

//채팅목록 불러오기


function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()
  // 로그인 유무
  const logincheck = useSelector((state: initialState) => state.login.isLogin)
  const [profileImg, setProfileImg] = useState('')
  // 네비게이션바 위치
  const [show, setShow] = useState(false)
  // 네비게이션바 유무
  const [showNav, setShowNav] = useState(false)
  const [showLogo, setShowLogo] = useState(true)
  const [User, setUser] = React.useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUser(null);
  };
  // // 회원정보 받아오기
  // useEffect(() => {
  //   dispatch(myinfo())
  //     .then((response:any) => {
  //       const data = response.payload.data

  //     }).catch((e) => {
  //       console.log(e);
        
  //     })
  // },[])
  // 로그아웃
  const gologout = () => {
    
    dispatch(logout())
      .then(() => {
        dispatch(logoutUser())
        dispatch(resetUser())
        navigate('/login')
      }  
    )
  }
  // 마이페이지 이동
  const goMypage = () => {
    navigate('/mypage')
  }
  // 메인으로 이동
  const goMain = () => {
    navigate('/')
  }
  // 스크롤 내릴시 Nav 배경색 변화
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => { });
    }
  }, []);

  // 네브바 감지
  useEffect(() => {
    if (window.location.pathname === '/intro') {
      setShowNav(false)
    } else if (window.location.pathname === '/search') {
      setShowNav(false)
    } else if (window.location.pathname === '/openchat') {
      setShowNav(false)
    } else if (window.location.pathname === '/bigvoca') {
      setShowNav(false)
    } else if (window.location.pathname === '/mypage') {
      setShowNav(false)
    } else if (window.location.pathname === '/') {
      setShowNav(false)
    } else {
      setShowNav(true)
    }

    
  }, [window.location.pathname]);
  // 너비시 변환
  useEffect(() => {
    window.addEventListener("resize", function () {
      const body = document.querySelector('body')
      if (body) {
        const logoWidth = body.getBoundingClientRect().width
        if (logoWidth > 900) {
          setShowLogo(true)
        } else {
          setShowLogo(false)
        }
      }
    })

  }, []);

  return (
    <NavContainer style={show ? { backgroundColor: '#f37b83' } : { backgroundColor: 'transparent' }} >

      {
        showNav ?
          <div></div>
          :
          <div>
            <Grid
              container
            >

              <Grid
                item xs={0} md={2}
                sx={{
                  marginTop: '1rem'
                }}
              >
                {
                  showLogo ?
                    <LogoImg
                      src={logoicon}
                      alt="Logo"
                      onClick={goMain}
                    />
                    :
                    <div></div>
                }

              </Grid>
              <NavGrid
                item md={9}
                sx={{
                  marginTop: '1rem'
                }}
              >
                <Navhref className='test' style={show ? { color: 'white' } : { color: 'black' }} to="/">메인</Navhref>
                <Navhref style={show ? { color: 'white' } : { color: 'black' }} to="/intro">소개</Navhref>
                <Navhref style={show ? { color: 'white' } : { color: 'black' }} to="/search">검색</Navhref>
                {
                  logincheck ?
                  <Navhref style={show ? { color: 'white' } : { color: 'black' }} to="/openchat">오픈채팅</Navhref>
                  : null
                }
                {
                  logincheck ?
                  <Navhref style={show ? { color: 'white' } : { color: 'black' }} to="/bigvoca">빅보카</Navhref>
                  : null
                }
              </NavGrid>

              {/* 로그인 유무에 따른 변화 */}
              <Grid
                item md={1}
                style={logincheck ? { marginTop: '0.5rem' } : { marginTop: '1rem', }}
              >
                {
                  logincheck ?
                    <Box sx={{ flexGrow: 0, textAlign: 'center' }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, paddingBottom: '0.5rem' }}>
                          {
                          profileImg ?
                          <img src={profileImg} alt="프로필사진" style={{ width:'1rem', height: '1rem'}}/>
                          :
                          <AccountCircleIcon 
                            sx={{ 
                              fontSize: '3rem',
                          }}/>
                          }
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={User}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(User)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" onClick={goMypage}>마이페이지</Typography>

                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" onClick={gologout}>로그아웃</Typography>
                        </MenuItem>

                      </Menu>
                    </Box>
                    :
                    <Navhref style={show ? { color: 'white' } : { color: 'black' }} to="/login">로그인</Navhref>
                }
              </Grid>
            </Grid>
          </div>

      }
    </NavContainer>
  );
}
export default Nav;
