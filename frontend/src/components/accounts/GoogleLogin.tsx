import React from 'react';
import googleIcon from '../../assets/images/google_icon.png'
import Box from '@mui/material/Box';
import styled from "styled-components"

const GoogleImg = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
`
function GoogleLogin() {
  return (
    <Box>
      <GoogleImg 
        className='googleIcon'
        src={googleIcon} 
        alt='googleIcon' 
      />
    </Box>
  );
}

export default GoogleLogin;
