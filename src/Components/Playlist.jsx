import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CoursePage = () => {
  const [videos, setVideos] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseIdFromUrl = queryParams.get("courseId");
  const [courseId, setCourseId] = useState(
    courseIdFromUrl || localStorage.getItem("courseId")
  );
  const token = localStorage.getItem("authToken");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing!");
      return;
    }
    localStorage.setItem("courseId", courseId);

    const fetchVideoList = async () => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `https://thinkedge.ap-south-1.elasticbeanstalk.com/api/showVideo?courseId=${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch videos");

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoList();
  }, [courseId]);

  const handleVideoSelect = (video, index) => {
    setVideoUrl(video.video_url);
    setCurrentLessonIndex(index);
    setProgress(0);
    setIsPlaying(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 100);
  };
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(newProgress);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickX = e.nativeEvent.offsetX;
      const progressBarWidth = progressBar.clientWidth;
      const newTime = (clickX / progressBarWidth) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setIsMuted(newVolume == 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }; // Fixed missing closing brace

  const handleNext = () => {
    if (currentLessonIndex < videos.length - 1) {
      handleVideoSelect(videos[currentLessonIndex + 1], currentLessonIndex + 1);
    }
  };
  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      handleVideoSelect(videos[currentLessonIndex - 1], currentLessonIndex - 1);
    }
  };

  return (
    <div className="flex h-[760px] overflow-y-auto scrollbar-hide">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4 overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-bold mb-4">Course Videos</h2>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 text-black rounded-lg"
        />
        {loading ? (
          <p>Loading videos...</p>
        ) : (
          <ul className="space-y-4">
            {filteredVideos.map((video, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg cursor-pointer transition hover:bg-gray-700 ${
                  currentLessonIndex === index ? "bg-blue-600" : ""
                }`}
                onClick={() => handleVideoSelect(video, index)}
              >
                {video.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Video Player Section */}
      <div className="w-3/4 bg-black flex flex-col items-center justify-center relative p-4 overflow-hidden">
        {videoUrl ? (
          <div className="w-full max-w-6xl relative">
            <video
              ref={videoRef}
              width="100%"
              onTimeUpdate={handleTimeUpdate}
              autoPlay
              playsInline
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Clickable Video Progress Bar */}
            <div
              className="w-full bg-gray-700 h-2 rounded-full mt-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="bg-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-4 text-white">
              <div className="flex items-center ">
                <button onClick={toggleMute} className="text-white">
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24"
                />
              </div>
              <button
                onClick={handlePrev}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                ⏮ Prev
              </button>

              <button
                onClick={() => handleSkip(-10)}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                ⏪ -10s
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              <button
                onClick={() => handleSkip(10)}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                ⏩ +10s
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                Next ⏭
              </button>
            </div>

            {/* Playback Speed */}
            <div className="mt-3">
              <label className="text-white mr-2">Speed:</label>
              <select
                className="bg-gray-700 text-white px-2 py-1 rounded"
                onChange={(e) => handleSpeedChange(e.target.value)}
                value={playbackSpeed}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            {/* Volume Control */}
          </div>
        ) : (
          <p className="text-white">Select a video to start watching.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
