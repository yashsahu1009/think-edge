import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loadingGif from "../assets/loading.gif"; // Ensure correct path

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("email");

      if (!token || !email) {
        setError("No token or email found. Redirecting...");
        return;
      }

      try {
        const response = await fetch(
          `http://192.168.29.223:8081/api/user/start?email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          setError("Session expired. Redirecting...");
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        console.log("API Response Status:", response.status);
        console.log("User Data:", userData);

        setUser(userData);
        setCourses(Array.isArray(userData) ? userData : []);

        console.log("Courses Data:", userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="p-6">
      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loader */}
      {user === null ? (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[80vh] space-y-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={loadingGif}
            onError={(e) => (e.target.src = "https://i.gifer.com/ZZ5H.gif")}
            alt="Loading..."
            className="w-32 h-32"
          />
        </motion.div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome! 🎉
          </h2>

          {/* Courses Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 w-full max-w-[1300px] mx-auto">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl p-6 flex flex-col"
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Course Image */}
                  <div className="w-full h-64 rounded-xl overflow-hidden">
                    <img
                      src={course.imageData ? `data:image/jpeg;base64,${course.imageData}` : "/images/default.jpg"}
                      onError={(e) => (e.target.src = "/images/default.jpg")}
                      alt={course.title}
                      className="w-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Course Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mt-3">{course.title}</h3>

                  {/* Course Description */}
                  <p className="text-gray-600 text-md leading-relaxed flex-grow mt-7">
                    {course.description.length > 120 ? `${course.description.substring(0, 120)}...` : course.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700">{course.progress || 0}% COMPLETE</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      setCourseId(course.id);
                      navigate("/playlist");
                    }}
                    className="btn bg-indigo-600 text-white mt-4 p-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Continue Learning
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-[50vh] col-span-full">
                <p className="text-center text-gray-500 text-lg">No courses enrolled yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
