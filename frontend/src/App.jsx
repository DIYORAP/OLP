import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Home from './pages/Home';
import SidebarLayout from './components/insructor/SidebarLayout';
import Courses from './pages/Courses';
import StudSidebarLayout from './components/student/studSidebarLayout';
import Purchases from './pages/student/EnrolledCourses';
import Session from './pages/student/Session';
import Setting from './pages/student/Setting';
import Toasterprovider from './components/providers/toaster-provider';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import AddCourse from './components/insructor/Dashboard/AddCourses';
import "./App.css";
import HeroHeader from './pages/instuctor/InsruHero';
import MyCourses from './components/insructor/Dashboard/Courses/MyCourses';
import EditCourse from './components/insructor/Dashboard/EditCourse/EditCourse';
import Settings from './pages/Settings';
import CourseDetails from './pages/CourseDetails';
import EnrolledCourses from './pages/student/EnrolledCourses';
import VideoDetails from './pages/VideoDetails';
import ViewCourse from './pages/ViewCourse';
import InstructorSession from './pages/instuctor/Session';
import StudentSession from './pages/student/Session';
import VideoCallPage from './pages/Metting';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { ACCOUNT_TYPE } from './utils/constants';
function App() {
  const user = useSelector((state) => state.user?.currentUser?.role);
  ;
  console.log(user)
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
          <Route path="/instructor" element={<HeroHeader />} />

          {/* <Route path="/instructor/signup" element={<InsruSignUp />} /> */}
          {/* <Route path="/instructor/login" element={<InstuLogin />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/session/:sessionId" element={<VideoCallPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/settings' element={<Settings />} />

            <Route path='/profile' element={<Profile />} />
          </Route>


          {user === ACCOUNT_TYPE.INSTRUCTOR && (

            <Route element={<PrivateRoute />}>

              <Route element={<SidebarLayout />}>
                <Route path="/dashboard/mycourses" element={<MyCourses />} />
                <Route path="/dashboard/addcourse" element={<AddCourse />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}

                />
                <Route path="/insructor/session" element={<InstructorSession />} />

              </Route>
            </Route>
          )}

          <Route element={<PrivateRoute />}>
            <Route
              element={

                <ViewCourse />

              }
            >

              <>
                <Route
                  path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                  element={<VideoDetails />}
                />
              </>
            </Route>

          </Route>
          {user === ACCOUNT_TYPE.STUDENT && (

            <Route element={<PrivateRoute />}>

              <Route element={<StudSidebarLayout />}>
                <Route path="/student/courses" element={<Courses />} />
                <Route
                  path="/dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="/student/session" element={<StudentSession />} />
                <Route path="/student/setting" element={<Setting />} />


              </Route>
            </Route>
          )}

          <Route path="*" element={<Home />} />

        </Routes>

        <Footer />
      </BrowserRouter>
      <Toasterprovider />
    </>
  );
}

export default App;
