import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Alert } from "../../components/ui";

const AlertDoc = () => {
  const [visible, setVisible] = useState(true);
  const [alertType, setAlertType] = useState("info");

  // Reset alert visibility
  const resetAlert = () => {
    setVisible(true);
  };

  // Basic examples
  const infoExample = (
    <Alert variant="info" title="Information">
      This is an informational alert.
    </Alert>
  );

  const successExample = (
    <Alert variant="success" title="Success">
      Your changes have been saved successfully.
    </Alert>
  );

  const warningExample = (
    <Alert variant="warning" title="Warning">
      This action cannot be undone.
    </Alert>
  );

  const errorExample = (
    <Alert variant="error" title="Error">
      An error occurred while processing your request.
    </Alert>
  );

  // Dismissible example
  const dismissibleExample = (
    <>
      {visible ? (
        <Alert
          variant="info"
          title="Dismissible Alert"
          dismissible
          onDismiss={() => setVisible(false)}
        >
          Click the X button to dismiss this alert.
        </Alert>
      ) : (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={resetAlert}
        >
          Show Alert Again
        </button>
      )}
    </>
  );

  const basicCode = `import { Alert } from "../components/ui";

const MyComponent = () => (
  <>
    <Alert variant="info" title="Information">
      This is an informational alert.
    </Alert>
    
    <Alert variant="success" title="Success">
      Your changes have been saved successfully.
    </Alert>
    
    <Alert variant="warning" title="Warning">
      This action cannot be undone.
    </Alert>
    
    <Alert variant="error" title="Error">
      An error occurred while processing your request.
    </Alert>
  </>
);`;

  const dismissibleCode = `import { Alert } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [visible, setVisible] = useState(true);
  
  const resetAlert = () => {
    setVisible(true);
  };
  
  return (
    <>
      {visible ? (
        <Alert
          variant="info"
          title="Dismissible Alert"
          dismissible
          onDismiss={() => setVisible(false)}
        >
          Click the X button to dismiss this alert.
        </Alert>
      ) : (
        <button
          className="px-4 py-2 bg-brand-green text-white rounded-md os-medium"
          onClick={resetAlert}
        >
          Show Alert Again
        </button>
      )}
    </>
  );
};`;

  // Props documentation
  const alertProps = [
    {
      name: "title",
      type: "string",
      description: "Title of the alert",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content of the alert",
    },
    {
      name: "variant",
      type: "'info' | 'success' | 'warning' | 'error'",
      default: "'info'",
      description: "Alert variant",
    },
    {
      name: "dismissible",
      type: "boolean",
      default: "false",
      description: "Whether the alert can be dismissed",
    },
    {
      name: "onDismiss",
      type: "function",
      description: "Function to call when alert is dismissed",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the alert",
    },
  ];

  return (
    <DocTemplate
      title="Alert"
      description="Alert components are used to display important messages to the user."
      component={
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                alertType === "info"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setAlertType("info")}
            >
              Info
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                alertType === "success"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setAlertType("success")}
            >
              Success
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                alertType === "warning"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setAlertType("warning")}
            >
              Warning
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                alertType === "error"
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => setAlertType("error")}
            >
              Error
            </button>
          </div>
          <Alert
            variant={alertType}
            title={`${
              alertType.charAt(0).toUpperCase() + alertType.slice(1)
            } Alert`}
            dismissible
            onDismiss={() => {}}
          >
            This is a{alertType === "info" ? "n" : ""} {alertType} alert. You
            can customize the content and appearance.
          </Alert>
        </div>
      }
      code={`import { Alert } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [alertType, setAlertType] = useState("info");
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            alertType === "info"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setAlertType("info")}
        >
          Info
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            alertType === "success"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setAlertType("success")}
        >
          Success
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            alertType === "warning"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setAlertType("warning")}
        >
          Warning
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            alertType === "error"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => setAlertType("error")}
        >
          Error
        </button>
      </div>
      <Alert
        variant={alertType}
        title={\`\${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert\`}
        dismissible
        onDismiss={() => {}}
      >
        This is a{alertType === "info" ? "n" : ""} {alertType} alert. You can customize the content and appearance.
      </Alert>
    </div>
  );
}`}
      props={alertProps}
      examples={[
        {
          title: "Alert Variants",
          component: (
            <div className="space-y-2">
              {infoExample}
              {successExample}
              {warningExample}
              {errorExample}
            </div>
          ),
          code: basicCode,
        },
        {
          title: "Dismissible Alert",
          component: dismissibleExample,
          code: dismissibleCode,
        },
      ]}
    />
  );
};

export default AlertDoc;
