import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
// import styled from "styled-components"
import BackgroundImg from '../../assets/images/memberBackground.png'
import logoicon from '../../assets/images/smallLogo.png'

import styled from "styled-components"

const MyHrTag = styled.hr`
  width : 100%;
  height : 5px;
  background-color : #FFD1D1;
  border : none;
  border-radius : 5rem;
`

function EmailCertification() {
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
            padding: '6rem'
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
            <MyHrTag />
            
            <img src={logoicon} alt="로고" style={{
              paddingTop: '2rem',
              width: '40rem',
              height: 'auto'
            }}/>
            <p
              style={{
                fontSize: '3rem',
              }}
            >회원가입 완료!</p>
            <p
              style={{
                fontSize: '1rem',
                padding: 0,
                margin: 0,
              }}
            >입력하신 이메일로 인증메일이 전송되었습니다.</p>
            <p
              style={{
                fontSize: '1rem',
                padding: 0,
                margin: 0,
              }}
            >인증메일로 통해 인증하신 후 로그인이 가능합니다.</p>
            <Button
              href='/login'
              variant="contained"
            >로그인으로</Button>
            <MyHrTag />
          </Box>
        </Container>
    </Box>
  );
}

export default EmailCertification;
