// 화면 전환 시 애니메이션 효과
import { Route, Routes, useLocation } from 'react-router-dom';

import React from 'react';

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
// 애니메이션 라이브러리
import { AnimatePresence } from 'framer-motion';
function AnimatedRoutes() {

  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* 여기에 링크 추가 */}
        <Route path="/" element={<Main/>} />
        <Route path="/intro" element={<Intro/>} />
        <Route path="/pwd" element={<PasswordFind/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/openchat" element={<OpenChat/>} />
        <Route path="/bigvoca" element={<BigVoca/>} />
        <Route path="/mypage" element={<Mypage/>} />
        <Route path="/emailCertification" element={<EmailCertification/>} />
      </Routes>
    </AnimatePresence>
    
  )
}

export default AnimatedRoutes;