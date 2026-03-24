import React from "react";

const SectionDivider = ({ variant = "wave", flip = false, className = "" }) => {
  const dividers = {
    wave: (
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 80C1248 70 1344 50 1392 40L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
          fill="currentColor"
        />
      </svg>
    ),
    curve: (
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 80L1440 80L1440 40C1440 40 1200 0 720 0C240 0 0 40 0 40L0 80Z"
          fill="currentColor"
        />
      </svg>
    ),
    zigzag: (
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 60L80 45L160 60L240 45L320 60L400 45L480 60L560 45L640 60L720 45L800 60L880 45L960 60L1040 45L1120 60L1200 45L1280 60L1360 45L1440 60V60H0V60Z"
          fill="currentColor"
        />
      </svg>
    ),
    flow: (
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 100V60C240 100 480 20 720 40C960 60 1200 100 1440 60V100H0Z"
          fill="currentColor"
        />
        <path
          d="M0 100V80C240 60 480 100 720 80C960 60 1200 40 1440 80V100H0Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
    ),
    connector: (
      <svg
        viewBox="0 0 1440 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 0V100C360 150 720 50 1080 100C1260 125 1380 140 1440 150V0H0Z"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M0 50V150H1440V50C1200 100 960 0 720 50C480 100 240 0 0 50Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return (
    <div className={`relative w-full overflow-hidden leading-none ${className}`}>
      {dividers[variant] || dividers.wave}
    </div>
  );
};

export default SectionDivider;
