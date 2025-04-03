import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Tooltip } from "../../components/ui";

const TooltipDoc = () => {
  const [position, setPosition] = useState("top");

  // Basic example
  const basicExample = (
    <div className="flex justify-center py-8">
      <Tooltip content="This is a tooltip">
        <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
          Hover me
        </button>
      </Tooltip>
    </div>
  );

  const basicCode = `import { Tooltip } from "../components/ui";

const MyComponent = () => (
  <Tooltip content="This is a tooltip">
    <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
      Hover me
    </button>
  </Tooltip>
);`;

  // Position variants example
  const positionExample = (
    <div className="grid grid-cols-2 gap-8 py-8 place-items-center">
      <Tooltip content="Tooltip on top" position="top">
        <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
          Top
        </button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
          Right
        </button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
          Left
        </button>
      </Tooltip>
    </div>
  );

  const positionCode = `import { Tooltip } from "../components/ui";

const MyComponent = () => (
  <div className="grid grid-cols-2 gap-8 py-8 place-items-center">
    <Tooltip content="Tooltip on top" position="top">
      <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
        Top
      </button>
    </Tooltip>
    <Tooltip content="Tooltip on right" position="right">
      <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
        Right
      </button>
    </Tooltip>
    <Tooltip content="Tooltip on bottom" position="bottom">
      <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
        Bottom
      </button>
    </Tooltip>
    <Tooltip content="Tooltip on left" position="left">
      <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
        Left
      </button>
    </Tooltip>
  </div>
);`;

  // Rich content example
  const richContentExample = (
    <div className="flex justify-center py-8">
      <Tooltip
        content={
          <div className="p-2">
            <h3 className="text-sm os-semibold mb-1">Rich Content</h3>
            <p className="text-xs">Tooltips can contain rich content including:</p>
            <ul className="text-xs list-disc pl-4 mt-1">
              <li>Formatted text</li>
              <li>Multiple paragraphs</li>
              <li>Images and icons</li>
            </ul>
          </div>
        }
      >
        <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
          Rich Content
        </button>
      </Tooltip>
    </div>
  );

  const richContentCode = `import { Tooltip } from "../components/ui";

const MyComponent = () => (
  <Tooltip
    content={
      <div className="p-2">
        <h3 className="text-sm os-semibold mb-1">Rich Content</h3>
        <p className="text-xs">Tooltips can contain rich content including:</p>
        <ul className="text-xs list-disc pl-4 mt-1">
          <li>Formatted text</li>
          <li>Multiple paragraphs</li>
          <li>Images and icons</li>
        </ul>
      </div>
    }
  >
    <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
      Rich Content
    </button>
  </Tooltip>
);`;

  // Props documentation
  const tooltipProps = [
    {
      name: "content",
      type: "string | React.ReactNode",
      required: true,
      description: "Content to display in the tooltip",
    },
    {
      name: "children",
      type: "React.ReactElement",
      required: true,
      description: "Element to attach the tooltip to",
    },
    {
      name: "position",
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'top'",
      description: "Position of the tooltip relative to the children",
    },
    {
      name: "delay",
      type: "number",
      default: "0",
      description: "Delay in milliseconds before showing the tooltip",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the tooltip",
    },
    {
      name: "contentClassName",
      type: "string",
      default: "''",
      description: "Additional classes for the tooltip content",
    },
  ];

  return (
    <DocTemplate
      title="Tooltip"
      description="Tooltips display informative text when users hover over, focus on, or tap an element."
      component={
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                position === "top"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setPosition("top")}
            >
              Top
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                position === "right"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setPosition("right")}
            >
              Right
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                position === "bottom"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setPosition("bottom")}
            >
              Bottom
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                position === "left"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setPosition("left")}
            >
              Left
            </button>
          </div>
          <div className="flex justify-center py-8">
            <Tooltip 
              content={`Tooltip on the ${position}`}
              position={position}
            >
              <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
                Hover me
              </button>
            </Tooltip>
          </div>
        </div>
      }
      code={`import { Tooltip } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [position, setPosition] = useState("top");
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            position === "top"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setPosition("top")}
        >
          Top
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            position === "right"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setPosition("right")}
        >
          Right
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            position === "bottom"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setPosition("bottom")}
        >
          Bottom
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            position === "left"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setPosition("left")}
        >
          Left
        </button>
      </div>
      <div className="flex justify-center py-8">
        <Tooltip 
          content={\`Tooltip on the \${position}\`}
          position={position}
        >
          <button className="px-4 py-2 bg-brand-green text-white rounded-md os-medium">
            Hover me
          </button>
        </Tooltip>
      </div>
    </div>
  );
}`}
      props={tooltipProps}
      examples={[
        {
          title: "Basic Tooltip",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Tooltip Positions",
          component: positionExample,
          code: positionCode,
        },
        {
          title: "Rich Content Tooltip",
          component: richContentExample,
          code: richContentCode,
        },
      ]}
    />
  );
};

export default TooltipDoc;
