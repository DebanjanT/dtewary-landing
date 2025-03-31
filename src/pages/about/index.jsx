import React from "react";
import Layout from "../../components/shared/Layout";
import shining32Icon from "../../assets/shining_32.png";
import logs32Icon from "../../assets/logs_32.png";
import loudspeaker32Icon from "../../assets/loudspeaker_32.png";
const About = () => {
  return (
    <Layout page="About Us" headerGradient={true}>
      <div className="px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:pb-48 mx-auto aboutus-gradient">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Minimal */}
          <div className="mb-10">
            <img src={shining32Icon} alt="Shining" />
            <h1 className="text-pretty text-5xl font-bold tracking-tight text-transparent text-gradient bg-clip-text drop-shadow mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl os-regular">
              We specialize in providing high-quality timber products to meet
              your diverse needs.
            </p>
          </div>

          {/* Company Overview - Minimal */}
          <div className="mb-20">
            <p className="text-gray-700 leading-relaxed max-w-3xl os-light">
              With decades of experience in the industry, we are proud to offer
              a wide selection of wood poles, including Akashmoni, Eucalyptus,
              and Sal, as well as expertly crafted swan-sized woods. Our
              commitment to sustainability and excellence ensures that you
              receive the finest timber, whether for construction, furniture
              making, or other applications.
            </p>
          </div>

          {/* Products - Minimal Grid */}
          <div className="mb-20">
            <img src={logs32Icon} alt="Logs" />
            <h2 className="text-4xl font-bold text-panel-sand-dark mb-8">
              Our Primary Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-sm shadow-brand-green border border-gray-100 rounded-lg ">
                <h3 className="text-xl os-semibold text-brand-green mb-3">
                  Eucalyptus
                </h3>
                <p className="text-gray-600">
                  Fast-growing and versatile, ideal for poles and structural
                  supports.
                </p>
              </div>
              <div className="bg-white p-6 shadow-sm shadow-brand-green border border-gray-100 rounded-lg">
                <h3 className="text-xl os-semibold text-brand-green mb-3">
                  Sal
                </h3>
                <p className="text-gray-600">
                  Premium hardwood known for its strength and natural beauty.
                </p>
              </div>
              <div className="bg-white p-6 shadow-sm shadow-brand-green border border-gray-100 rounded-lg">
                <h3 className="text-xl os-semibold text-brand-green mb-3">
                  Akashmoni
                </h3>
                <p className="text-gray-600 os-light">
                  Known for its durability and resistance to pests, perfect for
                  construction projects.
                </p>
              </div>
            </div>
          </div>

          {/* Team - Minimal */}
          <div className="mb-20">
            <img src={shining32Icon} alt="Shining" />

            <h2 className="text-4xl font-bold text-panel-sand-dark mb-8">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CEO */}
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://placehold.co/400x400/f5f5f5/367C2B?text=DT&font=opensans"
                    alt="Dibyendu Tewary"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-brand-green">
                  Dibyendu Tewary
                </h3>
                <p className="text-gray-600 mb-2">Proprietor</p>
                <p className="text-gray-500 text-sm">
                  50+ years of experience in the timber industry
                </p>
              </div>

              {/* Manager */}
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://placehold.co/400x400/f5f5f5/367C2B?text=AM&font=opensans"
                    alt="Rajesh Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-brand-green">
                  Ananda Majhi
                </h3>
                <p className="text-gray-600 mb-2">General Manager</p>
                <p className="text-gray-500 text-sm">
                  40+ years of experience in timber management
                </p>
              </div>

              {/* Son of CEO */}
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://placehold.co/400x400/f5f5f5/367C2B?text=DT&font=opensans"
                    alt="Arjun Tewary"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-brand-green">
                  Debanjan Tewary
                </h3>
                <p className="text-gray-600 mb-2">Techinal Operator</p>
                <p className="text-gray-500 text-sm">
                  Bringing innovation to our traditional timber business
                </p>
              </div>
            </div>
          </div>

          {/* Sustainability - Minimal */}
          <div className="mb-20 border-2 border-panel-sand-light p-4 bg-panel-green-light/10">
            <div className="flex justify-start items-center mb-8 gap-2">
              <img src={loudspeaker32Icon} alt="Loudspeaker" />
              <h2 className="text-3xl font-bold text-brand-green ">
                Our Commitment
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <p className="text-gray-700 leading-relaxed mb-6">
                  At our company, we believe in responsible forestry practices
                  that preserve our natural resources for future generations.
                  Our commitment to sustainability guides every aspect of our
                  business.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span>Sustainable harvesting techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span>Reforestation initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span>Efficient processing methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span>Community partnerships</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="header-gradient  p-6 border border-gray-100 h-full">
                  <h3 className="text-xl font-bold text-brand-green mb-3">
                    Our Green Promise
                  </h3>
                  <p className="text-gray-600 font-semibold">
                    For every tree harvested, we plant two new ones, ensuring
                    the sustainability of our forests and contributing to a
                    greener planet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA - Minimal */}
          <div className="flex flex-col justify-center items-center">
            <button type="button" className="btn-brand-yellow w-fit px-4 py-2">
              Contact Us
            </button>
            <p className="mt-4 text-gray-500">
              Let's work together to bring sustainable timber solutions to your
              projects.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
