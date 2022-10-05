import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

// image
import BackgroundImg from '../../assets/images/memberBackground.png'
import logoicon from '../../assets/images/smallLogo.png'
import SmileIcon from '../../assets/images/smileIcon.png'


/** 이메일 인증 완료 페이지 */
function EmailVerificationCompleted() {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <Container 
          component="main" 
          maxWidth="xl"
          sx = {{
            paddingTop: '13rem'
          }}
          >
            
          <Box
            boxShadow={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              border: 1,
              borderRadius: '1rem',
              padding: 3,
              opacity: 0.9,
            }}
          >
            <img src={SmileIcon} alt="스마일" style={{
              position: 'fixed',
              top: '15%',
              right: '10%'
            }}/>
            <img src={logoicon} alt="로고" style={{
              paddingTop: '2rem',
              width: '40rem',
              height: 'auto'
            }}/>
            <p
              style={{
                fontSize: '3rem',
              }}
            >이메일 인증 완료!</p>
            <p
              style={{
                fontSize: '1.5rem',
                padding: 0,
                margin: 0,
              }}
            >회원가입한 이메일로 로그인이 가능합니다</p>
            <p
              style={{
                fontSize: '1.5rem',
                padding: 0,
                margin: 0,
              }}
            ></p>
            <p
              style={{
                fontSize: '1.5rem',
                padding: 0,
                margin: 0,
              }}
            >츄 애니원으로 다 같이 Go GO~</p>
            <Button
              href='/login'
              variant="contained"
              sx = {{
                mt:3,
                mb:2
              }}
            >로그인으로</Button>
          </Box>
        </Container>
    </Box>
  )
}

export default EmailVerificationCompleted
