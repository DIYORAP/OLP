import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './pages/signup/SignUp';

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
