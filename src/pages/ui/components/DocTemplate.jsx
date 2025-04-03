import React, { useState } from "react";

/**
 * Documentation template for UI components
 * @param {Object} props - Component props
 * @param {string} props.title - Component name
 * @param {string} props.description - Component description
 * @param {React.ReactNode} props.component - Component to display
 * @param {Object} props.code - Code examples
 * @param {Array} props.props - Component props documentation
 * @param {Array} props.examples - Component examples
 * @returns {JSX.Element}
 */
const DocTemplate = ({
  title,
  description,
  component,
  code,
  props = [],
  examples = [],
}) => {
  const [activeTab, setActiveTab] = useState("preview");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl os-bold text-brand-blackLight mb-4">{title}</h1>
      <p className="text-brand-blackLighter mb-8 os-regular">{description}</p>

      {/* Component Preview */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`px-4 py-2 os-medium text-sm ${
              activeTab === "preview"
                ? "bg-white text-brand-green border-b-2 border-brand-green"
                : "bg-gray-50 text-brand-blackLight"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            className={`px-4 py-2 os-medium text-sm ${
              activeTab === "code"
                ? "bg-white text-brand-green border-b-2 border-brand-green"
                : "bg-gray-50 text-brand-blackLight"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
        </div>
        <div className="p-6 bg-white">
          {activeTab === "preview" ? (
            <div>{component}</div>
          ) : (
            <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Props Documentation */}
      <div className="mb-8">
        <h2 className="text-xl os-semibold text-brand-blackLight mb-4">API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left os-medium text-brand-blackLight">
                  Prop
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left os-medium text-brand-blackLight">
                  Type
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left os-medium text-brand-blackLight">
                  Default
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left os-medium text-brand-blackLight">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop) => (
                <tr key={prop.name} className="border-b border-gray-200">
                  <td className="border border-gray-200 px-4 py-2 os-medium text-brand-green">
                    {prop.name}
                    {prop.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 os-regular text-brand-blackLight">
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                      {prop.type}
                    </code>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 os-regular text-brand-blackLighter">
                    {prop.default !== undefined ? (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                        {prop.default}
                      </code>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 os-regular text-brand-blackLight">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Examples */}
      {examples.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl os-semibold text-brand-blackLight mb-4">
            Examples
          </h2>
          <div className="space-y-6">
            {examples.map((example) => (
              <div
                key={example.title}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
                  <h3 className="os-medium text-brand-blackLight">
                    {example.title}
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="mb-4">{example.component}</div>
                  <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocTemplate;
