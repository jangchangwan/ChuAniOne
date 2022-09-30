// 화면 전환 시 애니메이션 효과
import { Route, Routes, useLocation } from 'react-router-dom';

import React, { useEffect } from 'react';

import Main from './Main'
import Intro from './Intro'
import PasswordFind from './accounts/PasswordFind'
import Search from './ani/AniSearch'
import Login from './accounts/Login'
import Signup from './accounts/Signup'
import OpenChat from './openchat/OpenChat'
import BigVoca from './bigvoca/Bigvoca'
import Mypage from './mypage/MyPage'
import EmailCertification from './accounts/EmailCertification'
import EmailVerificationCompleted from './accounts/EmailVerificationCompleted'
import NotFound from './NotFound'
import NavPage from './NavPage'
import { useSelector } from 'react-redux'
import initialState from '../store/Loginslice'
import { useNavigate } from 'react-router-dom'

// 애니메이션 라이브러리
import { AnimatePresence } from 'framer-motion';
function AnimatedRoutes() {
  const navigate = useNavigate()
  const logincheck = useSelector((state: initialState) => state.login.isLogin)
  
  const location = useLocation();

  // // 비로그인시 특정 페이지 막기
  // useEffect(():any => {
  //   const path = window.location.pathname
  //   if (logincheck === false) {
  //     if (path === '/openchat' || path === '/bigvoca' || path === '/mypage'){
  //       navigate('/*')
  //     }
  //   }
  // }, [window.location.pathname]);


  // // 로그인시 특정페이지 막기
  // useEffect(() => {
  //   const path = window.location.pathname
  //   if (logincheck === true) {
  //     if (path === '/pwd' || path === '/login' || path === '/signup' || path === '/emailCertification'){
  //       navigate('/*')
  //     }
  //   }
  // }, [window.location.pathname]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* 여기에 링크 추가 */}
        <Route path="/" element={<Main />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/pwd" element={<PasswordFind />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/openchat" element={<OpenChat />} />
        <Route path="/bigvoca" element={<BigVoca />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/emailCertification" element={<EmailCertification />} />
        <Route path="/emailVerificationCompleted" element={<EmailVerificationCompleted />} />
        <Route path="/navPage" element={<NavPage />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </AnimatePresence>

  )
}

export default AnimatedRoutes;