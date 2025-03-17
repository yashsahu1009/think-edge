import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loadingGif from "../assets/loading.gif"; // Import the loading gif

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();
        setUser(userData);

        const coursesResponse = await fetch(`/api/courses?userId=${userData.id}`);
        const userCourses = await coursesResponse.json();
        setCourses(userCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6">
      {/* Animated Loading State */}
      {!user ? (
        <motion.div
          className="flex flex-col items-center justify-center h-screen space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Loading GIF */}
          <img src={loadingGif} alt="Loading..." className="w-32 h-32" />
         
        </motion.div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome, <span className="text-blue-600">{user.name}</span>! 🎉
          </h2>

          {/* Course Cards */}
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  Access until {course.accessUntil}
                </div>

                <div className="w-full h-32 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={course.image || "/images/default.jpg"}
                    alt={course.title}
                    className="h-full object-cover rounded-lg"
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                <div className="text-sm font-semibold mb-2">
                  {course.progress}% COMPLETE
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <button
                  onClick={() => navigate(course.path)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full hover:bg-blue-600 transition"
                >
                  Continue
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No courses enrolled yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
