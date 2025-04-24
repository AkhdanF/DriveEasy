import React, { useState, useEffect, useRef } from 'react';

const HeroBanner = () => {
  // Sample car images - replace with your actual image paths
  const carImages = [
    "/build/assets/images/byd.png",
    "/build/assets/images/hiace.png", // Fixed missing closing quote
    "/build/assets/images/zenix.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Function to go to a specific slide
  const goToSlide = (index: number) => { // Added type for index parameter
    setCurrentIndex(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, carImages.length]);

  return (
    <div className="relative bg-[#111827] text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-orange-500 bg-opacity-20 text-orange-500 px-3 py-1 rounded-md text-sm font-medium mb-4">
              Premium Car Rental
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Drive Your Way, <span className="text-orange-500">Today</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Premium car rental services with flexible options, transparent pricing, and exceptional customer service.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/cars"
                className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition"
              >
                Get Started Now
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-gray-400">Premium Cars</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-gray-400">User Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>
          </div>

          <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={carouselRef}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#FF6B35]/10 rounded-3xl"></div>
            <div className="relative p-4 overflow-hidden">
              {/* Carousel container */}
              <div className="relative h-[300px] md:h-[400px]">
                {carImages.map((src, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                      index === currentIndex ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-full z-0"
                    }`}
                  >
                    <img
                      src={src || "/placeholder.svg"}
                      alt={`Luxury Car ${index + 1}`}
                      className="w-full h-full object-contain transition-all duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {carImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex ? "bg-[#FF6B35] w-8" : "bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;