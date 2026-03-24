import HeroSection from "./Hero";
import Layout from "../../components/shared/Layout";
// import informationIcon from "../../assets/information.png";
import ProficiencyAccordion from "./ProficiencyAccordion";
import TrustedBySection from "./TrustedBySection";
import SectionDivider from "../../components/shared/SectionDivider";
import RashmiCementLogo from "../../assets/rcem.png";
import RashmiGroupLogo from "../../assets/rgorup.png";
import RungtaLogo from "../../assets/rungta.jpeg";
import Shakambari from "../../assets/Shakambhari-Group.png";

const partners = [
  { name: "Rashmi Group", logo: RashmiGroupLogo },
  { name: "Rashmi Cement", logo: RashmiCementLogo },
  { name: "Rungta", logo: RungtaLogo },
  { name: "Shakambhari Group", logo: Shakambari },
];

const Home = () => {
  return (
    <Layout page="Home" headerGradient={true}>
      {/* Hero Section */}
      <HeroSection />

      {/* Divider: Hero to Proficiency
      <div className="relative">
        <SectionDivider variant="wave" className="text-white -mb-1" />
      </div> */}

      {/* Our Proficiency Section */}
      <div className="relative bg-white">
        <div className="space-y-10 py-20 px-6 lg:px-8 mx-auto lg:max-w-7xl">
          <h1 className="font-bold text-4xl md:text-5xl text-brand-black w-fit">
            Our Proficiency
          </h1>
          <ProficiencyAccordion />
        </div>

        {/* Divider: Proficiency to Trusted By */}
        {/* <SectionDivider variant="flow" className="text-green-50 -mb-1" /> */}
      </div>

      {/* Trusted By Section */}
      <TrustedBySection partners={partners} />

      {/* Divider: Trusted By to Footer */}
      {/* <SectionDivider variant="connector" className="text-gray-900 -mb-1" /> */}
    </Layout>
  );
};

export default Home;
