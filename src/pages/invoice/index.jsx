import React, { useState } from "react";
import Footer from "../../components/shared/Footer";
import { Dialog } from "../../components/ui";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    companyDetails: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    clientDetails: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    items: [
      {
        id: 1,
        description: "",
        quantity: 1,
        price: 0,
      },
    ],
    notes: "",
    terms: "Payment is due within 30 days",
    taxRate: 18,
    currency: "₹",
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleInputChange = (e, section, field) => {
    const { value } = e.target;

    if (section) {
      setInvoiceData({
        ...invoiceData,
        [section]: {
          ...invoiceData[section],
          [field]: value,
        },
      });
    } else {
      setInvoiceData({
        ...invoiceData,
        [field]: value,
      });
    }
  };

  const handleItemChange = (id, field, value) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addItem = () => {
    const newItem = {
      id: invoiceData.items.length + 1,
      description: "",
      quantity: 1,
      price: 0,
    };

    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const removeItem = (id) => {
    if (invoiceData.items.length === 1) return;

    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((item) => item.id !== id),
    });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const calculateTax = () => {
    return (calculateSubtotal() * invoiceData.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    const element = document.getElementById("invoice-preview");
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${invoiceData.invoiceNumber || "Draft"}.pdf`);
    setIsGeneratingPDF(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-green-100 to-brand-green">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white shadow-mild py-4 px-6 ">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl os-semibold text-brand-blackLight">
              <img
                src="https://dtewary-dev-storage.innoida.utho.io/logo/dtewary-logo.png"
                alt="Logo"
                className="w-10 h-auto drop-shadow-lg"
              />
              Invoice Maker
              <p className="text-sm italic font-normal">Dtewary Open Source</p>
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-mild p-6 mb-8">
          <InvoiceForm
            invoiceData={invoiceData}
            handleInputChange={handleInputChange}
            handleItemChange={handleItemChange}
            addItem={addItem}
            removeItem={removeItem}
            calculateSubtotal={calculateSubtotal}
            calculateTax={calculateTax}
            calculateTotal={calculateTotal}
          />

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-brand-blueLight text-brand-blue border border-brand-blue rounded-md hover:bg-brand-blue hover:text-white transition-colors"
              onClick={() => setShowPreview(true)}
            >
              Preview Invoice
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title="Invoice Preview"
        size="lg"
      >
        <div className="p-4 flex flex-col h-full">
          <div
            id="invoice-preview"
            className="overflow-y-auto max-h-[70vh] mb-4"
          >
            <InvoicePreview
              invoiceData={invoiceData}
              calculateSubtotal={calculateSubtotal}
              calculateTax={calculateTax}
              calculateTotal={calculateTotal}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-auto">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-brand-green text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
              onClick={generatePDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    alt="Loading icon"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                "Download PDF"
              )}
            </button>
          </div>
        </div>
      </Dialog>
      <Footer />
    </div>
  );
};

export default InvoicePage;
