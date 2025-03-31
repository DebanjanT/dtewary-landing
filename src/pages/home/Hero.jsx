import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Blurhash } from "react-blurhash";
import { RiFilePaper2Fill } from "react-icons/ri";

const HeroSection = ({
  slides = [],
  autoSlideDelay = 5000, // Default 5 seconds between slides
  autoSlide = true,
}) => {
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
        image:
          "https://static.toiimg.com/thumb/msid-92378232,width-1280,height-720,imgsize-99230,resizemode-72,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
        blurhash: "LsDmp*oynio#PqbbWCkD-Yn,kVbI",
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
            backgroundImage: `url(${
              nextSlideData && isFlipping
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
          <button
            type="button"
            className="os-regular flex justify-center items-center gap-2 px-6 py-3 font-semibold hover:opacity-90 bg-brand-yellow text-brand-black shadow-medium hover:scale-[105%] transition-all ease-in-out duration-200"
          >
            <RiFilePaper2Fill /> Get A Quote
          </button>
        </div>
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
              className={`absolute inset-0 w-full h-full ${
                isCurrentLoaded ? "opacity-100" : "opacity-0"
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
              <button
                type="button"
                className="os-regular flex justify-center items-center gap-2 px-6 py-3 font-semibold hover:opacity-90 bg-brand-yellow text-brand-black shadow-medium hover:scale-[105%] transition-all ease-in-out duration-200"
              >
                <RiFilePaper2Fill /> Get A Quote
              </button>
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
                className={`w-3 h-3 rounded-full bg-white ${
                  currentSlide === index ? "opacity-100" : "bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isFlipping}
              />
            ))}
          </div>
        </>
      )}

      {/* CSS for page fold animation */}
      <style jsx>{`
        /* Base styles for page components */
        .page-main {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .page-fold-corner {
          position: absolute;
          z-index: 20;
          background-color: rgba(0, 0, 0, 0.1);
          box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .fold-content {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotateY(180deg);
          backface-visibility: hidden;
        }

        .page-fold-shadow {
          position: absolute;
          z-index: 15;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), transparent);
          pointer-events: none;
        }

        /* Top-right to bottom-left page fold animation */
        .page-main.top-right-to-bottom-left {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          animation: foldPageTRBL 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .page-fold-corner.top-right-to-bottom-left {
          top: 0;
          right: 0;
          transform-origin: top right;
          animation: cornerFoldTRBL 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .page-fold-shadow.top-right-to-bottom-left {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          animation: shadowTRBL 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Top-left to bottom-right page fold animation */
        .page-main.top-left-to-bottom-right {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          animation: foldPageTLBR 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .page-fold-corner.top-left-to-bottom-right {
          top: 0;
          left: 0;
          transform-origin: top left;
          animation: cornerFoldTLBR 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .page-fold-shadow.top-left-to-bottom-right {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          animation: shadowTLBR 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Animation keyframes for top-right to bottom-left fold */
        @keyframes foldPageTRBL {
          0% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
          100% {
            clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 0% 100%);
          }
        }

        @keyframes cornerFoldTRBL {
          0% {
            width: 0%;
            height: 0%;
            transform: rotate(0deg);
          }
          100% {
            width: 200%; /* Increased from 141% to ensure full coverage */
            height: 200%; /* Increased from 141% to ensure full coverage */
            transform: rotate(-90deg);
          }
        }

        @keyframes shadowTRBL {
          0% {
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }

        /* Animation keyframes for top-left to bottom-right fold */
        @keyframes foldPageTLBR {
          0% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
          100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%);
          }
        }

        @keyframes cornerFoldTLBR {
          0% {
            width: 0%;
            height: 0%;
            transform: rotate(0deg);
          }
          100% {
            width: 200%; /* Increased from 141% to ensure full coverage */
            height: 200%; /* Increased from 141% to ensure full coverage */
            transform: rotate(90deg);
          }
        }

        @keyframes shadowTLBR {
          0% {
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
