import React, { useState, useEffect } from "react";
import { FaPlus, FaSun, FaMoon, FaSearch, FaSignOutAlt, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon-3.png";
import loadingGif from "../assets/loading.gif";

const API_BASE_URL = "http://192.168.29.223:8081/api/admin/AllCourse";
const ADD_COURSE_URL = "http://192.168.29.223:8081/api/admin/addcourse";
const DELETE_COURSE_URL = "http://192.168.29.223:8081/api/admin/removeCourse";
const EDIT_COURSE_URL = "http://192.168.29.223:8081/api/admin/updateCourseWithoutimage";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [courseToEdit, setCourseToEdit] = useState(null); // For editing course
  const navigate = useNavigate();

  // ✅ Fetch Courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log("Fetched Courses:", response.data);
      setCourses(response.data.filter(course => course.available === true));
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    navigate("/");
  };
  
  // ✅ Add Course
  const addCourse = async () => {
    if (!newCourse || !newPrice || !newDescription || !newFile) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newCourse);
    formData.append("description", newDescription);
    formData.append("price", newPrice);
    formData.append("available", true);
    formData.append("file", newFile);

    try {
      const response = await axios.post(ADD_COURSE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 201) {
        alert(response.data.message || "Course added successfully!");
        await fetchCourses();
        setShowCourseModal(false);
        setNewCourse("");
        setNewPrice("");
        setNewDescription("");
        setNewFile(null);
      }
    } catch (error) {
      console.error("Error adding course:", error.response ? error.response.data : error);
      alert(`Failed to add course: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  // ✅ Edit Course
  const editCourse = async () => {
    if (!newCourse || !newPrice || !newDescription) {
      alert("Please fill in all fields.");
      return;
    }
    const updateData = new FormData();
    updateData.append("courseId",courseToEdit.courseId);
    console.log(courseToEdit.courseId);
    updateData.append("title", newCourse);
    updateData.append("description", newDescription);
    updateData.append("price", newPrice);
    updateData.append("available", true);
  
    try {
      const response = await axios.put(EDIT_COURSE_URL, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
       
      if (response.status === 200) {
        alert( response.data.message||"Course updated successfully!");
        await fetchCourses();
        setShowEditCourseModal(false);
        setNewCourse("");
        setNewPrice("");
        setNewDescription("");
        setCourseToEdit(null);
      }
      else{
        alert( response.data.message||"Course Not Fount !");
      }
    } catch (error) {
      console.error("Error updating course:", error.response ? error.response.data : error);
      alert(`Failed to update course: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  // ✅ Delete Course
  const deleteCourse = async (courseId) => {
    
    try {
      const response = await axios.delete(`${DELETE_COURSE_URL}?courseId=${courseId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        alert(response.data.message||"Course deleted successfully!");
        await fetchCourses();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      {/* ✅ Navbar */}
      <div className="flex justify-between items-center p-5   bg-[#6674CC] text-white">
        <div className="flex items-center">
          <img src={logo} alt="Admin Logo" className="w-12 h-12 rounded-full mr-3" />
          <h1 className="text-4xl font-semibold text-black">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
          <button onClick={handleLogout} className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
      <h1 className="flex items-center mt-9 justify-center text-5xl font-bold">
  <span>Welcome To The </span>
  <span className="  animate-bounce"  style={{ color: " #BA8458" }}    >Thinkedge</span>
</h1>

      {/* ✅ Search Bar */}
      <div className="p-6 flex justify-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-4 py-2 rounded-lg border"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500" />
        </div>
      </div>

      {/* ✅ Courses Section */}
      <div className="p-6">
        <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold  uppercase tracking-wider relative">
  <span className="inline-block ">Courses</span>
</h3>

          <button onClick={() => setShowCourseModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Add Course
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <img src={loadingGif} alt="Loading..." className="h-16 w-16" />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((course) => (
                <div key={course.id} className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg text-white">
                  {course.imageData && (
                    <img
                      className="w-full h-50 rounded-md"
                      src={`data:${course.imageType};base64,${course.imageData}`}
                      alt={course.imageName}
                      style={{ width: "500px", height: "200px", borderRadius: "8px", marginTop: "10px" }}
                    />
                  )}
                  <h5 className="text-lg font-semibold">{course.courseId}</h5>
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <p className="text-sm">{course.description}</p>
                  <p className="text-lg font-bold mt-1">${course.price}</p>
                  <button value={courseToEdit?.courseId} onClick={() => deleteCourse(course.courseId)} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                  <button onClick={() => {
                    setShowEditCourseModal(true);
                    setCourseToEdit(course);
                    setNewCourse(course.title);
                    setNewPrice(course.price);
                    setNewDescription(course.description);
                  }} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">Edit</button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ✅ Add Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add New Course</h2>
              <button onClick={() => setShowCourseModal(false)} className="text-red-600">
                <FaTimes />
              </button>
            </div>

            <input type="text" className="w-full mt-4 p-2 border rounded" placeholder="Course Title" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} />
            <input type="text" className="w-full mt-2 p-2 border rounded" placeholder="Course Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            <textarea className="w-full mt-2 p-2 border rounded" placeholder="Course Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <input type="file" className="w-full mt-2 p-2 border rounded" onChange={(e) => setNewFile(e.target.files[0])} />

            <button onClick={addCourse} className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Add Course
            </button>
          </div>
        </div>
      )}

      {/* ✅ Edit Course Modal */}
      {showEditCourseModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Course</h2>
              <button onClick={() => setShowEditCourseModal(false)} className="text-red-600">
                <FaTimes />
              </button>
            </div>
         <input
  type="text"
  className="w-full mt-4 p-2 border rounded"
  disabled
  placeholder="Course ID"
  value={courseToEdit?.courseId || ""}
/>
            
            <input type="text" className="w-full mt-4 p-2 border rounded" placeholder="Course Title" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} />
            <input type="text" className="w-full mt-2 p-2 border rounded" placeholder="Course Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            <textarea className="w-full mt-2 p-2 border rounded" placeholder="Course Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            {/* <input type="Radio" placeholder="Yes" value={newAvailble}/> */}
            <button onClick={editCourse} className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Update Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
