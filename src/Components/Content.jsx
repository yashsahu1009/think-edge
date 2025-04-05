import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";

import right from "../assets/home-right.webp"; // Ensure correct path for the image
import SupportIcon from "./Help"; // Import the SupportIcon component from a separate file

const Content = () => {
  const typedRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Typed.js typing animation
    const typed = new Typed(typedRef.current, {
      strings: [
        "Web Designer",
        "Web Developer",
        "Graphic Designer",
        "YouTuber",
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    // Cleanup Typed.js instance on component unmount
    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    // Counter animation
    const counters = document.querySelectorAll(".count");
    const speed = 200;

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        let count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCount();
    });
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="hero-section text-center py-12 px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-7/12">
            <h1 className="text-4xl font-bold">
              Learn & become the <br />
              <span className="text-indigo-600">Top 1% software developer</span>
            </h1>
            <h4 className="text-4xl mt-4 mb-2">
              <span ref={typedRef}></span>
            </h4>
            <button
              className="btn bg-indigo-600 text-white font-bold py-3 px-6 rounded mt-6 hover:bg-indigo-700"
              onClick={() => navigate("/sigma-course")}
            >
              <span className="text-yellow-400">Ultimate</span> Placement
              Solution &raquo;
            </button>
          </div>
          <div className="md:w-5/12">
            <img
              src={right}
              alt="Smiling person coding"
              className="max-w-[450px] h-auto responsive-image rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section relative bg-gradient-to-br from-indigo-500 to-indigo-400 text-white py-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-tl from-indigo-400 to-indigo-500 transform skew-y-12 z-0"></div>

        <div className="relative z-10 text-center">
          <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            INDIA'S MOST LOVED CODING COMMUNITY ❤️
          </h5>

          {/* Responsive Grid for Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <p className="text-4xl">&#128101;</p>
              <h3
                className="count text-3xl font-semibold"
                data-target="6000000"
              >
                0
              </h3>
              <p className="text-lg">Happy Learners</p>
            </div>

            <div className="text-center">
              <p className="text-4xl">&#128065;</p>
              <h3 className="text-3xl font-semibold">2 Crore+</h3>
              <p className="text-lg">Monthly Views</p>
            </div>

            <div className="text-center">
              <p className="text-4xl">&#128279;</p>
              <h3 className="count text-3xl font-semibold" data-target="100000">
                0
              </h3>
              <p className="text-lg">New Monthly Subscribers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placement Section */}
      <section className="placement bg-white text-center py-16 px-4">
        <h1 className="text-3xl font-bold text-indigo-600">
          NEW PLACEMENT PREP BATCH 🔥
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          SIGMA 5.0: DSA + DEVELOPMENT + APTITUDE
        </p>
        <p className="text-lg text-gray-700 mt-2 mb-5">
          Start your placement preparation today!
        </p>
        <a
          href="#"
          className="btn bg-indigo-600 text-white py-3 px-6 mt-3 rounded mt-6 hover:bg-indigo-700"
          onClick={() => navigate("/sigma-course")}
        >
          Explore More &raquo;
        </a>
      </section>

      {/* Companies Section */}
      <section className="companies py-16 text-center bg-gray-100">
        <h2 className="font-semibold text-4xl">
          Thousands of students achieved their{" "}
          <span className="text-primary text-indigo-600">dream job at</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center mt-8">
          {[/* Company logos */].map((company, index) => (
            <img
              key={index}
              src={company.src}
              alt={company.alt}
              className="w-40 h-auto mx-4 my-4"
            />
          ))}
        </div>
      </section>

      <SupportIcon /> {/* Added SupportIcon Component */}
    </div>
  );
};

export default Content;
