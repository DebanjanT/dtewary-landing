import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { InputOTP } from "../../components/ui";

const InputOTPDoc = () => {
  const [otp, setOtp] = useState("");
  const [length, setLength] = useState(6);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    // In a real app, you would verify the OTP with a backend service
    if (otp.length === length) {
      setIsVerified(true);
      setTimeout(() => {
        setIsVerified(false);
        setOtp("");
      }, 3000);
    }
  };

  // Basic example
  const basicExample = (
    <div className="w-full max-w-sm mx-auto">
      <InputOTP 
        value={otp}
        onChange={setOtp}
        length={6}
      />
    </div>
  );

  const basicCode = `import { InputOTP } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [otp, setOtp] = useState("");
  
  return (
    <InputOTP 
      value={otp}
      onChange={setOtp}
      length={6}
    />
  );
};`;

  // Different length example
  const lengthExample = (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          className={`px-3 py-1 rounded-md os-medium ${
            length === 4
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }`}
          onClick={() => setLength(4)}
        >
          4 Digits
        </button>
        <button
          className={`px-3 py-1 rounded-md os-medium ${
            length === 6
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }`}
          onClick={() => setLength(6)}
        >
          6 Digits
        </button>
      </div>
      <div className="w-full max-w-sm mx-auto">
        <InputOTP 
          value={otp}
          onChange={setOtp}
          length={length}
        />
      </div>
    </div>
  );

  const lengthCode = `import { InputOTP } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [otp, setOtp] = useState("");
  const [length, setLength] = useState(6);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            length === 4
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setLength(4)}
        >
          4 Digits
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            length === 6
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setLength(6)}
        >
          6 Digits
        </button>
      </div>
      <div className="w-full max-w-sm mx-auto">
        <InputOTP 
          value={otp}
          onChange={setOtp}
          length={length}
        />
      </div>
    </div>
  );
};`;

  // Props documentation
  const inputOTPProps = [
    {
      name: "value",
      type: "string",
      required: true,
      description: "Current OTP value",
    },
    {
      name: "onChange",
      type: "function(string)",
      required: true,
      description: "Function to call when OTP changes",
    },
    {
      name: "length",
      type: "number",
      default: "6",
      description: "Number of OTP digits",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the input is disabled",
    },
    {
      name: "autoFocus",
      type: "boolean",
      default: "true",
      description: "Whether to focus the first input automatically",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the container",
    },
    {
      name: "inputClassName",
      type: "string",
      default: "''",
      description: "Additional classes for each input",
    },
  ];

  return (
    <DocTemplate
      title="InputOTP"
      description="InputOTP component for entering one-time passwords or verification codes."
      component={
        <div className="space-y-4">
          <div className="w-full max-w-sm mx-auto">
            <InputOTP 
              value={otp}
              onChange={setOtp}
              length={length}
              disabled={isVerified}
            />
          </div>
          <div className="flex justify-center">
            {isVerified ? (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md os-medium">
                OTP Verified Successfully!
              </div>
            ) : (
              <button
                className={`px-4 py-2 rounded-md os-medium ${
                  otp.length === length
                    ? "bg-brand-green text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleVerify}
                disabled={otp.length !== length}
              >
                Verify OTP
              </button>
            )}
          </div>
          <div className="text-center text-sm text-brand-blackLighter">
            {otp.length === length ? "Ready to verify" : `Enter ${length - otp.length} more digit${length - otp.length !== 1 ? "s" : ""}`}
          </div>
        </div>
      }
      code={`import { InputOTP } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [otp, setOtp] = useState("");
  const [length, setLength] = useState(6);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    // In a real app, you would verify the OTP with a backend service
    if (otp.length === length) {
      setIsVerified(true);
      setTimeout(() => {
        setIsVerified(false);
        setOtp("");
      }, 3000);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="w-full max-w-sm mx-auto">
        <InputOTP 
          value={otp}
          onChange={setOtp}
          length={length}
          disabled={isVerified}
        />
      </div>
      <div className="flex justify-center">
        {isVerified ? (
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md os-medium">
            OTP Verified Successfully!
          </div>
        ) : (
          <button
            className={\`px-4 py-2 rounded-md os-medium \${
              otp.length === length
                ? "bg-brand-green text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }\`}
            onClick={handleVerify}
            disabled={otp.length !== length}
          >
            Verify OTP
          </button>
        )}
      </div>
      <div className="text-center text-sm text-brand-blackLighter">
        {otp.length === length ? "Ready to verify" : \`Enter \${length - otp.length} more digit\${length - otp.length !== 1 ? "s" : ""}\`}
      </div>
    </div>
  );
}`}
      props={inputOTPProps}
      examples={[
        {
          title: "Basic InputOTP",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Different Lengths",
          component: lengthExample,
          code: lengthCode,
        },
      ]}
    />
  );
};

export default InputOTPDoc;
