import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Switch } from "../../components/ui";

const SwitchDoc = () => {
  const [checked, setChecked] = useState(false);
  const [size, setSize] = useState("md");

  // Basic example
  const basicExample = (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={checked}
        onChange={setChecked}
      />
      <span className="os-medium text-brand-blackLight">
        {checked ? "On" : "Off"}
      </span>
    </div>
  );

  const basicCode = `import { Switch } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={checked}
        onChange={setChecked}
      />
      <span className="os-medium text-brand-blackLight">
        {checked ? "On" : "Off"}
      </span>
    </div>
  );
};`;

  // Size variants example
  const sizeExample = (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size="sm"
        />
        <span className="os-medium text-brand-blackLight">Small</span>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size="md"
        />
        <span className="os-medium text-brand-blackLight">Medium</span>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size="lg"
        />
        <span className="os-medium text-brand-blackLight">Large</span>
      </div>
    </div>
  );

  const sizeCode = `import { Switch } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size="sm"
        />
        <span className="os-medium text-brand-blackLight">Small</span>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size="md"
        />
        <span className="os-medium text-brand-blackLight">Medium</span>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size="lg"
        />
        <span className="os-medium text-brand-blackLight">Large</span>
      </div>
    </div>
  );
};`;

  // With label example
  const labelExample = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="os-medium text-brand-blackLight">Notifications</span>
        <Switch 
          checked={checked}
          onChange={setChecked}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="os-medium text-brand-blackLight">Dark Mode</span>
        <Switch 
          checked={!checked}
          onChange={(value) => setChecked(!value)}
        />
      </div>
    </div>
  );

  const labelCode = `import { Switch } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="os-medium text-brand-blackLight">Notifications</span>
        <Switch 
          checked={checked}
          onChange={setChecked}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="os-medium text-brand-blackLight">Dark Mode</span>
        <Switch 
          checked={!checked}
          onChange={(value) => setChecked(!value)}
        />
      </div>
    </div>
  );
};`;

  // Props documentation
  const switchProps = [
    {
      name: "checked",
      type: "boolean",
      required: true,
      description: "Whether the switch is checked",
    },
    {
      name: "onChange",
      type: "function(boolean)",
      required: true,
      description: "Function to call when switch state changes",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the switch is disabled",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "Size of the switch",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the switch",
    },
  ];

  return (
    <DocTemplate
      title="Switch"
      description="Switch components are used for toggling between two states."
      component={
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                size === "sm"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setSize("sm")}
            >
              Small
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                size === "md"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setSize("md")}
            >
              Medium
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                size === "lg"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setSize("lg")}
            >
              Large
            </button>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <Switch 
              checked={checked}
              onChange={setChecked}
              size={size}
            />
            <span className="os-medium text-brand-blackLight">
              Switch is {checked ? "on" : "off"}
            </span>
          </div>
          <div className="flex justify-center pt-2">
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => setChecked(!checked)}
            >
              Toggle Switch
            </button>
          </div>
        </div>
      }
      code={`import { Switch } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  const [size, setSize] = useState("md");
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            size === "sm"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setSize("sm")}
        >
          Small
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            size === "md"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setSize("md")}
        >
          Medium
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            size === "lg"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setSize("lg")}
        >
          Large
        </button>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Switch 
          checked={checked}
          onChange={setChecked}
          size={size}
        />
        <span className="os-medium text-brand-blackLight">
          Switch is {checked ? "on" : "off"}
        </span>
      </div>
      <div className="flex justify-center pt-2">
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => setChecked(!checked)}
        >
          Toggle Switch
        </button>
      </div>
    </div>
  );
}`}
      props={switchProps}
      examples={[
        {
          title: "Basic Switch",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Switch Sizes",
          component: sizeExample,
          code: sizeCode,
        },
        {
          title: "Switch with Labels",
          component: labelExample,
          code: labelCode,
        },
      ]}
    />
  );
};

export default SwitchDoc;
