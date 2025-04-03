import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Drawer } from "../../components/ui";

const DrawerDoc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("right");

  // Basic example
  const basicExample = (
    <div>
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsOpen(true)}
      >
        Open Drawer
      </button>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
        <div className="p-4">
          <h3 className="text-xl os-semibold text-brand-blackLight mb-4">
            Drawer Content
          </h3>
          <p className="mb-4">
            This is a basic drawer that slides in from the right side of the
            screen.
          </p>
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Drawer>
    </div>
  );

  const basicCode = `import { Drawer } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsOpen(true)}
      >
        Open Drawer
      </button>
      
      <Drawer 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <div className="p-4">
          <h3 className="text-xl os-semibold text-brand-blackLight mb-4">Drawer Content</h3>
          <p className="mb-4">This is a basic drawer that slides in from the right side of the screen.</p>
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Drawer>
    </div>
  );
};`;

  // Different positions example
  const positionsExample = (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("left");
            setIsOpen(true);
          }}
        >
          Left Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("right");
            setIsOpen(true);
          }}
        >
          Right Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("top");
            setIsOpen(true);
          }}
        >
          Top Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("bottom");
            setIsOpen(true);
          }}
        >
          Bottom Drawer
        </button>
      </div>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
      >
        <div className="p-4">
          <h3 className="text-xl os-semibold text-brand-blackLight mb-4">
            {position.charAt(0).toUpperCase() + position.slice(1)} Drawer
          </h3>
          <p className="mb-4">
            This drawer slides in from the {position} of the screen.
          </p>
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Drawer>
    </div>
  );

  const positionsCode = `import { Drawer } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("right");
  
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("left");
            setIsOpen(true);
          }}
        >
          Left Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("right");
            setIsOpen(true);
          }}
        >
          Right Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("top");
            setIsOpen(true);
          }}
        >
          Top Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("bottom");
            setIsOpen(true);
          }}
        >
          Bottom Drawer
        </button>
      </div>
      
      <Drawer 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        position={position}
      >
        <div className="p-4">
          <h3 className="text-xl os-semibold text-brand-blackLight mb-4">{position.charAt(0).toUpperCase() + position.slice(1)} Drawer</h3>
          <p className="mb-4">This drawer slides in from the {position} of the screen.</p>
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Drawer>
    </div>
  );
};`;

  // Props documentation
  const drawerProps = [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Whether the drawer is open",
    },
    {
      name: "onClose",
      type: "function",
      required: true,
      description: "Function to call when drawer is closed",
    },
    {
      name: "position",
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'right'",
      description: "Position from which the drawer slides in",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content of the drawer",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the drawer",
    },
    {
      name: "width",
      type: "string",
      default: "'320px'",
      description: "Width of the drawer (for left/right drawers)",
    },
    {
      name: "height",
      type: "string",
      default: "'320px'",
      description: "Height of the drawer (for top/bottom drawers)",
    },
    {
      name: "closeOnClickOutside",
      type: "boolean",
      default: "true",
      description: "Whether to close the drawer when clicking outside",
    },
  ];

  return (
    <DocTemplate
      title="Drawer"
      description="Drawer components slide in from the edge of the screen to provide additional functionality without navigating away from the current page."
      component={
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => {
                setPosition("left");
                setIsOpen(true);
              }}
            >
              Left Drawer
            </button>
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => {
                setPosition("right");
                setIsOpen(true);
              }}
            >
              Right Drawer
            </button>
          </div>

          <Drawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            position={position}
          >
            <div className="p-6">
              <h3 className="text-xl os-semibold text-brand-blackLight mb-4">
                {position.charAt(0).toUpperCase() + position.slice(1)} Drawer
              </h3>
              <p className="mb-6">
                This is an example drawer that slides in from the {position}{" "}
                side of the screen. Drawers are commonly used for navigation,
                filters, or additional information.
              </p>
              <button
                className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
                onClick={() => setIsOpen(false)}
              >
                Close Drawer
              </button>
            </div>
          </Drawer>
        </div>
      }
      code={`import { Drawer } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("right");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("left");
            setIsOpen(true);
          }}
        >
          Left Drawer
        </button>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={() => {
            setPosition("right");
            setIsOpen(true);
          }}
        >
          Right Drawer
        </button>
      </div>
      
      <Drawer 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        position={position}
      >
        <div className="p-6">
          <h3 className="text-xl os-semibold text-brand-blackLight mb-4">
            {position.charAt(0).toUpperCase() + position.slice(1)} Drawer
          </h3>
          <p className="mb-6">
            This is an example drawer that slides in from the {position} side of the screen.
            Drawers are commonly used for navigation, filters, or additional information.
          </p>
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close Drawer
          </button>
        </div>
      </Drawer>
    </div>
  );
}`}
      props={drawerProps}
      examples={[
        {
          title: "Basic Drawer",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Drawer Positions",
          component: positionsExample,
          code: positionsCode,
        },
      ]}
    />
  );
};

export default DrawerDoc;
