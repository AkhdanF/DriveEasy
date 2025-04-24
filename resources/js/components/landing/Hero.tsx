"use client"

import { Link } from "@inertiajs/react"
import { useEffect, useState, useRef } from "react"

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const carImages = [
    "/build/assets/images/byd.png",
    "/build/assets/images/zenix.png", // Replace with actual different images
    "/build/assets/images/hiace.png", // Replace with actual different images
  ]

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carImages.length)
    }, 3000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, carImages.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }
  

  return (
    <div className="relative overflow-hidden py-12 lg:py-20 w-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#FF6B35]/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-gradient-to-l from-[#FF6B35]/10 to-transparent blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative w-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-2">
            Premium Car Rental
          </div>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
            Drive Your Way, <span className="text-[#FF6B35]">Today</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
            Premium car rental services with flexible options, transparent pricing, and exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <Link
              href={route('login')}
              className="rounded-lg bg-[#FF6B35] px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-[#e05222] hover:scale-105"
            >
              Get Started Now
            </Link>
            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800 mt-8">
            <div>
              <p className="text-[#FF6B35] text-2xl font-bold">50+</p>
              <p className="text-gray-400 text-sm">Premium Cars</p>
            </div>
            <div>
              <p className="text-[#FF6B35] text-2xl font-bold">4.9</p>
              <p className="text-gray-400 text-sm">User Rating</p>
            </div>
            <div>
              <p className="text-[#FF6B35] text-2xl font-bold">24/7</p>
              <p className="text-gray-400 text-sm">Support</p>
            </div>
          </div>
        </div>

        {/* Image Content - Carousel */}
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
  )
}
