import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from './components/ScrollTop';
import Nav from './components/Nav'
import './App.css'
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  
  return (
    <BrowserRouter>
      <ScrollTop />
      <Nav/>
      <AnimatedRoutes/>
    </BrowserRouter>
  );
}

export default App;
