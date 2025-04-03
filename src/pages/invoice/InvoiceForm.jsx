import React from "react";
import { Checkbox } from "../../components/ui";

const InvoiceForm = ({
  invoiceData,
  handleInputChange,
  handleItemChange,
  addItem,
  removeItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Invoice Details */}
        <div>
          <h2 className="text-xl font-semibold text-brand-blackLight mb-4">
            Invoice Details
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="invoiceNumber"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Invoice Number
              </label>
              <input
                type="text"
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => handleInputChange(e, null, "invoiceNumber")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="INV-001"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Invoice Date
              </label>
              <input
                type="date"
                id="date"
                value={invoiceData.date}
                onChange={(e) => handleInputChange(e, null, "date")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={invoiceData.dueDate}
                onChange={(e) => handleInputChange(e, null, "dueDate")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Currency
              </label>
              <select
                id="currency"
                value={invoiceData.currency}
                onChange={(e) => handleInputChange(e, null, "currency")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="taxRate"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="taxRate"
                value={invoiceData.taxRate}
                onChange={(e) => handleInputChange(e, null, "taxRate")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div>
          <h2 className="text-xl font-semibold text-brand-blackLight mb-4">
            Your Company Details
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={invoiceData.companyDetails.name}
                onChange={(e) => handleInputChange(e, "companyDetails", "name")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Your Company Name"
              />
            </div>
            <div>
              <label
                htmlFor="companyAddress"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Address
              </label>
              <textarea
                id="companyAddress"
                value={invoiceData.companyDetails.address}
                onChange={(e) =>
                  handleInputChange(e, "companyDetails", "address")
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                rows="3"
                placeholder="Your Company Address"
              />
            </div>
            <div>
              <label
                htmlFor="companyEmail"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="companyEmail"
                value={invoiceData.companyDetails.email}
                onChange={(e) =>
                  handleInputChange(e, "companyDetails", "email")
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="company@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="companyPhone"
                className="block text-sm font-medium text-brand-blackLight mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                id="companyPhone"
                value={invoiceData.companyDetails.phone}
                onChange={(e) =>
                  handleInputChange(e, "companyDetails", "phone")
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="+91 1234567890"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Client Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-brand-blackLight mb-4">
          Client Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-brand-blackLight mb-1"
            >
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              value={invoiceData.clientDetails.name}
              onChange={(e) => handleInputChange(e, "clientDetails", "name")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="Client Name"
            />
          </div>
          <div>
            <label
              htmlFor="clientEmail"
              className="block text-sm font-medium text-brand-blackLight mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="clientEmail"
              value={invoiceData.clientDetails.email}
              onChange={(e) => handleInputChange(e, "clientDetails", "email")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="client@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="clientPhone"
              className="block text-sm font-medium text-brand-blackLight mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="clientPhone"
              value={invoiceData.clientDetails.phone}
              onChange={(e) => handleInputChange(e, "clientDetails", "phone")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label
              htmlFor="clientAddress"
              className="block text-sm font-medium text-brand-blackLight mb-1"
            >
              Address
            </label>
            <textarea
              id="clientAddress"
              value={invoiceData.clientDetails.address}
              onChange={(e) => handleInputChange(e, "clientDetails", "address")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              rows="3"
              placeholder="Client Address"
            />
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-brand-blackLight mb-4">
          Invoice Items
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-right">Quantity</th>
                <th className="py-2 px-4 border-b text-right">Price</th>
                <th className="py-2 px-4 border-b text-right">Amount</th>
                <th className="py-2 px-4 border-b" />
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green text-right"
                      min="1"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "price",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green text-right"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="py-2 px-4 text-right">
                    {invoiceData.currency}
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={invoiceData.items.length === 1}
                    >
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        alt="Remove item"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="py-2 px-4">
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center text-brand-green hover:text-brand-green/80"
                  >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      alt="Add item"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Item
                  </button>
                </td>
              </tr>
              <tr className="border-t border-gray-300">
                <td colSpan="3" className="py-2 px-4 text-right font-medium">
                  Subtotal:
                </td>
                <td className="py-2 px-4 text-right">
                  {invoiceData.currency}
                  {calculateSubtotal().toFixed(2)}
                </td>
                <td />
              </tr>
              <tr>
                <td colSpan="3" className="py-2 px-4 text-right font-medium">
                  Tax ({invoiceData.taxRate}%):
                </td>
                <td className="py-2 px-4 text-right">
                  {invoiceData.currency}
                  {calculateTax().toFixed(2)}
                </td>
                <td />
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td colSpan="3" className="py-2 px-4 text-right">
                  Total:
                </td>
                <td className="py-2 px-4 text-right">
                  {invoiceData.currency}
                  {calculateTotal().toFixed(2)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-brand-blackLight mb-4">
            Notes
          </h2>
          <textarea
            value={invoiceData.notes}
            onChange={(e) => handleInputChange(e, null, "notes")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
            rows="4"
            placeholder="Additional notes to the client..."
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-blackLight mb-4">
            Terms & Conditions
          </h2>
          <textarea
            value={invoiceData.terms}
            onChange={(e) => handleInputChange(e, null, "terms")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
            rows="4"
            placeholder="Terms and conditions..."
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
