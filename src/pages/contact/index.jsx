import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout";
import Input from "../../components/Input";
import phoneIcon from "../../assets/phone.png";
import emailIcon from "../../assets/email.png";
import googleMapsIcon from "../../assets/google-maps.png";
import sendIcon from "../../assets/send.png";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase/config";
import { ref, set, get } from "firebase/database";

const Contact = () => {
  const { currentUser } = useAuth();
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
  const [debugInfo, setDebugInfo] = useState("");

  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // // Test database connection when component mounts
  // useEffect(() => {
  //   const testDatabaseConnection = async () => {
  //     if (currentUser) {
  //       try {
  //         // Try to write a test value
  //         const testRef = ref(database, `test/${currentUser.uid}`);
  //         await set(testRef, {
  //           timestamp: Date.now(),
  //           test: "Database connection test",
  //         });
  //         setDebugInfo("Database connection successful");
  //         console.log("Database connection test successful");

  //         // Clean up test data
  //         await set(testRef, null);
  //       } catch (error) {
  //         console.error("Database connection test failed:", error);
  //         setDebugInfo(`Database connection error: ${error.message}`);
  //       }
  //     }
  //   };

  //   testDatabaseConnection();
  // }, [currentUser]);

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
      // Get all submissions for the current user without using orderByChild
      const userSubmissionsRef = ref(
        database,
        `submissions/${currentUser.uid}`
      );

      const snapshot = await get(userSubmissionsRef);

      if (snapshot.exists()) {
        const submissions = Object.values(snapshot.val());

        // Find the most recent submission manually
        let lastSubmission = null;
        let lastSubmissionTime = 0;

        // Use for...of instead of forEach
        for (const submission of submissions) {
          if (
            submission.timestamp &&
            submission.timestamp > lastSubmissionTime
          ) {
            lastSubmission = submission;
            lastSubmissionTime = submission.timestamp;
          }
        }

        if (lastSubmission) {
          const currentTime = Date.now();
          const timeDiff = currentTime - lastSubmissionTime;

          // Check if last submission was within 3 minutes (180000 ms)
          if (timeDiff < 180000) {
            const remainingTime = Math.ceil((180000 - timeDiff) / 1000);
            setTimeRemaining(remainingTime);
          }
        }
      }
    } catch (error) {
      console.error("Error checking last submission:", error);
      setDebugInfo(`Error checking last submission: ${error.message}`);
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
    // Prevent default form submission
    if (event) event.preventDefault();

    console.log("Submit button clicked");
    setDebugInfo("Submit button clicked");

    if (!currentUser) {
      setDebugInfo("User not authenticated");
      return;
    }

    if (timeRemaining > 0) {
      setFormError(
        `Please wait ${timeRemaining} seconds before submitting again.`
      );
      setDebugInfo(`Cooldown active: ${timeRemaining} seconds remaining`);
      return;
    }

    const error = validateForm();
    if (error) {
      setFormError(error);
      setDebugInfo(`Validation error: ${error}`);
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setDebugInfo("Submitting form...");

    try {
      console.log("Preparing submission data");
      setDebugInfo("Preparing submission data");

      const submissionId = Date.now().toString();
      const submissionData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        timestamp: Date.now(),
      };

      console.log("Submission data:", submissionData);
      setDebugInfo(
        `Submission data prepared: ${JSON.stringify(submissionData)}`
      );

      // Create the database reference
      const dbRef = ref(
        database,
        `submissions/${currentUser.uid}/${submissionId}`
      );
      console.log("Database reference created:", dbRef);
      setDebugInfo(
        `Database reference: submissions/${currentUser.uid}/${submissionId}`
      );

      // Set the data
      await set(dbRef, submissionData);
      console.log("Data saved successfully");
      setDebugInfo("Form submitted successfully");

      setFormSuccess("Your message has been sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });

      // Set the cooldown timer
      setTimeRemaining(180);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError(`Failed to send message: ${error.message}`);
      setDebugInfo(`Error submitting form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout page="Contact" headerGradient={true}>
      <div className="px-3">
        <div className="relative isolate bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:pb-48">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 size-full stroke-brand-yellow [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  >
                    <defs>
                      <pattern
                        x="100%"
                        y={-1}
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                      </pattern>
                    </defs>
                    <rect
                      fill="white"
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                    />
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                      x="100%"
                      y={-1}
                      className="overflow-visible fill-gray-50"
                    >
                      <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                    </svg>
                    <rect
                      fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                    />
                  </svg>
                </div>
                <h2 className=" text-pretty text-5xl font-bold tracking-tight text-brand-green drop-shadow">
                  Get in touch
                </h2>
                <p className="mt-6 text-lg/8 text-gray-600 os-light">
                  Church Rd, Chandrakona Road, Sarbera
                </p>
                <p className="text-lg/8 text-gray-600 os-light">
                  West Midnapore, West Bengal
                </p>
                <p className="text-lg/8 text-gray-600 os-light">PIN: 721253</p>
                <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <img src={phoneIcon} alt="Telephone" />
                    </dt>
                    <dd>
                      <a
                        href="tel:+91-7001026851"
                        className="hover:text-gray-900"
                      >
                        +91-7001026851
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <img src={emailIcon} alt="Email" />
                    </dt>
                    <dd>
                      <a
                        href="mailto:admin@dtewary.com"
                        className="hover:text-gray-900"
                      >
                        admin@dtewary.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Location</span>
                      <img src={googleMapsIcon} alt="Location" />
                    </dt>
                    <dd>
                      <a
                        href="https://maps.app.goo.gl/S8gSwVYuLqbwtotd6"
                        className="hover:text-gray-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Maps Location
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                {currentUser ? (
                  <>
                    {formSuccess && (
                      <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
                        {formSuccess}
                      </div>
                    )}
                    {formError && (
                      <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
                        {formError}
                      </div>
                    )}
                    {/* {debugInfo && (
                      <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded-md text-xs">
                        <strong>Debug:</strong> {debugInfo}
                      </div>
                    )} */}
                    {timeRemaining > 0 && (
                      <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-md">
                        Please wait {Math.floor(timeRemaining / 60)}:
                        {(timeRemaining % 60).toString().padStart(2, "0")}{" "}
                        before submitting again.
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="first-name"
                            className="block text-sm/6 font-semibold text-gray-900"
                          >
                            First name
                          </label>
                          <div className="mt-2.5">
                            <Input
                              variant="outline"
                              id="first-name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="last-name"
                            className="block text-sm/6 font-semibold text-gray-900"
                          >
                            Last name
                          </label>
                          <div className="mt-2.5">
                            <Input
                              variant="outline"
                              id="last-name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="email"
                            className="block text-sm/6 font-semibold text-gray-900"
                          >
                            Business Email
                          </label>
                          <div className="mt-2.5">
                            <Input
                              prefix="@"
                              variant="outline"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="phone-number"
                            className="block text-sm/6 font-semibold text-gray-900"
                          >
                            Phone number
                          </label>
                          <div className="mt-2.5">
                            <Input
                              variant="outline"
                              id="phone-number"
                              prefix="+91"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="message"
                            className="block text-sm/6 font-semibold text-gray-900"
                          >
                            Message
                          </label>
                          <div className="mt-2.5">
                            <Input
                              variant="outline"
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              isTextarea={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-end">
                        <button
                          type="submit"
                          className={`btn-brand-yellow px-3 py-2 shadow-sm w-full md:w-auto flex items-center justify-center gap-2 ${
                            isSubmitting || timeRemaining > 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={isSubmitting || timeRemaining > 0}
                        >
                          {isSubmitting ? (
                            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full" />
                          ) : (
                            <img src={sendIcon} alt="Send" />
                          )}
                          {isSubmitting ? "Sending..." : "Send message"}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Sign in to Contact Us
                      </h3>
                      <p className="text-gray-600">
                        You need to be signed in to submit the contact form.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="border px-4 py-2 os-regular shadow-inner flex justify-center items-center gap-1 hover:shadow-brand-green active:translate-y-[3px]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        aria-labelledby="googleIconTitle"
                      >
                        <title id="googleIconTitle">Google Icon</title>
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>{" "}
                      Login With Google
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
