import React from "react";
import img from "../assets/logo1-removebg-preview (2).png";

const Certificate = ({ course = "Java Full Stack", date = "29/01/2025" }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-[900px] max-w-full sm:w-[900px] bg-white shadow-2xl rounded-lg p-12 border-8 border-yellow-500 text-center transform scale-90 sm:scale-100">
        
        {/* Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 opacity-50"></div>
        
        {/* Decorative Border */}
        <div className="absolute inset-0 border-8 border-double border-yellow-500 rounded-lg"></div>
        
        {/* Logo */}
        <img src={img} alt="ThinkEdge Logo" className="w-32 sm:w-48 mx-auto mb-4 relative" />
        
        {/* Certificate Title */}
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 uppercase relative">Certificate of Completion</h2>
        <p className="text-base sm:text-lg text-gray-600 mt-2 italic relative">This is proudly presented to</p>
        
        {/* Recipient Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mt-2 relative">John</h1>
        
        {/* Course Name */}
        <p className="text-lg sm:text-xl text-gray-700 mt-4 relative">For successfully completing the</p>
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 relative">{course}</h3>
        
        {/* Certificate Content */}
        <p className="text-sm sm:text-lg text-gray-600 mt-4 sm:mt-6 px-4 sm:px-8 relative">
          This certificate is awarded in recognition of your dedication and efforts in completing the course. 
          Your hard work and commitment to learning have been commendable, and we celebrate your achievement.
        </p>
        
        {/* Date */}
        <p className="text-sm sm:text-lg text-gray-600 mt-4 sm:mt-6 relative">Awarded on {date}</p>
        
        {/* Signature Section */}
        <div className="flex justify-between px-8 sm:px-12 mt-6 relative">
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-cursive">Yash Sahu</p>
            <hr className="border-t-2 border-gray-500 w-32 sm:w-48 mx-auto" />
            <p className="text-gray-700 mt-2 font-semibold">Yash Sahu</p>
            <p className="text-gray-500 text-sm sm:text-base">Instructor</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-cursive">Vipin Singh</p>
            <hr className="border-t-2 border-gray-500 w-32 sm:w-48 mx-auto" />
            <p className="text-gray-700 mt-2 font-semibold">Vipin Singh</p>
            <p className="text-gray-500 text-sm sm:text-base">Course Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
