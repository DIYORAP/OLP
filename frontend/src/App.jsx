import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Test from './pages/test';
import Sidebar from './pages/sidebar/Sidebar';
import Search from './components/Search';
import Home from './pages/Home';
import HeroHeader from './pages/instuctor/InsruHero';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/instructor' element={<HeroHeader />} />

        <Route path="/test" element={<Test />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter >
  );
}

export default App;
