import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { DatePicker } from "../../components/ui";

const DatePickerDoc = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Basic example
  const basicExample = (
    <div className="w-full max-w-sm mx-auto">
      <DatePicker 
        value={new Date()} 
        onChange={(date) => console.log(date)}
        placeholder="Select a date"
      />
    </div>
  );

  const basicCode = `import { DatePicker } from "../components/ui";

const MyComponent = () => (
  <DatePicker 
    value={new Date()} 
    onChange={(date) => console.log(date)}
    placeholder="Select a date"
  />
);`;

  // Date range example
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 5);
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  const rangeExample = (
    <div className="w-full max-w-sm mx-auto">
      <DatePicker 
        value={today}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date) => console.log(date)}
        placeholder="Select a date (limited range)"
      />
    </div>
  );

  const rangeCode = `import { DatePicker } from "../components/ui";

const MyComponent = () => {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 5);
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  return (
    <DatePicker 
      value={today}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(date) => console.log(date)}
      placeholder="Select a date (limited range)"
    />
  );
};`;

  // Props documentation
  const datePickerProps = [
    {
      name: "value",
      type: "Date",
      description: "Selected date",
    },
    {
      name: "onChange",
      type: "function(Date)",
      description: "Function to call when date is changed",
    },
    {
      name: "placeholder",
      type: "string",
      default: "'Select date...'",
      description: "Placeholder text when no date is selected",
    },
    {
      name: "minDate",
      type: "Date",
      description: "Minimum selectable date",
    },
    {
      name: "maxDate",
      type: "Date",
      description: "Maximum selectable date",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the date picker is disabled",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the date picker",
    },
    {
      name: "format",
      type: "string",
      default: "'MM/dd/yyyy'",
      description: "Date format string",
    },
  ];

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <DocTemplate
      title="DatePicker"
      description="DatePicker component provides an input field with a calendar dropdown for selecting dates."
      component={
        <div className="space-y-4">
          <div className="w-full max-w-sm mx-auto">
            <DatePicker 
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select a date"
            />
          </div>
          <div className="text-center os-medium text-brand-blackLight">
            Selected date: {formatDate(selectedDate)}
          </div>
        </div>
      }
      code={`import { DatePicker } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-4">
      <div className="w-full max-w-sm mx-auto">
        <DatePicker 
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Select a date"
        />
      </div>
      <div className="text-center os-medium text-brand-blackLight">
        Selected date: {formatDate(selectedDate)}
      </div>
    </div>
  );
}`}
      props={datePickerProps}
      examples={[
        {
          title: "Basic DatePicker",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "DatePicker with Date Range",
          component: rangeExample,
          code: rangeCode,
        },
      ]}
    />
  );
};

export default DatePickerDoc;
