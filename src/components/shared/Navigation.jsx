import React, { useMemo, useState } from "react";
import Input from "../../components/Input";
import Tabs from "../../components/Tabs";
import { useNavigate } from "react-router-dom";
import manIcon from "../../assets/man.png";
import houseIcon from "../../assets/house.png";
import chatBoxIcon from "../../assets/chat-box.png";
import LoupeIcon from "../../assets/loupe.png";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";

const Navigation = ({ page }) => {
  const { currentUser, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const activeTab = useMemo(() => {
    switch (page) {
      case "Home":
        return 0;
      case "About Us":
        return 1;
      case "Contact":
        return 2;
      case "UI Components":
        return 3;
      case "Gallery":
        return 4;
      default:
        return -1;
    }
  }, [page]);

  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const tabsData = useMemo(
    () => [
      {
        label: "Home",
        Prefix: houseIcon, // Pass the component reference, not <FiHome />
        onClick: () => {
          navigate("/");
        },
      },
      {
        label: "About Us",
        Prefix: manIcon,
        onClick: () => {
          navigate("/about");
        },
      },
      {
        label: "Contact",
        Prefix: chatBoxIcon,
        onClick: () => {
          navigate("/contact");
        },
      },

      // {
      //   label: "Gallery",
      //   Prefix: galleryIcon,
      // },
    ],
    []
  );

  // Memoize the onChange handler
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleTabChange = useMemo(
    () => (index) => {
      const tab = tabsData[index];
      if (tab.onClick) {
        tab.onClick();
      }
    },

    []
  );

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
      {/* Navigation */}
      <div className=" py-2 px-3 border-b border-gray-200 flex justify-between items-center gap-2">
        {/* Logo */}
        <div className="flex items-center justify-start gap-1">
          <img
            src="https://dtewary-dev-storage.innoida.utho.io/logo/dtewary-logo.png"
            alt="Logo"
            className="w-14 h-auto"
          />
          <h1 className="text-2xl font-bold text-brand-green">
            Dibyendu Tewary
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Input
              placeholder="Search"
              containerClassName="w-[220px]"
              prefixSvg={LoupeIcon}
            />
          </div>
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden md:inline-block">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="text-sm px-3 py-1 bg-brand-yellow hover:bg-yellow-500 rounded-md transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="overflow-scroll scrollbar-hide">
        {/* Menu */}
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navigation;
