import { useState } from "react";
import HeroSection from "./Hero";
import Tabs from "./components/Tabs";
import { BsChatFill, BsFillCloudFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { MdHomeFilled } from "react-icons/md";

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsData = [
    {
      label: "Home",
      icon: MdHomeFilled, // Pass the component reference, not <FiHome />
    },
    {
      label: "About Us",
      icon: RiTeamFill,
    },
    {
      label: "Contact",
      icon: BsChatFill,
    },
    {
      label: "Open Source",
      icon: BsFillCloudFill,
      dropdownItems: [
        {
          label: (
            <p className="w-full">
              Transit Pass Manager
              <span className="text-[12px] bg-brand-yellow px-1 rounded-full ml-1">
                Upcoming
              </span>
            </p>
          ),
          onClick: () => console.log("Maintenance clicked"),
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-[1366px] mx-auto bg-white">
      <div className="py-2 px-3 border-b border-gray-200">
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
      </div>
      <div className="hidden sm:block">
        {/* Menu */}
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onChange={(index) => setActiveTab(index)}
        />
      </div>
      {/* Hero Section */}
      <HeroSection />
      <main className="px-3">
        <p>Hi</p>
      </main>
    </div>
  );
};

export default App;
