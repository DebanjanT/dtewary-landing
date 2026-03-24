import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import SwanWoodImg from "../../assets/swan-wood-cdgr.jpg";
import citationIcon from "../../assets/citation.png";
import dtewaryKgp2024 from "../../assets/bigimg/dtewary-kgp-2024.jpg";
import { useAuth } from "../../context/AuthContext";
const HeroSection = ({
  slides = [],
  autoSlideDelay = 5000, // Default 5 seconds between slides
  autoSlide = true,
}) => {
  const navigate = useNavigate();
  const { currentUser, signInWithGoogle } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isFlipping, setIsFlipping] = useState(false);
  const [nextSlideIndex, setNextSlideIndex] = useState(null);
  const [foldDirection, setFoldDirection] = useState(
    "top-right-to-bottom-left"
  );

  // Default slides if none provided
  const defaultSlides = useMemo(
    () => [
      {
        id: 1,
        image: "https://dtd-stylex.vercel.app/assets/dt-depo-CWLz1tEB.jpg",
        blurhash: "LWJ7~@RP4nNH2zRiiuWC^,act6s:",
        title: "Premium Timber Solutions",
        subtitle:
          "Sal, Eucalyptus, Akashmoni & More, Delivered with Excellence",
      },

      {
        id: 2,
        // Use a different URL format that might be more reliable
        image: SwanWoodImg,
        blurhash: "LDHnjHb_9[WC?vxa56V[*0WB9FIo",
        title: "Premium Timber Solutions",
        subtitle:
          "Sal, Eucalyptus, Akashmoni & More, Delivered with Excellence",
      },
      {
        id: 3,
        // Use a different URL format that might be more reliable
        image: dtewaryKgp2024,
        blurhash: "LCGIWE9Z9~NgAF~q={M{=}DjyDt1",
        title: "Premium Timber Solutions",
        subtitle:
          "Sal, Eucalyptus, Akashmoni & More, Delivered with Excellence",
      },
    ],
    []
  );

  // Use memo to prevent recreation of slideData on every render
  const slideData = useMemo(
    () => (slides.length > 0 ? slides : defaultSlides),
    [slides, defaultSlides]
  );

  // Validate image URLs and handle potential network issues
  const validateImageUrls = useMemo(() => {
    return slideData.map((slide) => ({
      ...slide,
      // Use a local fallback image if the URL is invalid or has issues
      image:
        slide.image ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmUyZTIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=",
    }));
  }, [slideData]);

  // Add a function to detect mobile devices
  const isMobileDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
    );
  }, []);

  // Animation handling function
  const changeSlideWithAnimation = useCallback(
    (newIndex, direction = "next") => {
      if (isFlipping) return;

      // Set fold direction based on next or previous
      if (direction === "next") {
        setFoldDirection("top-right-to-bottom-left");
      } else {
        setFoldDirection("top-left-to-bottom-right");
      }

      setIsFlipping(true);
      setNextSlideIndex(newIndex);

      // Complete the transition after animation
      setTimeout(() => {
        setCurrentSlide(newIndex);
        setIsFlipping(false);
        setNextSlideIndex(null);
      }, 1200); // Match with CSS animation duration
    },
    [isFlipping]
  );

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isFlipping) return; // Prevent changing during animation
    const newIndex =
      currentSlide === slideData.length - 1 ? 0 : currentSlide + 1;
    changeSlideWithAnimation(newIndex, "next");
  }, [currentSlide, slideData.length, isFlipping, changeSlideWithAnimation]);

  const prevSlide = useCallback(() => {
    if (isFlipping) return; // Prevent changing during animation
    const newIndex =
      currentSlide === 0 ? slideData.length - 1 : currentSlide - 1;
    changeSlideWithAnimation(newIndex, "prev");
  }, [currentSlide, slideData.length, isFlipping, changeSlideWithAnimation]);

  // Set up auto slide timer
  useEffect(() => {
    let slideTimer;

    if (autoSlide && slideData.length > 1 && !isFlipping) {
      slideTimer = setInterval(() => {
        nextSlide();
      }, autoSlideDelay);
    }

    return () => {
      if (slideTimer) {
        clearInterval(slideTimer);
      }
    };
  }, [autoSlide, autoSlideDelay, nextSlide, slideData.length, isFlipping]);

  // Preload all images on initial render with mobile optimization
  useEffect(() => {
    const imageRefs = new Map();
    let isMounted = true;

    // Create a simple in-memory cache
    const imageCache = {};

    const preloadImage = (src, id) => {
      // Skip if already loaded in state
      if (loadedImages?.[id]) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const img = new Image();
        imageRefs.set(id, img);

        img.onload = () => {
          if (isMounted) {
            setLoadedImages((prev) => ({ ...prev, [id]: true }));
            imageCache[src] = true;
          }
          resolve();
        };

        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          // Still mark as loaded to avoid blocking
          if (isMounted) {
            setLoadedImages((prev) => ({ ...prev, [id]: true }));
          }
          resolve();
        };

        // Simple approach - just set the src
        img.src = src;
      });
    };

    const preloadAllImages = async () => {
      try {
        // Always preload all images, but prioritize current and next
        const currentImage = validateImageUrls[currentSlide].image;
        const nextIndex =
          currentSlide === validateImageUrls.length - 1 ? 0 : currentSlide + 1;
        const nextImage = validateImageUrls[nextIndex].image;

        // Load current and next slide first
        await Promise.all([
          preloadImage(currentImage, validateImageUrls[currentSlide].id),
          preloadImage(nextImage, validateImageUrls[nextIndex].id),
        ]);

        // Then load any remaining slides
        if (validateImageUrls.length > 2) {
          validateImageUrls.forEach((slide, index) => {
            if (index !== currentSlide && index !== nextIndex) {
              preloadImage(slide.image, slide.id);
            }
          });
        }
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadAllImages();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
      // Clear all image references
      for (const img of imageRefs.values()) {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }
      imageRefs.clear();
    };
  }, [validateImageUrls, currentSlide, loadedImages]);

  const currentSlideData = validateImageUrls[currentSlide];
  const isCurrentLoaded = loadedImages?.[currentSlideData.id];

  // Get next slide data for the animation
  const nextSlideData =
    nextSlideIndex !== null ? validateImageUrls[nextSlideIndex] : null;
  const isNextLoaded = nextSlideData ? loadedImages?.[nextSlideData.id] : false;

  // Pause auto-slide when user interacts with navigation
  const handleNavClick = (direction) => {
    if (isFlipping) return; // Prevent multiple clicks during animation
    if (direction === "prev") {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  const goToSlide = (index) => {
    if (isFlipping || index === currentSlide) return;
    const direction = index > currentSlide ? "next" : "prev";
    changeSlideWithAnimation(index, direction);
  };

  return (
    <div className="relative w-full h-[30rem] overflow-hidden">
      {/* Base layer - Next slide that will be revealed */}
      <div className="absolute inset-0 w-full h-full">
        {/* Blurhash placeholder */}
        <div className="absolute inset-0 w-full h-full">
          <Blurhash
            hash={
              nextSlideData && isFlipping
                ? nextSlideData.blurhash
                : currentSlideData.blurhash || "L6Des^t7t7t7_3RjRjRj~qRjIURj"
            }
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>

        {/* Hero Image */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500"
          style={{
            backgroundImage: `url(${nextSlideData && isFlipping
              ? nextSlideData.image
              : currentSlideData.image
              })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity:
              nextSlideData && isFlipping
                ? isNextLoaded
                  ? 1
                  : 0
                : isCurrentLoaded
                  ? 1
                  : 0,
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between py-20 h-full text-center px-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              {nextSlideData && isFlipping
                ? nextSlideData.title
                : currentSlideData.title}
            </h1>
            <p className="text-sm sm:text-md md:text-lg text-white mb-8 max-w-2xl">
              {nextSlideData && isFlipping
                ? nextSlideData.subtitle
                : currentSlideData.subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (currentUser) {
                  navigate("/quotation");
                } else {
                  setShowLoginDialog(true);
                }
              }}
              className="os-regular flex justify-center items-center gap-2 px-6 py-3 font-semibold hover:opacity-90 bg-brand-yellow text-brand-black shadow-medium hover:scale-[105%] transition-all ease-in-out duration-200"
            >
              <img src={citationIcon} alt="Get A Quote" /> Get A Quote
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="os-regular flex justify-center items-center gap-2 px-6 py-3 font-semibold bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 shadow-medium hover:scale-[105%] transition-all ease-in-out duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </button>
          </div>
        </div>

        {/* Login Required Dialog */}
        {showLoginDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLoginDialog(false)}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowLoginDialog(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-stone-800 text-center mb-2">
                Login Required
              </h3>
              <p className="text-stone-600 text-center mb-8">
                You need to be logged in to request a quotation. Please sign in with your Google account to continue.
              </p>

              {/* Login Button */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    setShowLoginDialog(false);
                    navigate("/quotation");
                  } catch (error) {
                    console.error("Login failed:", error);
                  }
                }}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-stone-200 rounded-xl font-medium text-stone-700 hover:border-stone-300 hover:shadow-lg transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <title>Google</title>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              {/* Cancel */}
              <button
                type="button"
                onClick={() => setShowLoginDialog(false)}
                className="w-full mt-3 px-6 py-3 text-stone-500 hover:text-stone-700 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Page fold container */}
      {isFlipping && (
        <div className="absolute inset-0 w-full h-full">
          {/* Main page that's currently visible and being folded away */}
          <div className={`page-main ${foldDirection}`}>
            {/* Blurhash placeholder */}
            <div className="absolute inset-0 w-full h-full">
              <Blurhash
                hash={
                  currentSlideData.blurhash || "L6Des^t7t7t7_3RjRjRj~qRjIURj"
                }
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            </div>

            {/* Hero Image */}
            <div
              className={`absolute inset-0 w-full h-full ${isCurrentLoaded ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url(${currentSlideData.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-between py-20 h-full text-center px-4">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
                  {currentSlideData.title}
                </h1>
                <p className="text-sm sm:text-md md:text-lg text-white mb-8 max-w-2xl">
                  {currentSlideData.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  className="os-regular flex justify-center items-center gap-2 px-6 py-3 font-semibold hover:opacity-90 bg-brand-yellow text-brand-black shadow-medium hover:scale-[105%] transition-all ease-in-out duration-200"
                >
                  <img src={citationIcon} alt="Get A Quote" /> Get A Quote
                </button>
                <button
                  type="button"
                  className="os-regular flex justify-center items-center gap-2 px-6 py-3 font-semibold bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 shadow-medium hover:scale-[105%] transition-all ease-in-out duration-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Fold corner effect - this is the folded triangle */}
          <div className={`page-fold-corner ${foldDirection}`}>
            {/* Content on back of folded corner (mirrored) */}
            <div className="fold-content">
              {/* Back of page (slightly darker to simulate shadow) */}
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <div className="absolute inset-0 bg-gray-800"></div>
            </div>
          </div>

          {/* Page fold shadow */}
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <div className={`page-fold-shadow ${foldDirection}`}></div>
        </div>
      )}

      {/* Only show navigation when there are multiple slides */}
      {slideData.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => handleNavClick("prev")}
            className="absolute left-6 bottom-6 md:top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-40 border text-white hover:bg-opacity-60 transition-all"
            aria-label="Previous slide"
            disabled={isFlipping}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("next")}
            className="absolute right-6 bottom-6 md:top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-40 border text-white hover:bg-opacity-60 transition-all"
            aria-label="Next slide"
            disabled={isFlipping}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slideData.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full bg-white ${currentSlide === index ? "opacity-100" : "bg-opacity-50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isFlipping}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;
