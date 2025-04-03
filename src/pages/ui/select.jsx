import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Select } from "../../components/ui";

const SelectDoc = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [multiSelectedValues, setMultiSelectedValues] = useState([]);

  // Basic example
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
  ];

  const basicExample = (
    <div className="w-full max-w-sm mx-auto">
      <Select 
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder="Select a fruit"
      />
    </div>
  );

  const basicCode = `import { Select } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState("");
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
  ];
  
  return (
    <Select 
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Select a fruit"
    />
  );
};`;

  // Multi-select example
  const multiExample = (
    <div className="w-full max-w-sm mx-auto">
      <Select 
        options={options}
        value={multiSelectedValues}
        onChange={setMultiSelectedValues}
        placeholder="Select fruits"
        multiple
      />
    </div>
  );

  const multiCode = `import { Select } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [multiSelectedValues, setMultiSelectedValues] = useState([]);
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
  ];
  
  return (
    <Select 
      options={options}
      value={multiSelectedValues}
      onChange={setMultiSelectedValues}
      placeholder="Select fruits"
      multiple
    />
  );
};`;

  // Disabled example
  const disabledExample = (
    <div className="w-full max-w-sm mx-auto">
      <Select 
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
          { value: "grape", label: "Grape", disabled: true },
          { value: "mango", label: "Mango", disabled: true },
        ]}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder="Some options are disabled"
      />
    </div>
  );

  const disabledCode = `import { Select } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState("");
  
  return (
    <Select 
      options={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "grape", label: "Grape", disabled: true },
        { value: "mango", label: "Mango", disabled: true },
      ]}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Some options are disabled"
    />
  );
};`;

  // Props documentation
  const selectProps = [
    {
      name: "options",
      type: "Array<{ value: string, label: string, disabled?: boolean }>",
      required: true,
      description: "Array of select options",
    },
    {
      name: "value",
      type: "string | Array<string>",
      description: "Selected value(s)",
    },
    {
      name: "onChange",
      type: "function(string | Array<string>)",
      description: "Function to call when selection changes",
    },
    {
      name: "placeholder",
      type: "string",
      default: "'Select...'",
      description: "Placeholder text when no option is selected",
    },
    {
      name: "multiple",
      type: "boolean",
      default: "false",
      description: "Whether multiple options can be selected",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the select is disabled",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the select container",
    },
    {
      name: "menuClassName",
      type: "string",
      default: "''",
      description: "Additional classes for the dropdown menu",
    },
  ];

  // Format selected values for display
  const formatSelected = (value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return "Nothing selected";
    }
    
    if (Array.isArray(value)) {
      return value.map(v => {
        const option = options.find(opt => opt.value === v);
        return option ? option.label : v;
      }).join(", ");
    }
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
  };

  return (
    <DocTemplate
      title="Select"
      description="Select components allow users to select from a list of options."
      component={
        <div className="space-y-4">
          <div className="w-full max-w-sm mx-auto">
            <Select 
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select a fruit"
            />
          </div>
          <div className="text-center os-medium text-brand-blackLight">
            Selected: {formatSelected(selectedValue)}
          </div>
          <div className="flex justify-center pt-2">
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => setSelectedValue("")}
            >
              Clear Selection
            </button>
          </div>
        </div>
      }
      code={`import { Select } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState("");
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
  ];
  
  // Format selected values for display
  const formatSelected = (value) => {
    if (!value) return "Nothing selected";
    
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  
  return (
    <div className="space-y-4">
      <div className="w-full max-w-sm mx-auto">
        <Select 
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Select a fruit"
        />
      </div>
      <div className="text-center os-medium text-brand-blackLight">
        Selected: {formatSelected(selectedValue)}
      </div>
      <div className="flex justify-center pt-2">
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => setSelectedValue("")}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
}`}
      props={selectProps}
      examples={[
        {
          title: "Basic Select",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Multi-Select",
          component: multiExample,
          code: multiCode,
        },
        {
          title: "Disabled Options",
          component: disabledExample,
          code: disabledCode,
        },
      ]}
    />
  );
};

export default SelectDoc;
