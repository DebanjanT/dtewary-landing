import React, { useState } from "react";
import DocTemplate from "./components/DocTemplate";
import { Pagination } from "../../components/ui";

const PaginationDoc = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  // Basic example
  const basicExample = (
    <div className="w-full max-w-lg mx-auto">
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );

  const basicCode = `import { Pagination } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  return (
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
};`;

  // With sibling count example
  const siblingExample = (
    <div className="space-y-4">
      <div className="w-full max-w-lg mx-auto">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={1}
        />
      </div>
      <div className="text-center text-sm text-brand-blackLighter">
        Sibling Count: 1
      </div>
    </div>
  );

  const siblingCode = `import { Pagination } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  return (
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      siblingCount={1}
    />
  );
};`;

  // Props documentation
  const paginationProps = [
    {
      name: "currentPage",
      type: "number",
      required: true,
      description: "Current active page",
    },
    {
      name: "totalPages",
      type: "number",
      required: true,
      description: "Total number of pages",
    },
    {
      name: "onPageChange",
      type: "function(number)",
      required: true,
      description: "Function to call when page changes",
    },
    {
      name: "siblingCount",
      type: "number",
      default: "1",
      description: "Number of siblings to show on each side of current page",
    },
    {
      name: "showFirstLast",
      type: "boolean",
      default: "true",
      description: "Whether to show first and last page buttons",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional classes for the pagination container",
    },
  ];

  return (
    <DocTemplate
      title="Pagination"
      description="Pagination component for navigating through pages of content."
      component={
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                totalPages === 5
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => {
                setTotalPages(5);
                setCurrentPage(1);
              }}
            >
              5 Pages
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                totalPages === 10
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => {
                setTotalPages(10);
                setCurrentPage(1);
              }}
            >
              10 Pages
            </button>
            <button
              className={`px-3 py-1 rounded-md os-medium ${
                totalPages === 20
                  ? "bg-brand-green text-white"
                  : "bg-gray-200 text-brand-blackLight"
              }`}
              onClick={() => {
                setTotalPages(20);
                setCurrentPage(1);
              }}
            >
              20 Pages
            </button>
          </div>
          <div className="w-full max-w-lg mx-auto">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className="text-center os-medium text-brand-blackLight">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      }
      code={`import { Pagination } from "../components/ui";
import { useState } from "react";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            totalPages === 5
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => {
            setTotalPages(5);
            setCurrentPage(1);
          }}
        >
          5 Pages
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            totalPages === 10
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => {
            setTotalPages(10);
            setCurrentPage(1);
          }}
        >
          10 Pages
        </button>
        <button
          className={\`px-3 py-1 rounded-md os-medium \${
            totalPages === 20
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-brand-blackLight"
          }\`}
          onClick={() => {
            setTotalPages(20);
            setCurrentPage(1);
          }}
        >
          20 Pages
        </button>
      </div>
      <div className="w-full max-w-lg mx-auto">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="text-center os-medium text-brand-blackLight">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}`}
      props={paginationProps}
      examples={[
        {
          title: "Basic Pagination",
          component: basicExample,
          code: basicCode,
        },
        {
          title: "Pagination with Custom Sibling Count",
          component: siblingExample,
          code: siblingCode,
        },
      ]}
    />
  );
};

export default PaginationDoc;
