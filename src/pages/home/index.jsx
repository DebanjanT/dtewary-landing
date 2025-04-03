import HeroSection from "./Hero";
import Layout from "../../components/shared/Layout";
import informationIcon from "../../assets/information.png";
import Footer from "../../components/shared/Footer";
const Home = () => {
  return (
    <Layout page="Home" headerGradient={true}>
      {/* Hero Section */}
      <HeroSection />
      <div className="px-3 mb-10">
        <div className="border border-brand-blue bg-brand-blueLight p-4 mt-6 shadow-mild">
          <div className="flex">
            <div className="shrink-0">
              <img src={informationIcon} alt="Information" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className=" text-brand-blueDark os-regular">
                This website is currently under construction. Please visit again
                soon.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
