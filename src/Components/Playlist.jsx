import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLocation } from "react-router-dom";

const CoursePage = () => {
  const [videos, setVideos] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseIdFromUrl = queryParams.get("courseId");
  const [courseId, setCourseId] = useState(localStorage.getItem("courseId"));
  const token = localStorage.getItem("authToken");

  const fetchVideoList = async () => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://192.168.29.223:8081/api/showVideo?courseId=${courseId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch videos");

      const data = await response.json();
      console.log("Fetched Videos:", data);
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchVideoList();
    }
  }, [courseId]);

  const handleVideoSelect = async (index) => {
    setCurrentLessonIndex(index);
    // const filePath = encodeURIComponent(videos[index]?.video_url || "");
    
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await fetch(`http://192.168.29.223:8081/api/video?video_url=${videoUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      
      if (!response.ok) throw new Error("Failed to fetch video");
      
      // setVideoUrl(`http://192.168.29.223:8081/api/video?video_url=${filePath}`);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar with Video List */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <button className="text-blue-600 text-sm mb-4">&lt; Back to course page</button>
        <h2 className="text-lg font-semibold mb-2">Course Videos</h2>
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length === 0 ? (
          <p>No videos available</p>
        ) : (
          <ul className="space-y-4">
            {videos.map((video, index) => (
              <li
                key={index}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {setVideoUrl(video.video_url); handleVideoSelect(index); }}
              >
                <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
                  <i className="fas fa-play text-xs"></i>
                </div>
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Video Player */}
      <div className="w-2/3 bg-black flex items-center justify-center">
        {loading ? (
          <p className="text-white">Loading video...</p>
        ) : videoUrl ? (
          <video ref={videoRef} width="100%" height="80%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-white">Select a video to start watching.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
