import React from "react";

const TrustedBySection = ({ partners }) => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* M3 Surface with tonal elevation */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50" />

      {/* Decorative shapes - M3 style */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-green/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-brand-yellow/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* M3 Header with display typography */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-sm font-medium text-brand-green tracking-wide">
              Our Partners
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted by Renowned
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building lasting partnerships with industry leaders across the region
          </p>
        </div>

        {/* M3 Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* M3 Elevated Card */}
              <div className="relative bg-white rounded-3xl p-6 md:p-4 transition-all duration-300 ease-out hover:scale-[1.02] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.1)]">
                {/* State layer - M3 hover effect */}
                <div className="absolute inset-0 rounded-3xl bg-brand-green/0 group-hover:bg-brand-green/5 transition-colors duration-300" />

                {/* Index badge - M3 style */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                  <span className="text-white text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Logo container */}
                <div className="relative aspect-[3/2] flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-20 md:max-h-24 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Partner name - appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="text-center text-sm font-medium text-gray-700 truncate">
                    {partner.name}
                  </p>
                </div>
              </div>

              {/* M3 Ripple effect indicator
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gray-200 group-hover:bg-brand-green/30 transition-colors duration-300" />
              </div> */}
            </div>
          ))}
        </div>

        {/* Bottom decorative element - M3 style */}
        {/* <div className="flex justify-center mt-12">
          <div className="flex items-center gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${i === 1
                    ? "w-8 h-2 bg-brand-green"
                    : "w-2 h-2 bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustedBySection;
