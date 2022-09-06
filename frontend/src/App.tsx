import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from './components/Nav'

import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  
  return (
    <BrowserRouter>
      <Nav/>
      <AnimatedRoutes/>
    </BrowserRouter>
  );
}

export default App;
