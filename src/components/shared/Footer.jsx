import React from "react";
import { Link } from "react-router-dom";
import DTLogo from "../../assets/DTLOGO.png";

/**
 * Footer component for the application
 * @returns {JSX.Element}
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const ossProjects = [
    { name: "Invoice Maker", link: "/oss/invoice", external: false },
    {
      name: "Tailwind Polaris",
      link: "https://www.npmjs.com/package/@dtewary/tw-polaris",
      external: true,
    },
    { name: "Web Components", link: "/oss/web-components", external: false },
  ];

  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-brand-yellow/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="relative">
        {/* Top Section - Brand Showcase */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-6 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
              {/* Brand Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
                {/* Logo with glow effect */}
                <div className="relative mb-6 group">
                  <div className="absolute inset-0 bg-brand-green/20 rounded-full blur-xl group-hover:bg-brand-green/30 transition-all duration-500" />
                  <img
                    loading="lazy"
                    src={DTLogo}
                    alt="Dibyendu Tewary Logo"
                    className="relative w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl"
                  />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Dibyendu Tewary
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Delivering excellence in timber products with unmatched quality
                  and competitive pricing across Bengal.
                </p>

                {/* Social/CTA */}
                <Link
                  to="/about"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/25 group"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              {/* Contact Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 max-w-sm w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-brand-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Registered Office
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Chandrakona Road, P.O.: Satbankura
                    <br />
                    West Midnapore, West Bengal - 721253
                  </p>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-brand-yellow"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <a
                      href="tel:+919933749960"
                      className="text-gray-300 hover:text-brand-yellow transition-colors"
                    >
                      +91 9933749960
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-brand-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <a
                      href="mailto:admin@dtewary.com"
                      className="text-gray-300 hover:text-brand-green transition-colors"
                    >
                      admin@dtewary.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>©</span>
              <span>{currentYear}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400 font-medium">Dibyendu Tewary</span>
              <span className="text-gray-600">•</span>
              <span>All rights reserved</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-1 text-sm">
              {quickLinks.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link
                    to={item.link}
                    className="text-gray-500 hover:text-white transition-colors px-2 py-1"
                  >
                    {item.name}
                  </Link>
                  {index < quickLinks.length - 1 && (
                    <span className="text-gray-700">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* OSS Projects - Inline */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                OSS:
              </span>
              {ossProjects.map((project, index) => (
                <React.Fragment key={project.name}>
                  {project.external ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-brand-yellow transition-colors"
                    >
                      {project.name}
                    </a>
                  ) : (
                    <Link
                      to={project.link}
                      className="text-gray-500 hover:text-brand-yellow transition-colors"
                    >
                      {project.name}
                    </Link>
                  )}
                  {index < ossProjects.length - 1 && (
                    <span className="text-gray-700">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
