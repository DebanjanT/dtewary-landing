import React from "react";
import { Link } from "react-router-dom";
import ArrowRight from "../../assets/arrow-right.png";
import EngineerIcon from "../../assets/engineer.png";

/**
 * Footer component for the application
 * @returns {JSX.Element}
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Company */}
          <div className="space-y-6">
            <img
              loading="lazy"
              src="https://dtewary-dev-storage.innoida.utho.io/logo/dtewary-logo.png"
              alt="Logo"
              className="w-32 h-auto drop-shadow-lg"
            />
            <p className="text-md os-regular mb-4 text-green-100">
              We specialize in providing high-quality timber products to meet
              your diverse needs.
            </p>
            <Link to="/about" className="btn-brand-yellow w-fit px-3 py-1">
              READ MORE
            </Link>
          </div>

          {/* Products/Services */}
          <div className="">
            <div className="flex items-center justify-start pb-2 mb-4">
              <img
                loading="lazy"
                src={EngineerIcon}
                alt="Engineer"
                className="w-10 h-auto mr-1"
              />
              <h3 className="text-lg text-black font-bold  inline-block">
                OPEN SOURCE
              </h3>
            </div>
            <ul className="space-y-2 text-green-100 border-l border-dashed border-green-300/40">
              <li className="flex items-center">
                <img
                  loading="lazy"
                  src={ArrowRight}
                  alt="Arrow"
                  className="w-4 h-4 mr-1"
                />{" "}
                <Link
                  to="/oss/invoice"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Invoice Maker{" "}
                </Link>
              </li>
              <li className="flex items-center">
                <img
                  loading="lazy"
                  src={ArrowRight}
                  alt="Arrow"
                  className="w-4 h-4 mr-1"
                />{" "}
                <a
                  href="https://www.npmjs.com/package/@dtewary/tw-polaris"
                  to="/oss/invoice"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Tailwind Polaris{" "}
                </a>
              </li>
              <li className="flex items-center">
                <img
                  loading="lazy"
                  src={ArrowRight}
                  alt="Arrow"
                  className="w-4 h-4 mr-1"
                />
                <Link
                  to="/oss/web-components"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Web Components
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg text-black font-bold border-b-2 border-green-200 pb-2 mb-4 inline-block">
              REGISTERED OFFICE
            </h3>
            <div className="text-gray-300">
              <h4 className="text-white drop-shadow text-xl font-bold mb-1">
                DIBYENDU TEWARY
              </h4>
              <p className="mb-3">
                Chandrakona Road, P.O.: Satbankura
                <br />
                West Midnapre, West Bengal - 721253
              </p>
              <p className="mb-1">
                <span className="text-white">Tel:</span> +91 9933749960
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-white os-medium mb-2">
                Enquiries for Global:
              </h4>
              <p className="text-gray-300 text-sm">Email: admin@dtewary.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-green-800  py-4">
        <div className="container mx-auto px-4 flex text-green-400 flex-col md:flex-row justify-between items-center  text-sm font-bold os-regular">
          <div>All rights reserved © {currentYear} | Dibyendu Tewary</div>
        </div>
      </div>
    </footer>
  );
};

// Chevron icon component
const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-brand-green mr-2"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default Footer;
