import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase/config";
import { ref, set, get } from "firebase/database";

const Contact = () => {
  const { currentUser, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  useEffect(() => {
    if (currentUser) {
      checkLastSubmission();
    }
  }, [currentUser]);

  const checkLastSubmission = async () => {
    try {
      const userSubmissionsRef = ref(
        database,
        `submissions/${currentUser.uid}`
      );

      const snapshot = await get(userSubmissionsRef);

      if (snapshot.exists()) {
        const submissions = Object.values(snapshot.val());
        let lastSubmissionTime = 0;

        for (const submission of submissions) {
          if (
            submission.timestamp &&
            submission.timestamp > lastSubmissionTime
          ) {
            lastSubmissionTime = submission.timestamp;
          }
        }

        if (lastSubmissionTime) {
          const currentTime = Date.now();
          const timeDiff = currentTime - lastSubmissionTime;

          if (timeDiff < 180000) {
            const remainingTime = Math.ceil((180000 - timeDiff) / 1000);
            setTimeRemaining(remainingTime);
          }
        }
      }
    } catch (error) {
      console.error("Error checking last submission:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return "Please enter a valid email";
    if (!formData.phoneNumber.trim()) return "Phone number is required";
    if (!formData.message.trim()) return "Message is required";
    return "";
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    if (!currentUser) return;

    if (timeRemaining > 0) {
      setFormError(
        `Please wait ${timeRemaining} seconds before submitting again.`
      );
      return;
    }

    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const submissionId = Date.now().toString();
      const submissionData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        timestamp: Date.now(),
      };

      const dbRef = ref(
        database,
        `submissions/${currentUser.uid}/${submissionId}`
      );

      await set(dbRef, submissionData);

      setFormSuccess("Your message has been sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });

      setTimeRemaining(180);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+91-7001026851",
      href: "tel:+91-7001026851",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "admin@dtewary.com",
      href: "mailto:admin@dtewary.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Church Rd, Chandrakona Road, Sarbera",
      href: "https://maps.app.goo.gl/hrNbaybbyfX1pt7d9",
    },
  ];

  return (
    <Layout page="Contact">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-amber-50/30 to-white" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-400" />
            <span className="text-xs tracking-[0.4em] text-stone-500 uppercase">We'd Love to Hear From You</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-400" />
          </div>

          <h1 className="text-center text-5xl md:text-6xl font-bold text-stone-800 mb-4 tracking-tight">
            Get in <span className="text-brand-green">Touch</span>
          </h1>

          <p className="text-center text-lg text-stone-600 max-w-2xl mx-auto">
            Whether you need timber for construction, furniture, or any other purpose,
            we're here to help. Reach out to us today.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.label === "Location" ? "_blank" : undefined}
                    rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">{info.label}</p>
                      <p className="text-stone-800 font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Address Card */}
              <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Visit Our Timber Depot
                </h3>
                <div className="space-y-1 text-stone-300">
                  <p>Church Rd, Chandrakona Road, Sarbera</p>
                  <p>West Midnapore, West Bengal</p>
                  <p className="font-semibold text-white">PIN: 721253</p>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-700">
                  <p className="text-sm text-stone-400">
                    <span className="text-brand-yellow">Open:</span> Monday - Saturday, 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-stone-200 shadow-lg w-full">
                {/* <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                  <span className="text-xs font-semibold text-stone-700">📍 Dibyendu Tewari Timber Dipot</span>
                </div> */}
                <iframe
                  src="https://maps.google.com/maps?q=Dibyendu+Tewari+Timber+Dipot,+Chandrakona+Road,+Sarbera,+West+Bengal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dibyendu Tewari Timber Dipot Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              {/* Vintage Form Card */}
              <div className="relative bg-gradient-to-b from-amber-50/50 to-stone-50 rounded-3xl border-2 border-stone-200 shadow-xl overflow-hidden">
                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
                    <h2 className="text-white font-bold text-lg tracking-wide">ENQUIRY FORM</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {currentUser ? (
                    <>
                      {formSuccess && (
                        <div className="mb-6 p-4 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-xl flex items-center gap-3">
                          <span className="text-2xl">✓</span>
                          <span>{formSuccess}</span>
                        </div>
                      )}
                      {formError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                          {formError}
                        </div>
                      )}
                      {timeRemaining > 0 && (
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
                          Please wait {Math.floor(timeRemaining / 60)}:
                          {(timeRemaining % 60).toString().padStart(2, "0")} before submitting again.
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-stone-700 mb-2">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-white border-2 border-stone-200 rounded-xl focus:border-brand-green focus:ring-0 outline-none transition-colors text-stone-800 placeholder-stone-400"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-stone-700 mb-2">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-white border-2 border-stone-200 rounded-xl focus:border-brand-green focus:ring-0 outline-none transition-colors text-stone-800 placeholder-stone-400"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">@</span>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-stone-200 rounded-xl focus:border-brand-green focus:ring-0 outline-none transition-colors text-stone-800 placeholder-stone-400"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-stone-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-medium">+91</span>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className="w-full pl-14 pr-4 py-3 bg-white border-2 border-stone-200 rounded-xl focus:border-brand-green focus:ring-0 outline-none transition-colors text-stone-800 placeholder-stone-400"
                              placeholder="9876543210"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">
                            Your Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-white border-2 border-stone-200 rounded-xl focus:border-brand-green focus:ring-0 outline-none transition-colors text-stone-800 placeholder-stone-400 resize-none"
                            placeholder="Tell us about your timber requirements..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting || timeRemaining > 0}
                          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting || timeRemaining > 0
                            ? "bg-stone-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-brand-green to-emerald-600 hover:from-emerald-600 hover:to-brand-green shadow-lg hover:shadow-xl"
                            }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-stone-800 mb-2">
                        Sign in to Contact Us
                      </h3>
                      <p className="text-stone-600 mb-6">
                        Please sign in with your Google account to submit the enquiry form.
                      </p>
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-stone-200 rounded-xl font-medium text-stone-700 hover:border-stone-300 hover:shadow-lg transition-all duration-300"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                          <title>Google</title>
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                      </button>
                    </div>
                  )}
                </div>

                {/* Decorative Footer */}
                <div className="bg-stone-100 px-6 py-3 border-t border-stone-200">
                  <p className="text-center text-xs text-stone-500">
                    Your information is secure and will never be shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
