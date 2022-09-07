import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
function Intro() {
  return (
    <motion.div
      
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      exit = {{opacity:0}}
    >
      <h1>Intro</h1>
      <Box
        sx={{
          height: '300vh',
        }}
      >
        아아
      </Box>
    </motion.div>

  );
}

export default Intro;
