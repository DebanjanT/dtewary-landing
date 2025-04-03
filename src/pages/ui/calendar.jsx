import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Calendar } from "../../components/ui";

const CalendarDoc = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Basic example
  const basicExample = (
    <div className="w-full max-w-sm mx-auto">
      <Calendar 
        value={new Date()} 
        onChange={(date) => console.log(date)}
      />
    </div>
  );

  const basicCode = `import { Calendar } from "../components/ui";

const MyComponent = () => (
  <Calendar 
    value={new Date()} 
    onChange={(date) => console.log(date)}
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
      <Calendar 
        value={today}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date) => console.log(date)}
      />
    </div>
  );

  const rangeCode = `import { Calendar } from "../components/ui";

const MyComponent = () => {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 5);
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  return (
    <Calendar 
      value={today}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(date) => console.log(date)}
    />
  );
};`;

  // Props documentation
  const calendarProps = [
    {
      name: "value",
      type: "Date",
      default: "new Date()",
      description: "Selected date",
    },
    {
      name: "onChange",
      type: "function(Date)",
      description: "Function to call when date is changed",
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
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the calendar",
    },
  ];

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <DocTemplate
      title="Calendar"
      description="Calendar component for date selection and display."
      component={
        <div className="space-y-4">
          <div className="w-full max-w-sm mx-auto">
            <Calendar 
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>
          <div className="text-center os-medium text-brand-blackLight">
            Selected date: {formatDate(selectedDate)}
          </div>
        </div>
      }
      code={`import { Calendar } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-4">
      <div className="w-full max-w-sm mx-auto">
        <Calendar 
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
      <div className="text-center os-medium text-brand-blackLight">
        Selected date: {formatDate(selectedDate)}
      </div>
    </div>
  );
}`}
      props={calendarProps}
      examples={[
        {
          title: "Basic Calendar",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Calendar with Date Range",
          component: rangeExample,
          code: rangeCode,
        },
      ]}
    />
  );
};

export default CalendarDoc;
