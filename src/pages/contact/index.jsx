import Layout from "../../components/shared/Layout";
import Input from "../../components/Input";
import phoneIcon from "../../assets/phone.png";
import emailIcon from "../../assets/email.png";
import googleMapsIcon from "../../assets/google-maps.png";
import sendIcon from "../../assets/send.png";

const Contact = () => {
  return (
    <Layout page="Contact" headerGradient={true}>
      <div className="px-3">
        <div className="relative isolate bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
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
                <h2 className=" text-pretty text-5xl font-bold tracking-tight text-transparent text-gradient bg-clip-text sm:text-5xl drop-shadow">
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
                        name="first-name"
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
                        name="last-name"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <Input
                        prefix="@"
                        variant="outline"
                        id="email"
                        name="email"
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
                        name="phone-number"
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
                        isTextarea={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="btn-brand-yellow px-3 py-2 shadow-sm w-full md:w-auto"
                  >
                    <img src={sendIcon} alt="Send" /> Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
