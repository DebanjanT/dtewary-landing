import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Checkbox, CheckboxGroup } from "../../components/ui";

const CheckboxDoc = () => {
  const [checked, setChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["option1"]);

  // Basic example
  const basicExample = (
    <Checkbox
      id="basic-checkbox"
      label="Basic checkbox"
      checked={checked}
      onChange={setChecked}
    />
  );

  const basicCode = `import { Checkbox } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox
      id="basic-checkbox"
      label="Basic checkbox"
      checked={checked}
      onChange={setChecked}
    />
  );
};`;

  // Checkbox group example
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4 (Disabled)", disabled: true },
  ];

  const groupExample = (
    <CheckboxGroup
      options={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
    />
  );

  const groupCode = `import { CheckboxGroup } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState(["option1"]);
  
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4 (Disabled)", disabled: true },
  ];
  
  return (
    <CheckboxGroup
      options={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
    />
  );
};`;

  // Size variants example
  const sizeExample = (
    <div className="space-y-2">
      <Checkbox
        id="small-checkbox"
        label="Small checkbox"
        size="sm"
        checked={checked}
        onChange={setChecked}
      />
      <Checkbox
        id="medium-checkbox"
        label="Medium checkbox"
        size="md"
        checked={checked}
        onChange={setChecked}
      />
      <Checkbox
        id="large-checkbox"
        label="Large checkbox"
        size="lg"
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );

  const sizeCode = `import { Checkbox } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-2">
      <Checkbox
        id="small-checkbox"
        label="Small checkbox"
        size="sm"
        checked={checked}
        onChange={setChecked}
      />
      <Checkbox
        id="medium-checkbox"
        label="Medium checkbox"
        size="md"
        checked={checked}
        onChange={setChecked}
      />
      <Checkbox
        id="large-checkbox"
        label="Large checkbox"
        size="lg"
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
};`;

  // Props documentation
  const checkboxProps = [
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the checkbox",
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the checkbox",
    },
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Whether the checkbox is checked",
    },
    {
      name: "onChange",
      type: "function(boolean)",
      description: "Function to call when checkbox state changes",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the checkbox is disabled",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "Size of the checkbox",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the container",
    },
    {
      name: "labelClassName",
      type: "string",
      default: "''",
      description: "Additional classes for the label",
    },
  ];

  const checkboxGroupProps = [
    {
      name: "options",
      type: "Array<{ value: string, label: string, disabled?: boolean }>",
      default: "[]",
      required: true,
      description: "Array of checkbox options",
    },
    {
      name: "value",
      type: "Array<string>",
      default: "[]",
      description: "Array of selected values",
    },
    {
      name: "onChange",
      type: "function(Array<string>)",
      description: "Function to call when selection changes",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the container",
    },
  ];

  return (
    <DocTemplate
      title="Checkbox"
      description="Checkbox components allow users to select multiple options from a set."
      component={
        <div className="space-y-4">
          <Checkbox
            id="demo-checkbox"
            label={`Checkbox is ${checked ? "checked" : "unchecked"}`}
            checked={checked}
            onChange={setChecked}
          />
          <div className="pt-2">
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => setChecked(!checked)}
            >
              Toggle Checkbox
            </button>
          </div>
        </div>
      }
      code={`import { Checkbox } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <Checkbox
        id="demo-checkbox"
        label={\`Checkbox is \${checked ? "checked" : "unchecked"}\`}
        checked={checked}
        onChange={setChecked}
      />
      <div className="pt-2">
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => setChecked(!checked)}
        >
          Toggle Checkbox
        </button>
      </div>
    </div>
  );
}`}
      props={[
        ...checkboxProps,
        { name: "CheckboxGroup Props", type: "", description: "" },
        ...checkboxGroupProps,
      ]}
      examples={[
        {
          title: "Basic Checkbox",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Checkbox Group",
          component: groupExample,
          code: groupCode,
        },
        {
          title: "Checkbox Sizes",
          component: sizeExample,
          code: sizeCode,
        },
      ]}
    />
  );
};

export default CheckboxDoc;
