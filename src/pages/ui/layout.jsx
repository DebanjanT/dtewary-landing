import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/shared/Footer";

/**
 * Layout component for UI documentation pages
 */
const UILayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // List of all UI components
  const components = [
    { name: "Accordion", path: "/oss/web-components/accordion" },
    { name: "Alert", path: "/oss/web-components/alert" },
    { name: "Calendar", path: "/oss/web-components/calendar" },
    { name: "Checkbox", path: "/oss/web-components/checkbox" },
    { name: "DatePicker", path: "/oss/web-components/datepicker" },
    { name: "Dialog", path: "/oss/web-components/dialog" },
    { name: "Drawer", path: "/oss/web-components/drawer" },
    { name: "InputOTP", path: "/oss/web-components/inputotp" },
    { name: "Pagination", path: "/oss/web-components/pagination" },
    { name: "Select", path: "/oss/web-components/select" },
    { name: "Switch", path: "/oss/web-components/switch" },
    { name: "Toggle", path: "/oss/web-components/toggle" },
    { name: "Tooltip", path: "/oss/web-components/tooltip" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 via-green-100 to-brand-green">
      {/* Header */}
      <header className="bg-white shadow-mild py-4 px-6 ">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl os-semibold text-brand-blackLight">
            <img
              src="https://dtewary-dev-storage.innoida.utho.io/logo/dtewary-logo.png"
              alt="Logo"
              className="w-10 h-auto drop-shadow-lg"
            />
            Web Components
            <p className="text-sm italic font-normal">Dtewary Open Source</p>
          </Link>
          <button
            type="button"
            className="md:hidden text-brand-blackLight"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            bg-white shadow-mild w-64 flex-shrink-0 overflow-y-auto
            transition-transform duration-300 ease-in-out
            md:translate-x-0 md:static
            ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed top-0 left-0 h-full z-40 mt-16 md:mt-0
          `}
        >
          <nav className="p-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/dtewary/oss_web_components.git"
              type="button"
              className="btn-brand-yellow my-2 w-full py-3"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>

              <p>Get Source Access</p>
            </a>
            <ul className="space-y-1">
              {components.map((component) => (
                <li key={component.path}>
                  <Link
                    to={component.path}
                    className={`
                      block px-4 py-2 rounded-md os-medium
                      ${
                        location.pathname === component.path
                          ? "bg-brand-green text-white"
                          : "text-brand-blackLight hover:bg-gray-100"
                      }
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {component.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Menu icon component
const MenuIcon = () => (
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
    aria-hidden="true"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default UILayout;
