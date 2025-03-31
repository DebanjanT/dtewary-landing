import { useEffect, useMemo, useState } from "react";
import HeroSection from "./Hero";
import Tabs from "../../components/Tabs";
import {
  RiGalleryFill,
  RiHome3Fill,
  RiInformation2Fill,
  RiMessage2Fill,
  RiSearchLine,
  RiTeamFill,
} from "react-icons/ri";
import Input from "../../components/Input";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsData = useMemo(
    () => [
      {
        label: "Home",
        icon: RiHome3Fill, // Pass the component reference, not <FiHome />
      },
      {
        label: "About Us",
        icon: RiTeamFill,
      },
      {
        label: "Contact",
        icon: RiMessage2Fill,
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

  useEffect(() => {
    console.log("Re-rendered");
  }, []);

  return (
    <div id="home" className="w-full max-w-[1366px] mx-auto bg-white pb-6">
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
      {/* Hero Section */}
      <HeroSection />
      <div className="px-3">
        <div className="border border-brand-blue bg-brand-blueLight p-4 mt-6 shadow-mild">
          <div className="flex">
            <div className="shrink-0">
              <RiInformation2Fill
                aria-hidden="true"
                className="size-5 text-brand-blue"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-brand-blueDark os-regular">
                This website is currently under construction. Please visit again
                soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
