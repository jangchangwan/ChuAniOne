import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function SignupFormOne() {
  let emailState = false;
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
        }}
      >
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
        </Box>
      </Box>


  );
}

export default SignupFormOne;
