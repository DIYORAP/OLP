import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>

  )
}

export default App
