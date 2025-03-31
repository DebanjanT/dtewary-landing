import { useEffect, useMemo, useState } from "react";
import HeroSection from "./Hero";
import { RiInformation2Fill } from "react-icons/ri";
import Navigation from "../../components/shared/Navigation";
import Layout from "../../components/shared/Layout";

const Home = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
