import React, { useState, useRef } from "react";

const CoursePage = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const videoRef = useRef(null); // Reference to the video element
  const lessons = [
    { title: "Percentages", type: "video", duration: "01:02:06", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Practice Test Paper (Easy)", type: "Exam" },
    { title: "Practice Test Paper (Medium)", type: "Exam" },
    { title: "Simple Interest", type: "video", duration: "57:42", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Practice Test Paper (Easy)", type: "Exam" },
    { title: "Practice Test Paper (Medium)", type: "Exam" },
    { title: "Compound Interest", type: "video", duration: "01:32:04", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Practice Test Paper (Easy)", type: "Exam" },
    { title: "Practice Test Paper (Medium)", type: "Exam" },
    { title: "Algebra Basics", type: "video", duration: "01:10:30", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Trigonometry Fundamentals", type: "video", duration: "02:05:25", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Geometry Introduction", type: "video", duration: "01:30:15", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Statistics Overview", type: "video", duration: "02:00:50", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Probability Theory", type: "video", duration: "01:40:45", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Linear Equations", type: "video", duration: "01:50:20", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  ];

  const handleVideoPlay = (index) => {
    setCurrentLessonIndex(index);
    videoRef.current?.load(); // Reload the video when a new one is selected
  };

  const handlePlay = () => {
    videoRef.current?.play(); // Start playing the video
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <button className="text-blue-600 text-sm mb-4">&lt; Back to course page</button>
        <h2 className="text-lg font-semibold mb-2">Aptitude Preparation (Hinglish)</h2>
        <div className="text-sm text-gray-600 mb-4">35% Complete</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }}></div>
        </div>
        <ul className="space-y-4">
          {lessons.map((lesson, index) => (
            <li
              key={index}
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => lesson.type === "video" && handleVideoPlay(index)} // Only set video if it's a video
            >
              <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
                {lesson.type === "video" ? (
                  <i className="fas fa-play text-xs"></i>
                ) : (
                  <i className="fas fa-check text-xs"></i>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{lesson.title}</p>
                {lesson.type === "video" && (
                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Player Section */}
      <div className="w-2/3 bg-black relative">
        <div className="absolute top-4 left-4 text-sm text-white cursor-pointer" onClick={() => setCurrentLessonIndex((prevIndex) => Math.max(prevIndex - 1, 0))}>&lt; previous</div>
        <div className="absolute top-4 right-4 text-sm text-white cursor-pointer" onClick={() => setCurrentLessonIndex((prevIndex) => Math.min(prevIndex + 1, lessons.length - 1))}>next &gt;</div>

        {lessons[currentLessonIndex]?.type === "video" ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center w-full h-full">
              <h3 className="text-lg mb-4">{lessons[currentLessonIndex].title}</h3>
              <video ref={videoRef} width="100%" height="80%" controls>
                <source src={lessons[currentLessonIndex].videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={handlePlay}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4"
              >
                Play Video
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <p>Select a video to start watching.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
