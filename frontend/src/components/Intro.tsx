import React from 'react';
import './Intro.css';
import { motion } from 'framer-motion';
function Intro() {
  return (
    <motion.div
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      exit = {{opacity:0}}
    >
      <h1>Intro</h1>
    </motion.div>

  );
}

export default Intro;
