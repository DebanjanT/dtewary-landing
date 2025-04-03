import React from "react";

const InvoicePreview = ({
  invoiceData,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-brand-blackLight mb-1">
            {invoiceData.companyDetails.name || "Your Company Name"}
          </h1>
          <div className="text-brand-blackLighter whitespace-pre-line">
            {invoiceData.companyDetails.address || "Company Address"}
          </div>
          <div className="mt-2">
            {invoiceData.companyDetails.email && (
              <div>{invoiceData.companyDetails.email}</div>
            )}
            {invoiceData.companyDetails.phone && (
              <div>{invoiceData.companyDetails.phone}</div>
            )}
          </div>
        </div>
        <div className="mt-6 md:mt-0 text-right">
          <div className="text-3xl font-bold text-brand-green mb-2">
            INVOICE
          </div>
          <div className="text-brand-blackLight">
            <div>
              <span className="font-semibold">Invoice Number:</span>{" "}
              {invoiceData.invoiceNumber || "INV-001"}
            </div>
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(invoiceData.date)}
            </div>
            {invoiceData.dueDate && (
              <div>
                <span className="font-semibold">Due Date:</span>{" "}
                {formatDate(invoiceData.dueDate)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-10">
        <div className="text-lg font-semibold text-brand-blackLight mb-2">
          Bill To:
        </div>
        <div className="text-brand-blackLight">
          <div className="font-semibold">
            {invoiceData.clientDetails.name || "Client Name"}
          </div>
          <div className="whitespace-pre-line">
            {invoiceData.clientDetails.address || "Client Address"}
          </div>
          <div className="mt-2">
            {invoiceData.clientDetails.email && (
              <div>{invoiceData.clientDetails.email}</div>
            )}
            {invoiceData.clientDetails.phone && (
              <div>{invoiceData.clientDetails.phone}</div>
            )}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-brand-blackLight">
              <th className="py-3 px-4 text-left border-b border-gray-300">
                Description
              </th>
              <th className="py-3 px-4 text-right border-b border-gray-300">
                Quantity
              </th>
              <th className="py-3 px-4 text-right border-b border-gray-300">
                Price
              </th>
              <th className="py-3 px-4 text-right border-b border-gray-300">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 px-4 text-brand-blackLight">
                  {item.description || "Item description"}
                </td>
                <td className="py-3 px-4 text-right text-brand-blackLight">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right text-brand-blackLight">
                  {invoiceData.currency}
                  {item.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-brand-blackLight">
                  {invoiceData.currency}
                  {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between py-2 text-brand-blackLight">
            <div>Subtotal:</div>
            <div>
              {invoiceData.currency}
              {calculateSubtotal().toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between py-2 text-brand-blackLight border-b border-gray-200">
            <div>Tax ({invoiceData.taxRate}%):</div>
            <div>
              {invoiceData.currency}
              {calculateTax().toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between py-3 font-bold text-brand-blackLight text-lg">
            <div>Total:</div>
            <div>
              {invoiceData.currency}
              {calculateTotal().toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {(invoiceData.notes || invoiceData.terms) && (
        <div className="border-t border-gray-200 pt-6">
          {invoiceData.notes && (
            <div className="mb-4">
              <div className="font-semibold text-brand-blackLight mb-2">
                Notes:
              </div>
              <div className="text-brand-blackLighter whitespace-pre-line">
                {invoiceData.notes}
              </div>
            </div>
          )}
          {invoiceData.terms && (
            <div>
              <div className="font-semibold text-brand-blackLight mb-2">
                Terms & Conditions:
              </div>
              <div className="text-brand-blackLighter whitespace-pre-line">
                {invoiceData.terms}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
