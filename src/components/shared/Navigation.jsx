import React, { useMemo, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Input from "../../components/Input";
import Tabs from "../../components/Tabs";
import {
  RiGalleryFill,
  RiHome3Fill,
  RiMessage2Fill,
  RiTeamFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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
        icon: RiHome3Fill, // Pass the component reference, not <FiHome />
        onClick: () => {
          navigate("/");
        },
      },
      {
        label: "About Us",
        icon: RiTeamFill,
      },
      {
        label: "Contact",
        icon: RiMessage2Fill,
        onClick: () => {
          navigate("/contact");
        },
      },
      {
        label: "Gallery",
        icon: RiGalleryFill,
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
      <div className="py-2 px-3 border-b border-gray-200 flex justify-between items-center gap-2">
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
            icon={RiSearchLine}
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
