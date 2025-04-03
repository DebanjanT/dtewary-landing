import React from "react";
const UIPage = () => {
  // List of all UI components
  const components = [
    { name: "Accordion", path: "/ui/accordion" },
    { name: "Alert", path: "/ui/alert" },
    { name: "Calendar", path: "/ui/calendar" },
    { name: "Checkbox", path: "/ui/checkbox" },
    { name: "DatePicker", path: "/ui/datepicker" },
    { name: "Dialog", path: "/ui/dialog" },
    { name: "Drawer", path: "/ui/drawer" },
    { name: "InputOTP", path: "/ui/inputotp" },
    { name: "Pagination", path: "/ui/pagination" },
    { name: "Select", path: "/ui/select" },
    { name: "Switch", path: "/ui/switch" },
    { name: "Toggle", path: "/ui/toggle" },
    { name: "Tooltip", path: "/ui/tooltip" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl os-semibold text-brand-blackLight">
        UI Components
      </h1>
      <div className="space-y-2">
        {components.map((component) => (
          <Link
            key={component.name}
            to={component.path}
            className="block px-4 py-2 rounded-md os-medium text-brand-green hover:bg-gray-100 transition-colors duration-300"
          >
            {component.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UIPage;
