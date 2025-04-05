import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

// Import images correctly
import img1 from "../assets/92e90c367bdf4433e87f4239bedeb097.png"
import img2 from "../assets/5161cfc51a98dac3e77d5e93349e885e.png"
import img3 from "../assets/4808325683ee3cc0e3346b92d1fca325.png";
import img4 from "../assets/5161cfc51a98dac3e77d5e93349e885e.png";
import img5 from "../assets/4808325683ee3cc0e3346b92d1fca325.png";

const ImageSlider = () => {
  const images = [img1,img2,img3, img4, img5];

  return (
    <div className="w-full mx-auto">
      <Swiper
        slidesPerView={1} // Ensures full-width images
        spaceBetween={0} // No gaps
        pagination={{ clickable: true }}
        loop={true} // Infinite scrolling
        autoplay={{
          delay: 2000, // Auto-slide every 2 seconds
          disableOnInteraction: false, // Keeps autoplay after user interaction
        }}
        speed={1000} // Smooth transition effect (1s)
        modules={[Pagination, Autoplay]}
        className="rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 rounded-lg  "
              loading="lazy"
              onError={(e) => (e.target.src = "https://via.placeholder.com/800")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
