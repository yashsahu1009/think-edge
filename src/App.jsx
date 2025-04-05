import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./Components/preloader"; // ✅ Import Preloader
import Navbar from "./Components/Navbar";
import SignUpModal from "./Components/SignUpModal";
import LoginModal from "./Components/LoginModal";
import Students from "./Components/Students";
import Content from "./Components/Content";
import Dsasheet from "./Components/Dsasheet";
import Footer from "./Components/Footer";
import SigmaCoursePage from "./Components/SigmaCoursePage";
import PaymentPage from "./Components/PaymentPage";
import Courses from "./Components/Courses";
import Playlist from "./Components/Playlist";
import Imges from "./Components/ImageSlider";
import About from "./Components/Aboutpage"
import Stu from "./Components/studash";
import Trend from "./Components/trend";
import Helo from "./Components/Help"
 import Learn from "./Components/learn";
 
 
import AdminDashboard from "./Components/AdminDashboard";
import NewCourses from "./Components/NewCourses";
import Dashboard from "./Components/Courses"; // ✅ Import CourseList
import Certificate from "./Components/Certificate";
function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Preloader state

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // ✅ Hide preloader after 2 seconds
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader /> // ✅ Show preloader while loading
      ) : (
        <>
          {location.pathname !== "/admin" && location.pathname !=="/Stu" &&(
            <Navbar
              setIsLoginModalOpen={() => {
                setIsLoginModalOpen(true);
                setIsSignUpModalOpen(false);
              }}
              setIsSignUpModalOpen={() => {
                setIsSignUpModalOpen(true);
                setIsLoginModalOpen(false);
              }}
            />
          )}
 
          <Routes>
            <Route path="/" element={<> <Content /><Students /><Certificate/><Learn/> <Footer /></>} />
            <Route path="/sigma-course" element={<><Imges/><Trend/><SigmaCoursePage /> <Footer /></>} />
            <Route path="/dsa-sheet" element={<> <Dsasheet /></>} />
            <Route path="/new-courses" element={<NewCourses setIsLoginModalOpen={setIsLoginModalOpen}/>} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/courses" element={<> <Dashboard /> <Footer /> </>} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/Stu" element={<Stu />} />
            <Route path="/help" element={<Helo />} />

          </Routes>

          {/* ✅ Modals (conditionally rendered) */}
          {isSignUpModalOpen && (
            <SignUpModal 
              openModal={isSignUpModalOpen} 
              setOpenModal={setIsSignUpModalOpen} 
              setIsLoginModalOpen={setIsLoginModalOpen}  
            />
          )}
          {isLoginModalOpen && (
            <LoginModal 
              openModal={isLoginModalOpen} 
              setOpenModal={setIsLoginModalOpen} 
              setIsSignUpModalOpen={setIsSignUpModalOpen} 
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
