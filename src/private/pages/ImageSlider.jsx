import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      backgroundImage: "url('/assets/SliderImage2.jpeg')",
      heading: "Explore Beautiful Locations",
      paragraph: "Discover stunning places for your next vacation.",
    },
    {
      backgroundImage: "url('/assets/SliderImage3.jpeg')",
      heading: "Vacation Rentals Just for You",
      paragraph: "Find the perfect home away from home.",
    },
    {
      backgroundImage: "url('/assets/image1.avif')",
      heading: "Affordable Stays",
      paragraph: "Enjoy quality time without breaking the bank.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[400px] bg-cover bg-center"
      style={{
        backgroundImage: slides[currentSlide].backgroundImage,
      }}
    >
      {/* Content Container */}
      <div className="absolute inset-0 flex items-center justify-between p-6 text-white bg-black bg-opacity-50">
        {/* Left Side */}
        <div className="left-side w-1/2 p-6">
          <h2 className="text-4xl font-semibold mb-4">
            {slides[currentSlide].heading}
          </h2>
          <p className="text-lg">{slides[currentSlide].paragraph}</p>
        </div>

        {/* Right Side (Optional, if needed) */}
        <div className="right-side w-1/2 hidden md:block">
          {/* Additional content can go here */}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-white cursor-pointer">
        <IoIosArrowBack onClick={prevSlide} />
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl text-white cursor-pointer">
        <IoIosArrowForward onClick={nextSlide} />
      </div>
    </div>
  );
};

export default Slider;
