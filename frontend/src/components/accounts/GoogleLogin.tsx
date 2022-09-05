import React from 'react';
import './GoogleLogin.css';
import googleIcon from '../../assets/images/google_icon.png'
import Box from '@mui/material/Box';

function GoogleLogin() {
  return (
    <Box>
      <img 
        className='googleIcon'
        src={googleIcon} 
        alt='googleIcon' 
      />
    </Box>
  );
}

export default GoogleLogin;
