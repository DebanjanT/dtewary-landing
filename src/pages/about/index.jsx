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
      <section className="relative py-16 dotted-grad">
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

          {/* Featured Product - Eucalyptus Sawn Sized Wood */}
          <div className="reapeating-strips rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>

            {/* Featured Badge */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                ⭐ Featured Product
              </span>
            </div>

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Eucalyptus Sawn Sized Wood
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
                  Our <strong>flagship product</strong> - precision-cut Eucalyptus timber processed in our saw mills
                  to exact specifications. Ready for immediate use in construction, furniture making,
                  and industrial applications.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">Construction Grade</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">Furniture Quality</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">Industrial Use</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">Custom Sizes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Other Products Grid */}
          <h3 className="text-xl font-bold text-stone-700 mb-6 text-center">Other Wood Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Plantation & Green Initiative Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-brand-green to-emerald-700" />

        {/* Decorative leaves pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="leaves" patternUnits="userSpaceOnUse" width="50" height="50">
              <text x="10" y="30" fontSize="20">🌿</text>
              <text x="35" y="15" fontSize="15">🌱</text>
            </pattern>
            <rect width="100%" height="100%" fill="url(#leaves)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Growing Green Together
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Plantation Initiatives
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              We believe in giving back to nature. Every tree we use, we strive to plant many more.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Our Efforts */}
            <div className="space-y-6">
              {/* Government Events */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Government Plantation Drives
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      We actively participate in all government-organized plantation events and drives.
                      From Van Mahotsav to local forest department initiatives, our team is always
                      present to contribute to the green movement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timber Depo Plantation */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌳</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Our Timber Depo Garden
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      Within our own timber depot premises, we have planted and nurture various types
                      of trees. From fruit-bearing trees to native species, our depot is not just a
                      workplace but a small forest in itself.
                    </p>
                  </div>
                </div>
              </div>

              {/* Community Efforts */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Community Partnerships
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      We work with local communities and schools to spread awareness about the
                      importance of trees. We donate saplings and guide people on how to care
                      for young plants.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Promise Card */}
            <div className="flex items-center">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full">
                {/* Decorative leaf */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🌿</span>
                </div>

                <h3 className="text-2xl font-bold text-stone-800 mb-4 pr-16">
                  Our Green Philosophy
                </h3>

                <blockquote className="text-lg text-stone-600 italic border-l-4 border-brand-green pl-4 mb-6">
                  "We take from nature, so we must give back. Every sapling we plant is our way of
                  saying thank you to the forests that sustain our livelihood."
                </blockquote>

                <p className="text-stone-600 leading-relaxed mb-6">
                  We try our best to plant and grow as many trees as possible. It's not just business
                  for us — it's our responsibility to ensure that future generations inherit greener forests.
                </p>

                {/* What We Plant */}
                <div className="bg-stone-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                    Trees We Plant & Nurture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Mango", "Neem", "Banyan", "Eucalyptus", "Bamboo", "Jackfruit", "Teak"].map((tree) => (
                      <span
                        key={tree}
                        className="px-3 py-1 bg-brand-green/10 text-brand-green text-sm rounded-full"
                      >
                        {tree}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-200">
                  <div>
                    <div className="text-2xl font-bold text-brand-green">Every Year</div>
                    <div className="text-sm text-stone-500">Active Participation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-green">100+</div>
                    <div className="text-sm text-stone-500">Trees in Our Depo</div>
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
