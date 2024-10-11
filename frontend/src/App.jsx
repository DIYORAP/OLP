import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Home from './pages/Home';
import SidebarLayout from './components/insructor/SidebarLayout';
import Mess from './components/Mess';
import Courses from './pages/Courses';
import StudSidebarLayout from './components/student/studSidebarLayout';
import Purchases from './pages/student/Purchases';
import Session from './pages/student/Session';
import Setting from './pages/student/Setting';
import InsruCourses from './pages/instuctor/InsruCourses';
import CreatePage from './pages/instuctor/CreatePage';
import Toasterprovider from './components/providers/toaster-provider';
import SignUp from './pages/signup/SignUp';
import Login from './pages/Login';
import InsruSignUp from './pages/signup/InsruSignUp';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* Routes without Sidebar */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructor/signup" element={<InsruSignUp />} />


          {/* Routes with Sidebar */}
          <Route element={<SidebarLayout />}>
            <Route path="/instructor/courses" element={<InsruCourses />} />
            <Route path="/instructor/createcourse" element={<CreatePage />} />
            <Route path="/instructor/createcourse/:id" element={<CreatePage />} />

          </Route>

          <Route element={<StudSidebarLayout />}>
            <Route path="/student/courses" element={<Courses />} />
            <Route path="/student/purchase" element={<Purchases />} />
            <Route path="/student/session" element={<Session />} />
            <Route path="/student/setting" element={<Setting />} />



          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
      <Toasterprovider />
    </>
  );
}

export default App;
