import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// all components are here
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  return (
    <>
      <div>
        <Header />
        <Footer/>
      </div>
    </>

  );
}

export default App;
