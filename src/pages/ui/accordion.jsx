import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Accordion, AccordionGroup } from "../../components/ui";

const AccordionDoc = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Basic example
  const basicExample = (
    <Accordion title="What is an Accordion component?" defaultOpen={true}>
      <p>
        An accordion is a vertically stacked set of interactive headings that
        each reveal a section of content. They are commonly used to reduce the
        need to scroll when presenting multiple sections of content on a single
        page.
      </p>
    </Accordion>
  );

  const basicCode = `import { Accordion } from "../components/ui";

const MyComponent = () => (
  <Accordion 
    title="What is an Accordion component?" 
    defaultOpen={true}
  >
    <p>
      An accordion is a vertically stacked set of interactive headings that each reveal a section of content.
      They are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.
    </p>
  </Accordion>
);`;

  // Group example
  const groupExample = (
    <AccordionGroup allowMultiple={false}>
      <Accordion title="Section 1">
        <p>Content for section 1</p>
      </Accordion>
      <Accordion title="Section 2">
        <p>Content for section 2</p>
      </Accordion>
      <Accordion title="Section 3">
        <p>Content for section 3</p>
      </Accordion>
    </AccordionGroup>
  );

  const groupCode = `import { Accordion, AccordionGroup } from "../components/ui";

const MyComponent = () => (
  <AccordionGroup allowMultiple={false}>
    <Accordion title="Section 1">
      <p>Content for section 1</p>
    </Accordion>
    <Accordion title="Section 2">
      <p>Content for section 2</p>
    </Accordion>
    <Accordion title="Section 3">
      <p>Content for section 3</p>
    </Accordion>
  </AccordionGroup>
);`;

  // Props documentation
  const accordionProps = [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Title of the accordion section",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content to be displayed when expanded",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Whether the accordion is open by default",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the accordion container",
    },
    {
      name: "titleClassName",
      type: "string",
      default: "''",
      description: "Additional classes for the title",
    },
    {
      name: "contentClassName",
      type: "string",
      default: "''",
      description: "Additional classes for the content",
    },
  ];

  const accordionGroupProps = [
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Accordion components to be grouped",
    },
    {
      name: "allowMultiple",
      type: "boolean",
      default: "false",
      description: "Whether multiple accordions can be open at the same time",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the accordion group",
    },
  ];

  return (
    <DocTemplate
      title="Accordion"
      description="Accordion components are used to display collapsible content panels for presenting information in a limited amount of space."
      component={
        <div className="space-y-4">
          <Accordion title="Click me to toggle" defaultOpen={isOpen}>
            <p>
              This is the content inside the accordion. It can contain any React
              elements.
            </p>
          </Accordion>
          <div className="flex justify-center">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Close Accordion" : "Open Accordion"}
            </button>
          </div>
        </div>
      }
      code={`import { Accordion } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <Accordion 
        title="Click me to toggle" 
        defaultOpen={isOpen}
      >
        <p>This is the content inside the accordion. It can contain any React elements.</p>
      </Accordion>
      <div className="flex justify-center">
        <button 
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close Accordion" : "Open Accordion"}
        </button>
      </div>
    </div>
  );
}`}
      props={[
        ...accordionProps,
        { name: "AccordionGroup Props", type: "", description: "" },
        ...accordionGroupProps,
      ]}
      examples={[
        {
          title: "Basic Accordion",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Accordion Group",
          component: groupExample,
          code: groupCode,
        },
      ]}
    />
  );
};

export default AccordionDoc;
