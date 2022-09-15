import { NavLink } from "react-router-dom";
import styled from "styled-components"
import logoicon from '../assets/images/Logo.png'
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

// redux
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout, logoutUser } from '../components/accounts/Loginslice'
import initialState from '../components/accounts/Loginslice';
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
  left: 0;
  width: 5rem;
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
  // 네비게이션바 유무
  const [show, setShow] =useState(false);
  
  
  // 
  const [User, setUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    // console.log(setUser);
    setUser(null);
  };

  const gologout = () => {
    dispatch(logout())
     .then(() => navigate('/login')) 
    dispatch(logoutUser())
  }
  const goMypage = () => {
    navigate('/mypage')
  }
  // 스크롤 내릴시 Nav 배경색 변화
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        console.log(logincheck);
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    }
  }, []);
  // 로그인 , 회원가입, 비밀번호 찾기 인 경우 네비게이션 바 없애기
  // if (window.location.pathname === '/login') return null;
  // else if (window.location.pathname === '/signup') return null;
  // else if (window.location.pathname === '/pwd') return null;

  return (
    <NavContainer style={ show ? { backgroundColor: '#f37b83'}  : {backgroundColor: 'transparent'}} >
      <LogoImg
        src={logoicon}
        alt="Logo"
        onClick={() => window.location.reload()}
      />
      <Grid 
        container
        >
        <Grid 
          item xs={1}
          sx={{
            marginTop: '1rem'
          }}
        >
        </Grid>
        <NavGrid 
          item xs={10}
          sx={{
            marginTop: '1rem'
          }}
        >
          <Navhref className='test' style={ show ? { color: 'white'}  : {color: 'black'}} to="/">메인</Navhref>
          <Navhref style={ show ? { color: 'white'}  : {color: 'black'}} to="/intro">소개</Navhref>
          <Navhref style={ show ? { color: 'white'}  : {color: 'black'}} to="/search">검색</Navhref>
          
          <Navhref style={ show ? { color: 'white'}  : {color: 'black'}} to="/openchat">오픈채팅</Navhref>
          <Navhref style={ show ? { color: 'white'}  : {color: 'black'}} to="/bigvoca">빅보카</Navhref>
        </NavGrid>

        {/* 로그인 유무에 따른 변화 */}
        <Grid 
          item xs={1}
          sx={{
            marginTop: '1rem',
          }}
        >
          {
            logincheck ? 
            <Box sx={{ flexGrow: 0, textAlign: 'center' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, paddingBottom: '0.5rem'}}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
            <Navhref style={ show ? { color: 'white'}  : {color: 'black'}} to="/login">로그인</Navhref>
          }
        </Grid>
      </Grid>
      
      
    </NavContainer>
  );
}
export default Nav;
