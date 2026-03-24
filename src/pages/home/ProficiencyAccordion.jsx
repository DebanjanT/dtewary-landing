import React, { useState } from "react";

const proficiencyData = [
  {
    id: 1,
    title: "Premium Quality",
    description:
      "We guarantee the highest quality of the products compared to market.",
    image:
      "https://dtd-stylex.vercel.app/assets/premium-quality-lq-dSEIMso4.jpg",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: 2,
    title: "Best Market Price",
    description:
      "We provide premium-quality wood at the most competitive prices.",
    image:
      "https://dtd-stylex.vercel.app/assets/best-market-price-lq-o-3DZDTp.jpg",
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: 3,
    title: "Oversized Lots",
    description:
      "Between any range we offer oversized lots with a higher proportion than any competitor in Bengal.",
    image:
      "https://dtd-stylex.vercel.app/assets/oversized-lots-lq-BxigSa-t.jpg",
    color: "from-blue-500 to-indigo-600",
  },
];

const ProficiencyAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Desktop View - Horizontal Expanding Accordion */}
      <div className="hidden lg:flex h-[450px] gap-2">
        {proficiencyData.map((item, index) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out ${
              activeIndex === index ? "flex-[4]" : "flex-[1]"
            }`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => e.key === "Enter" && setActiveIndex(index)}
            role="button"
            tabIndex={0}
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 transition-opacity duration-300`}
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              {/* Vertical Title (shown when collapsed) */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-0 rotate-0"
                    : "opacity-100 -rotate-90"
                }`}
              >
                <h3 className="text-white text-xl font-bold whitespace-nowrap drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              {/* Expanded Content */}
              <div
                className={`transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`w-12 h-1 bg-gradient-to-r ${item.color} rounded-full`}
                  />
                  <span className="text-white/80 text-sm font-medium">
                    0{item.id}
                  </span>
                </div>
                <h3 className="text-white text-3xl font-bold mb-3 drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-white/90 text-base max-w-md leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Index indicator */}
            <div
              className={`absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                activeIndex === index ? "scale-100" : "scale-75 opacity-50"
              }`}
            >
              <span className="text-white font-bold">0{item.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet View - Medium screens */}
      <div className="hidden md:flex lg:hidden flex-col gap-3">
        {proficiencyData.map((item, index) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-in-out ${
              activeIndex === index ? "h-72" : "h-20"
            }`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => e.key === "Enter" && setActiveIndex(index)}
            role="button"
            tabIndex={0}
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-50`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Collapsed Header */}
            <div
              className={`absolute inset-0 flex items-center px-6 transition-all duration-300 ${
                activeIndex === index ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  0{item.id}
                </span>
                <h3 className="text-white text-xl font-bold drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
              <ChevronIcon
                className={`ml-auto text-white transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Expanded Content */}
            <div
              className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                activeIndex === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold`}
                >
                  0{item.id}
                </span>
                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
              </div>
              <p className="text-white/90 text-base ml-13 pl-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Stacked Cards */}
      <div className="flex md:hidden flex-col gap-4">
        {proficiencyData.map((item, index) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            onClick={() =>
              setActiveIndex(activeIndex === index ? -1 : index)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setActiveIndex(activeIndex === index ? -1 : index)
            }
            role="button"
            tabIndex={0}
          >
            {/* Card Header - Always visible */}
            <div
              className={`relative h-20 overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "rounded-t-xl" : "rounded-xl"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-70`}
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
                    0{item.id}
                  </span>
                  <h3 className="text-white text-lg font-bold">{item.title}</h3>
                </div>
                <ChevronIcon
                  className={`text-white transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-64" : "max-h-0"
              }`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots - Desktop only */}
      <div className="hidden lg:flex justify-center gap-2 mt-6">
        {proficiencyData.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index
                ? `w-8 h-2 bg-gradient-to-r ${item.color}`
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
};

const ChevronIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default ProficiencyAccordion;
