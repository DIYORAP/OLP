import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignUp from './components/signup/signup';

function App() {
  return (

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>

  )
}

export default App
