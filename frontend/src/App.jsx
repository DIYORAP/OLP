import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
