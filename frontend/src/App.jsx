import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Test from './pages/test';
import Sidebar from './pages/sidebar/Sidebar';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex">
          <Sidebar /> {/* Sidebar remains fixed for routes that need it */}
          <div className="flex-grow">
            <Routes>
              <Route path="/test" element={<Test />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
