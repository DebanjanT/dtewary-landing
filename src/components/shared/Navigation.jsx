import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";
import DTLogo from "../../assets/DTLOGO.png";

const Navigation = ({ page }) => {
  const { currentUser, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/", page: "Home" },
    { label: "About Us", path: "/about", page: "About Us" },
    { label: "News Room", path: "/newsroom", page: "News Room" },
    { label: "Contact", path: "/contact", page: "Contact" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="relative">
        {/* Vintage decorative top border */}
        <div className="h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green" />

        {/* Main Header */}
        <div className="bg-gradient-to-b from-stone-50 to-white">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo Section - Vintage style */}
              <Link to="/" className="flex items-center gap-3 group">
                {/* Logo with vintage frame effect */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-brand-green/20 to-brand-yellow/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                  <div className="relative bg-white p-1.5 rounded-lg border-2 border-stone-200 shadow-sm">
                    <img
                      src={DTLogo}
                      alt="Dibyendu Tewary Logo"
                      className="w-12 h-12 md:w-14 md:h-14 object-contain"
                    />
                  </div>
                </div>

                {/* Brand Name - Classic typography */}
                <div className="">
                  <div className="flex flex-col">
                    <span className="text-[10px] lg:text-xs tracking-[0.3em] text-stone-500 uppercase font-medium">
                      Trusted By Generations
                    </span>
                    <h1 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">
                      Dibyendu Tewary
                    </h1>
                    <span className="text-xs text-brand-green font-medium tracking-wide">
                      Timber Merchant
                    </span>
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${page === item.page
                      ? "text-brand-green"
                      : "text-stone-600 hover:text-stone-900"
                      }`}
                  >
                    {/* M3 State layer */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${page === item.page
                        ? "bg-brand-green/10"
                        : "bg-transparent group-hover:bg-stone-100"
                        }`}
                    />
                    {/* Active indicator - vintage underline style */}
                    {page === item.page && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-green rounded-full" />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                ))}

                {/* Vintage separator */}
                <div className="w-px h-6 bg-stone-300 mx-2" />

                {/* Auth Section */}
                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full">
                      <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-brand-green">
                          {(currentUser.displayName || currentUser.email)?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-stone-600 hidden lg:inline max-w-[100px] truncate">
                        {currentUser.displayName || currentUser.email}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-sm px-4 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="relative overflow-hidden px-5 py-2 text-sm font-medium text-white bg-brand-green rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-green to-emerald-600 group-hover:from-emerald-600 group-hover:to-brand-green transition-all duration-500" />
                    <span className="relative">Login</span>
                  </button>
                )}
              </nav>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span
                    className={`w-5 h-0.5 bg-stone-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                      }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-stone-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                      }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-stone-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - M3 style with vintage touch */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-lg z-50 transition-all duration-300 ${mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${page === item.page
                  ? "bg-brand-green/10 text-brand-green"
                  : "text-stone-600 hover:bg-stone-50"
                  }`}
              >
                {page === item.page && (
                  <span className="w-1 h-6 bg-brand-green rounded-full" />
                )}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="pt-4 mt-4 border-t border-stone-200">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-brand-green">
                        {(currentUser.displayName || currentUser.email)?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-800">
                        {currentUser.displayName || "User"}
                      </p>
                      <p className="text-xs text-stone-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-stone-600 hover:bg-stone-50 rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-center font-medium text-white bg-brand-green rounded-xl hover:bg-brand-green/90 transition-all"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </div>

        {/* Vintage decorative bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navigation;
