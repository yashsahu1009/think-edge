import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadingGif from "../assets/loading.gif";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://192.168.29.223:8081/api/admin/AllCourse", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        console.log("Fetched Courses:", data);

        // Filter courses where available === true
        const availableCourses = data.filter((course) => course.available === true);
        setCourses(availableCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (course) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsModalOpen(true);
      return;
    }

    // Store course details in localStorage
    localStorage.setItem("selectedCourseId", course.courseId);
    localStorage.setItem("selectedCourseAmount", course.price);
    localStorage.setItem("selectedCourseTitle", course.title);
    localStorage.setItem("selectedCourseImage", `data:${course.imageType};base64,${course.imageData}`);
    localStorage.setItem("selectedCourseDescription", course.description);

    // Navigate to the payment page
    navigate(`/payment`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Explore Our Courses</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <img src={loadingGif} alt="Loading..." className="w-32 h-32" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-80 h-[500px] bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-5 flex flex-col"
            >
              {course.imageData && (
                <img
                  className="w-full h-80 object-cover rounded-md"
                  src={`data:${course.imageType};base64,${course.imageData}`}
                  alt={course.imageName}
                  style={{ width: "500px", height: "auto", borderRadius: "8px", marginTop: "10px" }}
                />
              )}

              <h3 className="text-xl font-bold text-gray-900 mt-4">{course.title}</h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3 flex-grow">{course.description}</p>

              <p className="text-blue-600 font-semibold text-lg mt-2">₹{course.price}</p>

              <button
                onClick={() => handleEnroll(course)}
                className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show modal if the user is not logged in */}
      {isModalOpen && <Modal message="Please log in to enroll in a course." onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CourseList;
