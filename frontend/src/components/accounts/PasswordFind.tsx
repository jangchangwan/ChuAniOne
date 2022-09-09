import React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// 화면전환 애니메이션
import { motion } from 'framer-motion';

function PasswordFind() {
    let emailState = false;
    return (
      <motion.div
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      exit = {{opacity:0}}
      transition = {{ duration: 0.5}}
      >
        <Container 
          component="main" 
          maxWidth="xs"
          sx = {{
            padding: '3rem'
          }}
        >
          <CssBaseline />
          <Box
            boxShadow={2}
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              border: 1,
              borderRadius: '1rem',
              padding: 3,
            }}
          >

            <Typography component="h1" variant="h5">
              비밀번호 찾기
            </Typography>
            <Box 
              component="form" 
              noValidate sx={{ 
                mt: 1
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="이메일을 입력해주세요."
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={4}>
                  <Button
                    type='button'
                    fullWidth
                    variant="contained"
                    sx={{
                      top: '1.5rem'
                    }}
                  >번호 전송</Button>
                </Grid>
              </Grid>
              {
                emailState === false
                ? <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="emailcheck"
                    label="인증번호을 입력해주세요."
                    name="emailcheck"
                    autoComplete="emailcheck"
                    autoFocus
                  />
                </Grid>

                <Grid 
                  item xs={4}
                  >
                  <Button
                    type='button'
                    fullWidth
                    variant="contained"
                    sx={{
                      top: '1.5rem'
                    }}
                  >인증 확인</Button>
                </Grid>
              </Grid> : null
              }
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호를 입력해주세요."
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="비밀번호를 재입력해주세요."
                type="password"
                id="password2"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                type="submit"
                href='/login'
                variant="contained"
                color="success"
                sx={{ mt: 1, mb: 3 }}
              >
                비밀번호 변경
              </Button>
            </Box>
          </Box>
        </Container>
      </motion.div>
    );
}

export default PasswordFind;
