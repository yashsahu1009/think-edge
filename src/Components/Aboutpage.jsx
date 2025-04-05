import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import studentImg from "../assets/wmremove-transformed.png"; // Add your student image path

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <motion.div
        className="max-w-4xl text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-indigo-700">About ThinkEdge</h1>
        <p className="text-lg text-gray-600 mt-4">
          Empowering learners with high-quality online courses to enhance skills and knowledge.
        </p>
      </motion.div>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl space-y-10 md:space-y-0 md:space-x-10">
        {/* Student Image Section */}
        <motion.div
          className="md:w-1/3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={studentImg} alt="Student Learning" className="w-80 rounded-lg " />
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="md:w-2/3 bg-white shadow-lg rounded-lg p-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At ThinkEdge, our mission is to provide top-notch education with expert instructors,
            engaging content, and hands-on learning experiences to help individuals achieve their goals.
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[
          {
            title: "Expert Instructors",
            description: "Learn from industry professionals with years of experience.",
          },
          {
            title: "Flexible Learning",
            description: "Access courses anytime, anywhere, at your own pace.",
          },
          {
            title: "Certifications",
            description: "Earn certificates to showcase your achievements.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold text-indigo-600">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Student Testimonials Section */}
      <div className="max-w-5xl mt-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {[
            {
              name: "Aman Patel",
              feedback: "ThinkEdge helped me upgrade my skills and land my dream job!",
            },
            {
              name: "Sneha Sharma",
              feedback: "The courses are well-structured and easy to follow. Highly recommended!",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              <p className="mt-3 font-semibold text-gray-800">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">Start Learning Today!</h2>
        <p className="text-gray-600 mt-2">Join thousands of learners and upgrade your skills now.</p>
        <button
          onClick={() => navigate("/new-courses")}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Explore Courses
        </button>
      </motion.div>
    </div>
  );
};

export default About;
