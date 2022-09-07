import React from 'react';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SignupFormTwo() {
  return (
  <Box
  sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 3,
  }}
  >
      
    <TextField
    margin="normal"
    required
    fullWidth
    name="nickname"
    label="닉네임를 입력해주세요."
    id="nickname"
    autoComplete="nickname"
    />

    <TextField
    margin="normal"
    required
    fullWidth
    name="birthday"
    label="생일을 입력해주세요."
    id="birthday"
    autoComplete="birthday"
    />
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="남성" />
        <FormControlLabel value="male" control={<Radio />} label="여성" />
      </RadioGroup>
    </FormControl>
    </Box>
  );
}

export default SignupFormTwo;
