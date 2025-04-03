import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Dialog } from "../../components/ui";

const DialogDoc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Basic example
  const basicExample = (
    <div>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Dialog"
      >
        <div className="p-4">
          <p className="mb-4">
            This is a basic dialog with a title and content.
          </p>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );

  const basicCode = `import { Dialog } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </button>
      
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Basic Dialog"
      >
        <div className="p-4">
          <p className="mb-4">This is a basic dialog with a title and content.</p>
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
};`;

  // Form example
  const formExample = (
    <div>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsFormOpen(true)}
      >
        Open Form Dialog
      </button>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Contact Form"
      >
        <div className="p-4">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Form submitted with Name: ${name}, Email: ${email}`);
              setIsFormOpen(false);
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-1 os-medium text-brand-blackLight"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 os-medium text-brand-blackLight"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-brand-blackLight rounded-md os-medium"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );

  const formCode = `import { Dialog } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  return (
    <div>
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsFormOpen(true)}
      >
        Open Form Dialog
      </button>
      
      <Dialog 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Contact Form"
      >
        <div className="p-4">
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            alert(\`Form submitted with Name: \${name}, Email: \${email}\`);
            setIsFormOpen(false);
          }}>
            <div>
              <label htmlFor="name" className="block mb-1 os-medium text-brand-blackLight">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 os-medium text-brand-blackLight">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-brand-blackLight rounded-md os-medium"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};`;

  // Props documentation
  const dialogProps = [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Whether the dialog is open",
    },
    {
      name: "onClose",
      type: "function",
      required: true,
      description: "Function to call when dialog is closed",
    },
    {
      name: "title",
      type: "string",
      description: "Title of the dialog",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content of the dialog",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the dialog",
    },
    {
      name: "maxWidth",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      default: "'md'",
      description: "Maximum width of the dialog",
    },
    {
      name: "closeOnClickOutside",
      type: "boolean",
      default: "true",
      description: "Whether to close the dialog when clicking outside",
    },
  ];

  return (
    <DocTemplate
      title="Dialog"
      description="Dialog components display important information or ask for user input without navigating away from the current page."
      component={
        <div className="space-y-4">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
            onClick={() => setIsOpen(true)}
          >
            Open Dialog
          </button>

          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="Example Dialog"
          >
            <div className="p-6">
              <p className="mb-4">
                This is an example dialog with a title and content.
              </p>
              <p className="mb-6 text-brand-blackLighter">
                Dialogs can contain any content, including forms, buttons, and
                other interactive elements.
              </p>
              <div className="flex justify-end">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Close Dialog
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      }
      code={`import { Dialog } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </button>
      
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Dialog"
      >
        <div className="p-6">
          <p className="mb-4">This is an example dialog with a title and content.</p>
          <p className="mb-6 text-brand-blackLighter">
            Dialogs can contain any content, including forms, buttons, and other interactive elements.
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
              onClick={() => setIsOpen(false)}
            >
              Close Dialog
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}`}
      props={dialogProps}
      examples={[
        {
          title: "Basic Dialog",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Form Dialog",
          component: formExample,
          code: formCode,
        },
      ]}
    />
  );
};

export default DialogDoc;
