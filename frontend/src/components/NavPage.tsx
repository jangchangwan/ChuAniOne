import styled from "styled-components"
import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

// redux
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import { logout, logoutUser, resetUser } from '../store/Loginslice'
import initialState from '../store/Loginslice'
import store from '../store'

// 모션
import { motion } from 'framer-motion';

// 이미지
import NavImgLeft from '../assets/images/navImg1.png'
import NavImgRight from '../assets/images/navImg2.png'
import NavImgRight2 from '../assets/images/navImage3.png'

// MUI
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'

// 링크
const Navhref = styled(NavLink)`
  text-decoration : none;
  color: white;
  font-weight: 700;
  margin-left: 2rem;
`
// 공백
const Spacing = styled.div`
  height: 1.5rem;
`

function NavPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()

  // 로그인 유무
  const logincheck = useSelector((state: initialState) => state.login.isLogin)
  // 하트위치
  const [heart, setheart] = useState(500)

  // 마우스위치 감지
  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      const res = e.clientY * 2
      setheart(res)
    })
  }, [])
  // 뒤로가기
  const NavClose = () => {
    navigate(-1)
  }

  const gologout = () => {
    
    dispatch(logout())
      .then(() => {
        dispatch(logoutUser())
        dispatch(resetUser())
        navigate('/login')
      }  
    )
  }
  return (
    <div
      style={{
        width:'100%',
        margin: '0',
        padding:'0,0,0,0',
        display: 'flex'
      }}
    >

      <motion.div
        initial={{ y: -1500 }}
        animate={{ y: 0 }}
        exit={{ display: 'none' }}
        transition={{ duration: '1' }}
        style={{
          position: 'relative',
          left: '0%',
          height: '100vh',
          width: '50%',
          backgroundImage: `url(${NavImgLeft})`
        }}
      >
        <motion.div
          initial= {{ opacity:0}}
          animate={{ opacity:1 }}
          transition={{ delay: 1}}
          style={{
            display:'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '3rem',            
          }}
        >
          <Navhref to="/">메인</Navhref>
          <Spacing></Spacing>
          <Navhref to="/intro">소개</Navhref>
          <Spacing></Spacing>
          <Navhref to="/search">검색</Navhref>
          <Spacing></Spacing>
          { logincheck ?
            <Navhref to="/bigvoca">빅보카</Navhref>
            : null
          }
          { logincheck ?
            <Spacing></Spacing>
            : null
          }
          { logincheck ?
            <Navhref to="/openchat">오픈채팅</Navhref>
            : <Navhref to="/login">로그인</Navhref>
          }
          <Spacing></Spacing>
          { logincheck ?
            <Navhref to="/mypage">마이페이지</Navhref>
            : null
          }
          { logincheck ?
            <Spacing></Spacing>
            : null
          }
          { logincheck ?
            <div onClick={gologout}
              style={{
                color: 'white',
                fontWeight: '700',
                marginLeft: '2rem',
                cursor: 'pointer'
              }}
            >로그아웃</div>
            : null
          }
        </motion.div>
        
      </motion.div>
      <motion.div
        initial={{ y: 1500 }}
        animate={{ y: 0 }}
        exit={{ display: 'none' }}
        transition={{ duration: '1' }}
        style={{
          position: 'relative',
          height: '100vh',
          width: '50%',
          backgroundImage: `url(${NavImgRight})`
        }}
      >
        <motion.div
          initial= {{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1}}
          style={{
            height: '100%',
            backgroundImage: `url(${NavImgRight2})`,
            objectFit: 'cover'
          }}
        >
          <IconButton
          onClick={NavClose}
          sx = {{
            position: 'fixed',
            zIndex: '999',
            right: '1%'
          }}
          >
            <CloseIcon
              sx ={{
                color: 'white',
                fontSize: '5rem',
              }}
            />
          </IconButton>
          
        </motion.div>
      </motion.div>
      <FavoriteIcon
            sx={{
              position: 'fixed',
              margin: '0 auto',
              left: 0,
              right: 0,
              color:'white',
              fontSize: '3rem',
              height: `${heart}px`
            }}
          />
    </div>
  )
}
export default NavPage;
