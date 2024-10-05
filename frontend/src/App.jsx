import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Test from './pages/test';
import Sidebar from './pages/sidebar/Sidebar';

function App() {
  return (

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path='/test' element={<Test />} />
            <Route path='/side' element={<Sidebar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>

  )
}

export default App
