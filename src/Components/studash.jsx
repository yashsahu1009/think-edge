import React, { useState } from "react";
import img from '../assets/f1dc0aabb9247ff1819e839d8fc6e548-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  User,
  BookOpen,
  PlayCircle,
  Activity,
  Sun,
  Moon,
  Bell,
  Settings,
  LogOut,
  MessageSquare,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Progress } from "./progress";
import { Avatar } from "./Avtar";
import { Button } from "./button";

const data = [
  { name: "Jan", users: 400, courses: 240 },
  { name: "Feb", users: 600, courses: 300 },
  { name: "Mar", users: 800, courses: 450 },
  { name: "Apr", users: 1000, courses: 500 },
];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1: Web Development", dueDate: "2025-04-10", status: "Pending" },
    { id: 2, title: "Assignment 2: React Basics", dueDate: "2025-04-15", status: "Completed" },
  ]);
  const [mockTests, setMockTests] = useState([
    { id: 1, title: "Mock Test 1: JavaScript Basics", date: "2025-04-12", status: "Upcoming" },
    { id: 2, title: "Mock Test 2: React Intermediate", date: "2025-04-18", status: "Completed" },
  ]);

  const user = { name: "John Doe", enrolledCourses: 5, completedCourses: 3, purchasedCourses: 2 };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const goBack = () => window.history.back();
  const handleSettings = () => navigate("/settings"); // Redirect to settings page
  const handleNotifications = () => alert("Opening notifications..."); // Handle notifications logic
  const handleMessages = () => alert("Opening messages..."); // Handle messages logic
  const navigate = useNavigate();
  const goToCourses = () => {
    navigate('/courses'); // Navigate to the courses route
  };

  // Mark assignment as completed
  const markAssignmentCompleted = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, status: "Completed" } : assignment
      )
    );
  };

  // Mark mock test as completed
  const markMockTestCompleted = (id) => {
    setMockTests((prevTests) =>
      prevTests.map((test) =>
        test.id === id ? { ...test, status: "Completed" } : test
      )
    );
  };

  return (
    <div className={`p-4 md:p-6 grid gap-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Header Section */}
      <div className={`flex flex-col md:flex-row justify-between items-center ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-6`}>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="ghost" onClick={goBack} className="flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </Button>
          <Avatar className="w-12 h-12" src="/user-avatar.png" alt="User" />
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Welcome, {user.name}!</h2>
            <p className="text-gray-500 text-sm md:text-base">You are enrolled in {user.enrolledCourses} courses.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="ghost" onClick={toggleDarkMode}>{darkMode ? <Sun size={20} /> : <Moon size={20} />}</Button>
          <Button variant="ghost" onClick={handleNotifications}><Bell size={20} /></Button>
          <Button variant="ghost" onClick={handleMessages}><MessageSquare size={20} /></Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSettings}><Settings size={18} /> Settings</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[ 
          { icon: <BookOpen size={30} />, label: "Courses Available", value: "350", bg: "bg-green-500" },
          { icon: <PlayCircle size={30} />, label: "Videos Watched", value: "4,500", bg: "bg-yellow-500" },
          { icon: <Activity size={30} />, label: "Completion Rate", value: "85%", bg: "bg-red-500" },
          { icon: <Users size={30} />, label: "Purchased Courses", value: user.purchasedCourses, bg: "bg-purple-500" }].map(({ icon, label, value, bg }, index) => (
            <div key={index} className={`${bg} text-white p-6 flex items-center justify-between rounded-lg shadow-lg w-full`}>
              {icon}
              <div>
                <h2 className="text-lg md:text-xl font-semibold">{value}</h2>
                <p className="text-sm">{label}</p>
                {label === "Completion Rate" && <Progress value={85} className="mt-2 bg-white" />}
              </div>
            </div>
          ))}
      </div>

      {/* User & Course Growth Chart */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-4 md:p-6`}>
        <h3 className="text-lg font-semibold mb-4">User & Course Growth</h3>
        <div className="flex items-center">
          {/* Left Image */}
          <div className="mr-4">
            <img src={img} alt="Graph Image" className="w-96 h-48 object-cover rounded-lg" />
          </div>

          {/* Line Chart */}
          <ResponsiveContainer width="80%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#555" : "#ccc"} />
              <XAxis dataKey="name" stroke={darkMode ? "#ccc" : "#000"} />
              <YAxis stroke={darkMode ? "#ccc" : "#000"} />
              <Tooltip wrapperStyle={{ backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }} />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="courses" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Announcements Section */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-4 md:p-6`}>
        <h3 className="text-lg font-semibold mb-4">Latest Announcements</h3>
        <ul className="list-disc pl-5">
          <li>New courses added for Web Development!</li>
          <li>50% discount on premium courses this weekend.</li>
          <li>Upcoming live Q&A session with experts.</li>
        </ul>
      </div>

      {/* Manage Courses Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Your Courses</h3>
        <Button className="bg-indigo-600 text-white" onClick={goToCourses}>Go to Courses</Button>
      </div>

      {/* Assignments Section */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-4 md:p-6`}>
        <h3 className="text-lg font-semibold mb-4">Assignments</h3>
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="flex justify-between items-center p-4 rounded-lg border border-gray-300">
              <div>
                <h4 className="font-semibold">{assignment.title}</h4>
                <p className="text-sm text-gray-500">Due Date: {assignment.dueDate}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full ${assignment.status === "Completed" ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {assignment.status}
                </span>
                {assignment.status === "Pending" && (
                  <Button onClick={() => markAssignmentCompleted(assignment.id)} className="ml-4 bg-blue-600 text-white">Mark as Completed</Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mock Tests Section */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-4 md:p-6`}>
        <h3 className="text-lg font-semibold mb-4">Mock Tests</h3>
        <ul className="space-y-4">
          {mockTests.map((mockTest) => (
            <li key={mockTest.id} className="flex justify-between items-center p-4 rounded-lg border border-gray-300">
              <div>
                <h4 className="font-semibold">{mockTest.title}</h4>
                <p className="text-sm text-gray-500">Date: {mockTest.date}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full ${mockTest.status === "Completed" ? "bg-green-500" : "bg-yellow-500"} text-white`}>
                  {mockTest.status}
                </span>
                {mockTest.status === "Upcoming" && (
                  <Button onClick={() => markMockTestCompleted(mockTest.id)} className="ml-4 bg-blue-600 text-white">Take Test</Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
