import React from "react";
import logo1 from "../assets/logo1.jpg";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedin, FaEnvelope, FaClock, FaUser } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-center md:text-left py-6 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo1} alt="Logo" className="w-40" />
          <p className="text-blue-600 mt-2">Where education meets real-world needs.</p>
        </div>

        {/* Helpful Links */}
        <div>
          <h5 className="text-lg font-bold text-blue-600">HELPFUL LINKS</h5>
          <ul className="mt-2 space-y-1">
            <li><span className="text-gray-700">›</span> <a href="#" className="text-blue-600 hover:underline">Courses</a></li>
            <li><span className="text-gray-700">›</span> <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></li>
            <li><span className="text-gray-700">›</span> <a href="#" className="text-blue-600 hover:underline">Refund Policy</a></li>
            <li><span className="text-gray-700">›</span> <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h5 className="text-lg font-bold text-black">GET IN TOUCH</h5>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li><FaEnvelope className="inline text-blue-600 mr-2" /> ThinkEdge@gmail.in</li>
            <li><FaEnvelope className="inline text-blue-600 mr-2" /> ThinkEdge@gmail.in</li>
            <li><FaEnvelope className="inline text-blue-600 mr-2" />  ThinkEdge@gmail.in</li>
            <li><FaClock className="inline text-black mr-2" /> Support Team: 10am - 6pm</li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h5 className="text-lg font-bold text-black">CONNECT WITH US</h5>
          <ul className="mt-2 flex flex-col space-y-1">
            <li><a href="#" className="text-blue-600 flex items-center hover:underline"><FaFacebookF className="mr-2" /> Facebook</a></li>
            <li><a href="#" className="text-blue-600 flex items-center hover:underline"><FaTwitter className="mr-2" /> Twitter</a></li>
            <li><a href="#" className="text-blue-600 flex items-center hover:underline"><FaYoutube className="mr-2" /> Youtube</a></li>
            <li><a href="#" className="text-blue-600 flex items-center hover:underline"><FaInstagram className="mr-2" /> Instagram</a></li>
            <li><a href="#" className="text-blue-600 flex items-center hover:underline"><FaLinkedin className="mr-2" /> Linkedin</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-700 mt-6">Copyright &copy; 2025</div>
    </footer>
  );
};

export default Footer;
