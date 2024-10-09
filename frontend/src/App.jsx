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
import CreateCourse from './pages/instuctor/CreateCourse';
import CreatePage from './pages/instuctor/CreateCourse';
import toasterprovider from './components/providers/toaster-provider';
import Toasterprovider from './components/providers/toaster-provider';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* Routes without Sidebar */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

          {/* Routes with Sidebar */}
          <Route element={<SidebarLayout />}>
            <Route path="/instructor/cource" element={<InsruCourses />} />
            <Route path="/mess" element={<Mess />} />
            <Route path="/instructor/createcource" element={<CreatePage />} />

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
