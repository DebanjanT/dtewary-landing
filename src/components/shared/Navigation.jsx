import React, { useMemo } from "react";
import Input from "../../components/Input";
import Tabs from "../../components/Tabs";
import { useNavigate } from "react-router-dom";
import manIcon from "../../assets/man.png";
import houseIcon from "../../assets/house.png";
import galleryIcon from "../../assets/gallery.png";
import chatBoxIcon from "../../assets/chat-box.png";
import LoupeIcon from "../../assets/loupe.png";
const Navigation = ({ page }) => {
  const activeTab = useMemo(() => {
    switch (page) {
      case "Home":
        return 0;
      case "About Us":
        return 1;
      case "Contact":
        return 2;
      case "Gallery":
        return 3;
      default:
        return 0;
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
      {
        label: "Gallery",
        Prefix: galleryIcon,
      },
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
          <h1 className="text-xl text- font-bold text-green-700">
            DIBYENDU TEWARY
          </h1>
        </div>
        <div className="hidden sm:block">
          <Input
            placeholder="Search"
            containerClassName="w-[220px]"
            prefixSvg={LoupeIcon}
          />
        </div>
      </div>
      <div className="hidden sm:block">
        {/* Menu */}
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </div>
    </>
  );
};

export default Navigation;
