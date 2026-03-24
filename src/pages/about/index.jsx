import React from "react";
import Layout from "../../components/shared/Layout";
import { Link } from "react-router-dom";

const About = () => {
  const products = [
    {
      name: "Eucalyptus",
      description: "Fast-growing and highly versatile timber, Eucalyptus is the preferred choice for poles, scaffolding, and structural supports. Its natural oils provide resistance to decay and termites, making it ideal for outdoor applications and construction projects requiring durability at competitive prices.",
      bestFor: ["Poles & Scaffolding", "Construction Supports", "Fencing & Posts", "Paper & Pulp Industry"],
    },
    {
      name: "Sal",
      description: "One of India's most valued hardwoods, Sal timber is renowned for its exceptional strength, density, and natural beauty. Its tight grain pattern and resistance to moisture make it the premium choice for heavy-duty construction, railway sleepers, and high-end furniture that demands longevity.",
      bestFor: ["Railway Sleepers", "Heavy Construction", "Premium Furniture", "Door & Window Frames"],
    },
    {
      name: "Akashmoni",
      description: "Also known as Acacia Auriculiformis, Akashmoni is prized for its remarkable durability and natural pest resistance. This fast-growing hardwood offers excellent strength-to-weight ratio, making it perfect for construction projects, rural housing, and applications where both economy and performance matter.",
      bestFor: ["Rural Construction", "Fuel Wood", "Plywood Industry", "Affordable Housing"],
    },
  ];

  const team = [
    {
      name: "Dibyendu Tewary",
      role: "Proprietor",
      experience: "50+ years of experience",
      image: "https://dtewary-dev-storage.innoida.utho.io/our_team_image/team_dibyendu_tewary.jpg",
      quote: "Quality timber, trusted generations",
    },
    {
      name: "Ananda Majhi",
      role: "General Manager",
      experience: "40+ years of experience",
      image: "https://dtewary-dev-storage.innoida.utho.io/our_team_image/team_amajhi.jpg",
      quote: "Excellence in every log",
    },
    {
      name: "Debanjan Tewary",
      role: "Technical Head",
      experience: "Innovation & Technology",
      image: "https://dtewary-dev-storage.innoida.utho.io/our_team_image/team_debanjan_tewary.jpg",
      quote: "Bridging tradition with technology",
    },
  ];

  return (
    <Layout page="About Us">
      {/* Hero Section - Vintage Newspaper Style */}
      <section className="relative overflow-hidden">
        {/* Vintage paper texture background */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-amber-50/30 to-white" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Vintage header ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-400" />
            <span className="text-xs tracking-[0.4em] text-stone-500 uppercase">Built From Scratch</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-400" />
          </div>

          <h1 className="text-center text-5xl md:text-7xl font-bold text-stone-800 mb-6 tracking-tight">
            Our <span className="text-brand-green">Story</span>
          </h1>

          <p className="text-center text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            What started as a humble beginning in West Bengal has grown into a trusted timber enterprise
            spanning multiple states across Eastern India.
          </p>

          {/* Decorative scroll indicator */}
          <div className="flex justify-center mt-12">
            <div className="w-6 h-10 rounded-full border-2 border-stone-400 flex justify-center pt-2">
              <div className="w-1 h-2 bg-stone-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Journey Section */}
      <section className="relative py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left - Story Content */}
            <div className="flex-1">
              <span className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full mb-4">
                The Founder's Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
                Built by One Man's Determination
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  <strong className="text-stone-800">Dibyendu Tewary</strong> built this company from the ground up
                  with nothing but hard work, integrity, and an unwavering commitment to quality. Starting in
                  West Bengal with limited resources, he established relationships based on trust and delivered
                  timber that exceeded expectations.
                </p>
                <p>
                  Through decades of dedication, the business expanded beyond West Bengal's borders into
                  <strong className="text-brand-green"> Odisha, Bihar, Jharkhand</strong>, and other neighboring states.
                  Today, we are proud to serve renowned industries and construction projects across Eastern India.
                </p>
                <p>
                  Our growth is a testament to the simple principle that guided us from day one:
                  <em className="text-brand-green"> deliver quality timber at fair prices, and customers will return.</em>
                </p>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-8 border border-stone-200">
                <h3 className="text-xl font-bold text-stone-800 mb-6">Our Reach Today</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center">
                      <span className="text-2xl">🗺️</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-green">5+ States</div>
                      <div className="text-sm text-stone-500">Across Eastern India</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 flex items-center justify-center">
                      <span className="text-2xl">🏭</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-stone-800">50+ Years</div>
                      <div className="text-sm text-stone-500">Of Industry Experience</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-stone-800">Trusted Partner</div>
                      <div className="text-sm text-stone-500">To Renowned Industries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Clean Theory Based */}
      <section className="relative py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Our Primary Products
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              We specialize in high-quality timber poles and wood products, carefully sourced and
              processed to meet diverse industrial and construction needs.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-brand-green/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-stone-200">0{index + 1}</span>
                  <h3 className="text-xl font-bold text-stone-800 group-hover:text-brand-green transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Best For */}
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Best For:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.bestFor.map((use) => (
                      <span
                        key={use}
                        className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sawn Sized Wood Section */}
          <div className="bg-gradient-to-r from-brand-green to-emerald-700 rounded-3xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Eucalyptus Sawn Sized Wood
                </h3>
                <p className="text-white/80">
                  We also deal in <strong>Eucalyptus Sawn Sized Wood</strong> cutting in saw mills.
                  Our precision-cut timber is processed to exact specifications, ready for immediate use
                  in construction, furniture making, and industrial applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Magazine Style */}
      <section className="relative py-20 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full mb-4">
              The People Behind
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
              Meet Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />

                    {/* Quote overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white/90 text-sm italic">"{member.quote}"</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-stone-800">{member.name}</h3>
                        <p className="text-brand-green font-medium">{member.role}</p>
                      </div>
                      <span className="text-3xl font-bold text-stone-200">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-stone-500 text-sm mt-3">{member.experience}</p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 rotate-45 transform translate-x-12 -translate-y-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section - Split Design */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green to-emerald-700" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left - Content */}
            <div className="flex-1 text-white">
              <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-6">
                Our Promise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Commitment to Sustainability
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                At our company, we believe in responsible forestry practices that preserve
                our natural resources for future generations. Our commitment to sustainability
                guides every aspect of our business.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🌱", text: "Sustainable Harvesting" },
                  { icon: "🌳", text: "Reforestation Initiatives" },
                  { icon: "♻️", text: "Efficient Processing" },
                  { icon: "🤝", text: "Community Partnerships" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Green Promise Card */}
            <div className="flex-1 w-full max-w-md">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                {/* Decorative leaf */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🌿</span>
                </div>

                <h3 className="text-2xl font-bold text-stone-800 mb-4 pr-16">
                  Our Green Promise
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-brand-green">2:1</div>
                  <div className="text-stone-600">
                    Trees planted for<br />every tree harvested
                  </div>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Ensuring the sustainability of our forests and contributing to a greener planet
                  for future generations.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-200">
                  <div>
                    <div className="text-2xl font-bold text-brand-green">50+</div>
                    <div className="text-sm text-stone-500">Years of Legacy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-green">1000+</div>
                    <div className="text-sm text-stone-500">Trees Planted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
            Let's bring sustainable timber solutions to your projects.
            Contact us today to discuss your requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-brand-green/90 transition-all duration-300 group"
          >
            <span>Get in Touch</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
