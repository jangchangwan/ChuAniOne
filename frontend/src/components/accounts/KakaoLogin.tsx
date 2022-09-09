import React from 'react';
import kakaoIcon from "../../assets/images/kakao_icon.png";
import Box from '@mui/material/Box';
import styled from "styled-components"

const KakaoImg = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
`

function KakaoLogin() {
  return (
    <Box>
      <KakaoImg
        className='kakaoIcon' 
        src={kakaoIcon} 
        alt="Kakao_icon" />
    </Box>
  );
}

export default KakaoLogin;
