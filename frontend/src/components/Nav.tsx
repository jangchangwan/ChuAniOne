import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// MUI
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'

// styled Component
import styled from "styled-components"

// image
import LogoImg from '../assets/images/logo2.png'

// 최상위 Container
const NavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  z-index: 999;
  align-items: center;
`

// Logo Img
const NavLogoImg = styled.img`
  position: fixed;
  left: 1.5rem;
  top: 1.5rem;
  width: 18rem;
  cursor: pointer;
  overflow: hidden;
`


/** 네비게이션 페이지 */
function Nav() {

  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)

  /** 메인으로 이동 */
  const GoMain = () => {
    navigate('/')
  }

  /** 네브바 오픈 */
  const NavOpen = () => {
    navigate('/navPage')
  }

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
  }, [window.location.pathname])

  return (
    <NavContainer>
      {
        showNav ?
        null
        : 
        <NavLogoImg 
        onClick={GoMain}
        src={LogoImg}/>
      }
      
      {
        showNav ?
        null
        :
        <IconButton
        onClick={NavOpen}
        sx = {{
          position: 'fixed',
          right: '1%'
        }}
        >
          <MenuIcon
            sx ={{
              color: '#f37b83',
              fontSize: '5rem',
            }}
          />
        </IconButton>
      }
    </NavContainer>
  )
}
export default Nav
