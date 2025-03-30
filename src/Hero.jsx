import React, { useState, useEffect, useCallback } from 'react';
import { Blurhash } from 'react-blurhash';

const HeroSection = ({ 
  slides = [], 
  autoSlideDelay = 5000, // Default 5 seconds between slides
  autoSlide = true 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Default slides if none provided
  const defaultSlides = [
   
    {
      id: 1,
      image: "https://dtd-stylex.vercel.app/assets/dt-depo-CWLz1tEB.jpg",
      blurhash: "LWJ7~@RP4nNH2zRiiuWC^,act6s:",
      title: "Innovative Solutions",
      subtitle: "Tailored to meet your specific needs"
    }
  ];
  
  const slideData = slides.length > 0 ? slides : defaultSlides;
  
  // Auto slide functionality
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
  }, [slideData.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));
  }, [slideData.length]);
  
  // Set up auto slide timer
  useEffect(() => {
    let slideTimer;
    
    if (autoSlide && slideData.length > 1) {
      slideTimer = setInterval(() => {
        nextSlide();
      }, autoSlideDelay);
    }
    
    return () => {
      if (slideTimer) {
        clearInterval(slideTimer);
      }
    };
  }, [autoSlide, autoSlideDelay, nextSlide, slideData.length]);
  
  // Preload current image
  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = slideData[currentSlide].image;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [currentSlide, slideData]);
  
  const { title, subtitle, image, blurhash } = slideData[currentSlide];
  
  // Pause auto-slide when user interacts with navigation
  const handleNavClick = (direction) => {
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
  };
  
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Blurhash placeholder */}
      <div className="absolute inset-0 w-full h-full">
        <Blurhash
          hash={blurhash || "L6Des^t7t7t7_3RjRjRj~qRjIURj"} // Fallback hash if not provided
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      
      {/* Hero Image */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4 max-w-3xl">{title}</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">{subtitle}</p>
        <button 
                        type='button'

          className="px-6 py-3 font-semibold rounded-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#FFDE00", color: "#333" }}
        >
          Explore Now
        </button>
      </div>
      
      {/* Only show navigation when there are multiple slides */}
      {slideData.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button 
                          type='button'

            onClick={() => handleNavClick('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-all"
            aria-label="Previous slide"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
                          type='button'

            onClick={() => handleNavClick('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-all"
            aria-label="Next slide"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slideData.map((slide, index) => (
              <button
                key={slide.id}
                type='button'
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;