 // src/components/TrendingCourses.js
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import fullStackImg from "../assets/4808325683ee3cc0e3346b92d1fca325.png";
import mlImg from "../assets/92e90c367bdf4433e87f4239bedeb097.png";
import cloudImg from "../assets/5161cfc51a98dac3e77d5e93349e885e.png";
import cyberImg from "../assets/2f4876cabe0cc5b003783e894262911e.jpg";

const courses = [
  { title: "Full Stack Development", image: fullStackImg },
  { title: "Machine Learning with Python", image: mlImg },
  { title: "Cloud Computing", image: cloudImg },
  { title: "Cybersecurity Essentials", image: cyberImg }
];

export default function TrendingCourses() {
  const navigate = useNavigate();

  const handleEnroll = (courseTitle) => {
    navigate(`/payment?course=${encodeURIComponent(courseTitle)}`);
  };

  return (
    <div className="p-3 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">Trending Courses & Modern Technologies</h1>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-center">{course.title}</h2>
                <p className="text-gray-600 text-sm mt-2 text-center">Enhance your skills with this trending course.</p>
                <button
                  onClick={() => handleEnroll(course.title)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
