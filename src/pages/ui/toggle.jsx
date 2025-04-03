import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Toggle } from "../../components/ui";

const ToggleDoc = () => {
  const [value, setValue] = useState("option1");
  const [size, setSize] = useState("md");

  // Basic example
  const basicExample = (
    <div className="w-full max-w-sm mx-auto">
      <Toggle
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        value={value}
        onChange={setValue}
      />
    </div>
  );

  const basicCode = `import { Toggle } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [value, setValue] = useState("option1");
  
  return (
    <Toggle
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};`;

  // Size variants example
  const sizeExample = (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 os-medium text-brand-blackLight">Small</h3>
        <Toggle
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          value={value}
          onChange={setValue}
          size="sm"
        />
      </div>
      <div>
        <h3 className="mb-2 os-medium text-brand-blackLight">Medium</h3>
        <Toggle
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          value={value}
          onChange={setValue}
          size="md"
        />
      </div>
      <div>
        <h3 className="mb-2 os-medium text-brand-blackLight">Large</h3>
        <Toggle
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          value={value}
          onChange={setValue}
          size="lg"
        />
      </div>
    </div>
  );

  const sizeCode = `import { Toggle } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [value, setValue] = useState("option1");
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 os-medium text-brand-blackLight">Small</h3>
        <Toggle
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          value={value}
          onChange={setValue}
          size="sm"
        />
      </div>
      <div>
        <h3 className="mb-2 os-medium text-brand-blackLight">Medium</h3>
        <Toggle
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          value={value}
          onChange={setValue}
          size="md"
        />
      </div>
      <div>
        <h3 className="mb-2 os-medium text-brand-blackLight">Large</h3>
        <Toggle
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          value={value}
          onChange={setValue}
          size="lg"
        />
      </div>
    </div>
  );
};`;

  // With icons example
  const iconExample = (
    <div className="w-full max-w-sm mx-auto">
      <Toggle
        options={[
          { 
            value: "list", 
            label: "List", 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            )
          },
          { 
            value: "grid", 
            label: "Grid", 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            )
          },
        ]}
        value={value === "option1" ? "list" : "grid"}
        onChange={(val) => setValue(val === "list" ? "option1" : "option2")}
      />
    </div>
  );

  const iconCode = `import { Toggle } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [value, setValue] = useState("list");
  
  return (
    <Toggle
      options={[
        { 
          value: "list", 
          label: "List", 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          )
        },
        { 
          value: "grid", 
          label: "Grid", 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          )
        },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};`;

  // Props documentation
  const toggleProps = [
    {
      name: "options",
      type: "Array<{ value: string, label: string, icon?: React.ReactNode, disabled?: boolean }>",
      required: true,
      description: "Array of toggle options",
    },
    {
      name: "value",
      type: "string",
      required: true,
      description: "Currently selected value",
    },
    {
      name: "onChange",
      type: "function(string)",
      required: true,
      description: "Function to call when selection changes",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "Size of the toggle",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the toggle is disabled",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the toggle container",
    },
  ];

  // Options for the demo
  const demoOptions = [
    { value: "option1", label: "Daily" },
    { value: "option2", label: "Weekly" },
    { value: "option3", label: "Monthly" },
  ];

  return (
    <DocTemplate
      title="Toggle"
      description="Toggle components allow users to switch between a set of predefined options."
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
          <div className="w-full max-w-sm mx-auto">
            <Toggle
              options={demoOptions}
              value={value}
              onChange={setValue}
              size={size}
            />
          </div>
          <div className="text-center os-medium text-brand-blackLight">
            Selected: {demoOptions.find(opt => opt.value === value)?.label || value}
          </div>
        </div>
      }
      code={`import { Toggle } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [value, setValue] = useState("option1");
  const [size, setSize] = useState("md");
  
  // Options for the demo
  const demoOptions = [
    { value: "option1", label: "Daily" },
    { value: "option2", label: "Weekly" },
    { value: "option3", label: "Monthly" },
  ];
  
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
      <div className="w-full max-w-sm mx-auto">
        <Toggle
          options={demoOptions}
          value={value}
          onChange={setValue}
          size={size}
        />
      </div>
      <div className="text-center os-medium text-brand-blackLight">
        Selected: {demoOptions.find(opt => opt.value === value)?.label || value}
      </div>
    </div>
  );
}`}
      props={toggleProps}
      examples={[
        {
          title: "Basic Toggle",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Toggle Sizes",
          component: sizeExample,
          code: sizeCode,
        },
        {
          title: "Toggle with Icons",
          component: iconExample,
          code: iconCode,
        },
      ]}
    />
  );
};

export default ToggleDoc;
