import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// all components are here
import Home from './pages/Home';
import Header from './components/Header';
import Player from './components/Footer';



function App() {
  return (
    <>
      <div>
        <Header />
        <Home />
        <Player/>
      </div>
    </>

  );
}

export default App;
