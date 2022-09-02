import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav'
import Main from './components/Main'
import Intro from './components/Intro'
import PasswordFind from './components/accounts/PasswordFind'
import Search from './components/ani/AniSearch'
import Login from './components/accounts/Login'
import Signup from './components/accounts/Signup'
import OpenChat from './components/openchat/OpenChat'
import BigVoca from './components/bigvoca/Bigvoca'
import Mypage from './components/mypage/MyPage'


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
