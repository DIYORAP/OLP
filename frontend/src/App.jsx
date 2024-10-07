import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Home from './pages/Home';
import HeroHeader from './pages/instuctor/InsruHero'; // renamed for clarity
import LayoutWithSidebar from './components/LayoutWithSidebar'; // the layout component
import Sidebar from './components/Sidebar';
import SidebarLayout from './components/SidebarLayout';
import Mess from './components/Mess';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Routes without Sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        {/* Routes with Sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/instructor" element={<HeroHeader />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/mess" element={<Mess />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
