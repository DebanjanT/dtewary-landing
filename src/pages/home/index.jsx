import HeroSection from "./Hero";
import Layout from "../../components/shared/Layout";
// import informationIcon from "../../assets/information.png";
import ProficiencyCard from "./ProficiencyCard";
import RashmiCementLogo from "../../assets/rcem.png";
import RashmiGroupLogo from "../../assets/rgorup.png";
const Home = () => {
  return (
    <Layout page="Home" headerGradient={true}>
      {/* Hero Section */}
      <HeroSection />
      {/* <div className="px-3 mb-10">
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
      </div> */}

      <div className=" space-y-10 py-20 px-6 lg:px-8 mx-auto lg:max-w-7xl">
        <h1 className="font-bold text-4xl md:text-5xl text-brand-black w-fit">
          Our Proficiency
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
          <ProficiencyCard
            image="https://dtd-stylex.vercel.app/assets/premium-quality-lq-dSEIMso4.jpg"
            description="We guarantee the highest quality of the products comapred to market."
          />
          <ProficiencyCard
            image="https://dtd-stylex.vercel.app/assets/best-market-price-lq-o-3DZDTp.jpg"
            description="We provide premium-quality wood at the most competitive prices."
          />
          <ProficiencyCard
            image="https://dtd-stylex.vercel.app/assets/oversized-lots-lq-BxigSa-t.jpg"
            description="Between any range we offer oversized lots with a higher proportion than any competitor in Bengal"
          />
        </div>
      </div>
      <div className="bg-gray-100 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900">
              Trusted by Renowned
            </h2>
            <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
              <img
                alt="Transistor"
                src={RashmiGroupLogo}
                className="col-span-2 max-h-32 w-full object-left lg:col-span-1 drop-shadow"
              />
              <img
                alt="Reform"
                src={RashmiCementLogo}
                width={158}
                height={48}
                className="col-span-2 max-h-32 w-full object-left lg:col-span-1 drop-shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
