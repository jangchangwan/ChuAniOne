import { NavLink } from "react-router-dom";
import React, { useState } from 'react';

import "./Nav.css";

function Nav() {

  // 로그인 , 회원가입, 비밀번호 찾기 인 경우 네비게이션 바 없애기
  if (window.location.pathname === '/login') return null;
  else if (window.location.pathname === '/signup') return null;
  else if (window.location.pathname === '/pwd') return null;

  return (
    <nav className="navbar-container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/intro">Intro</NavLink>
      <NavLink to="/pwd">PasswordFind</NavLink>
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/openchat">OpenChat</NavLink>
      <NavLink to="/bigvoca">BigVoca</NavLink>
      <NavLink to="/mypage">Mypage</NavLink>
    </nav>
  );
}
export default Nav;
