import React from 'react';
import './KakaoLogin.css';
import kakaoIcon from "../../assets/images/kakao_icon.png";
import Box from '@mui/material/Box';
function KakaoLogin() {
  return (
    <Box>
      <img
        className='kakaoIcon' 
        src={kakaoIcon} 
        alt="Kakao_icon" />
    </Box>
  );
}

export default KakaoLogin;
