import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F9FAFC] shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <li><Link to="/" className={`font-semibold ${isActive("/") ? "text-blue-700" : ""}`}>Home</Link></li>
            <li><Link to="/sigma-course" className={`font-semibold ${isActive("/sigma-course") ? "text-blue-700" : ""}`}>Trending Course</Link></li>
            <li><Link to="/dsa-sheet" className={`font-semibold ${isActive("/dsa-sheet") ? "text-blue-700" : ""}`}>Whiteboard</Link></li>
            <li><Link to="/new-courses" className={`font-semibold ${isActive("/new-courses") ? "text-blue-700" : ""}`}>New Courses</Link></li>
            <li><Link to="/about" className={`font-semibold ${isActive("/about") ? "text-blue-700" : ""}`}>About</Link></li>
            
            {isAuthenticated ? (
              <>
                <li><Link to="/Courses" className={`font-semibold ${isActive("/Courses") ? "text-blue-700" : "text-blue-600"}`}>My Batch</Link></li>
                
                {/* User Icon with Dropdown */}
                <li 
  className="relative" 
  onMouseEnter={() => {
    clearTimeout(window.dropdownTimeout); // Cancel any pending close
    setShowDropdown(true);
  }} 
  onMouseLeave={() => {
    window.dropdownTimeout = setTimeout(() => setShowDropdown(false), 300); // Delay hiding
  }}
>
  <button className="flex items-center space-x-2">
      <UserCircle size={28} className="text-blue-600 cursor-pointer"  />
   
  </button>

  {showDropdown && (
    <div 
      className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg"
      onMouseEnter={() => clearTimeout(window.dropdownTimeout)} // Keep dropdown open when hovering over it
      onMouseLeave={() => setShowDropdown(false)} // Hide when moving out of dropdown
    >
      <Link to="/Stu" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">
        Dashboard
      </Link>
      <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left">
        Logout
      </button>
    </div>
  )}
</li>

               
               
               
               
               
               
               
               
               
               
              </>
            ) : (
              <>
                <li><button className={`ml-6 font-semibold ${isActive("/login") ? "text-blue-700 underline" : "text-blue-600"}`} onClick={() => setIsLoginModalOpen(true)}>Login</button></li>
                <li><button className={`border border-blue-600 px-4 py-2 rounded-lg ${isActive("/signup") ? "bg-blue-600 text-white" : "text-blue-600"}`} onClick={() => setIsSignUpModalOpen(true)}>Sign Up</button></li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} className="text-gray-700" /> : <Menu size={28} className="text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-5 flex flex-col items-center space-y-4">
            <Link to="/" className="font-semibold" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/sigma-course" className="font-semibold" onClick={() => setIsMenuOpen(false)}>Trending Course</Link>
            <Link to="/dsa-sheet" className="font-semibold" onClick={() => setIsMenuOpen(false)}>Whiteboard</Link>
            <Link to="/new-courses" className="font-semibold" onClick={() => setIsMenuOpen(false)}>New Courses</Link>
            <Link to="/about" className="font-semibold" onClick={() => setIsMenuOpen(false)}>About</Link>
            {isAuthenticated ? (
              <>
                <Link to="/Courses" className="font-semibold" onClick={() => setIsMenuOpen(false)}>My Batch</Link>
                <button onClick={() => { setIsMenuOpen(false); navigate("/Stu"); }} className="font-semibold text-blue-600">Dashboard</button>
                <button className="font-semibold text-red-600" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="font-semibold text-blue-600" onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }}>Login</button>
                <button className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600" onClick={() => { setIsSignUpModalOpen(true); setIsMenuOpen(false); }}>Sign Up</button>
              </>
            )}
          </div>
        )}
      </nav>

      <LoginModal openModal={isLoginModalOpen} setOpenModal={setIsLoginModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} setIsAuthenticated={handleLogin} />
      <SignUpModal openModal={isSignUpModalOpen} setOpenModal={setIsSignUpModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
    </>
  );
};

export default Navbar;
