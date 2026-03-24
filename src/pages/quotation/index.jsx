import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase/config";
import { ref, set } from "firebase/database";
import DTLogo from "../../assets/DTLOGO.png";

const QuotationPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [quotationNumber, setQuotationNumber] = useState("");

  // Buyer Details
  const [buyerDetails, setBuyerDetails] = useState({
    companyName: "",
    address: "",
    gstin: "",
    contactPerson: "",
    phone: "",
    email: "",
  });

  // Quotation Details
  const [quotationDetails, setQuotationDetails] = useState({
    buyersRef: "",
    termsOfDelivery: "",
    destination: "",
    modeOfPayment: "",
    validityDays: "30",
  });

  // Line Items
  const [items, setItems] = useState([
    {
      id: 1,
      productType: "pole", // pole or sawn
      woodType: "sal",
      description: "",
      length: "",
      size: "", // midgirth for poles, dimensions for sawn
      quantity: "",
      unit: "NOS",
      rate: "",
      amount: 0,
      hsn: "4403",
    },
  ]);

  // Product options
  const woodTypes = [
    { value: "sal", label: "SAL" },
    { value: "eucalyptus", label: "EUCALYPTUS" },
    { value: "akashmoni", label: "AKASHMONI" },
  ];

  const productTypes = [
    { value: "pole", label: "Pole", hsn: "4403" },
    { value: "sawn", label: "Sawn Size", hsn: "4407" },
  ];

  // Generate quotation number on mount
  useEffect(() => {
    const generateQuotationNumber = () => {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
      return `DT/${year}${month}/${random}`;
    };
    setQuotationNumber(generateQuotationNumber());
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/contact");
    }
  }, [currentUser, navigate]);

  // Calculate cubic meter for sawn size
  const calculateCubicMeter = (lengthFt, widthInch, heightInch, quantity) => {
    if (!lengthFt || !widthInch || !heightInch || !quantity) return 0;
    // Convert to meters: 1ft = 0.3048m, 1inch = 0.0254m
    const lengthM = parseFloat(lengthFt) * 0.3048;
    const widthM = parseFloat(widthInch) * 0.0254;
    const heightM = parseFloat(heightInch) * 0.0254;
    const cubicM = lengthM * widthM * heightM * parseFloat(quantity);
    return cubicM.toFixed(4);
  };

  // Calculate item amount
  const calculateAmount = (item) => {
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;
    return qty * rate;
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + calculateAmount(item), 0);
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const total = subtotal + cgst + sgst;
    return { subtotal, cgst, sgst, total };
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Update HSN based on product type
    if (field === "productType") {
      newItems[index].hsn = value === "pole" ? "4403" : "4407";
      newItems[index].unit = value === "pole" ? "NOS" : "PCS";
    }

    // Calculate amount
    newItems[index].amount = calculateAmount(newItems[index]);

    setItems(newItems);
  };

  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        productType: "pole",
        woodType: "sal",
        description: "",
        length: "",
        size: "",
        quantity: "",
        unit: "NOS",
        rate: "",
        amount: 0,
        hsn: "4403",
      },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Generate description
  const generateDescription = (item) => {
    if (item.productType === "pole") {
      return `${item.woodType.toUpperCase()} POLE ${item.length}ft ${item.size} midgirth`;
    } else {
      return `EUC SAWN ${item.length}ft ${item.size}`;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const totals = calculateTotals();
      const quotationData = {
        quotationNumber,
        date: new Date().toISOString(),
        buyerDetails,
        quotationDetails,
        items: items.map((item) => ({
          ...item,
          description: generateDescription(item),
          amount: calculateAmount(item),
        })),
        subtotal: totals.subtotal,
        cgst: totals.cgst,
        sgst: totals.sgst,
        totalAmount: totals.total,
        createdBy: {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || "",
        },
        status: "pending",
      };

      const quotationRef = ref(database, `quotations/${quotationNumber.replace(/\//g, "-")}`);
      await set(quotationRef, quotationData);

      setFormSuccess("Quotation submitted successfully!");
      
      // Reset form after success
      setTimeout(() => {
        setFormSuccess("");
        // Generate new quotation number
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        setQuotationNumber(`DT/${year}${month}/${random}`);
      }, 3000);
    } catch (error) {
      console.error("Error submitting quotation:", error);
      setFormError(`Failed to submit quotation: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totals = calculateTotals();

  if (!currentUser) {
    return null;
  }

  return (
    <Layout page="Quotation">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50/30 to-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-400" />
            <span className="text-xs tracking-[0.4em] text-stone-500 uppercase">Request a Quote</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-400" />
          </div>
          <h1 className="text-center text-4xl md:text-5xl font-bold text-stone-800 mb-4 tracking-tight">
            Get a <span className="text-brand-green">Quotation</span>
          </h1>
          <p className="text-center text-stone-600 max-w-2xl mx-auto">
            Fill in your requirements and we'll prepare a detailed quotation for you.
          </p>
        </div>
      </section>

      {/* Quotation Form */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <form onSubmit={handleSubmit}>
            {/* Quotation Document */}
            <div className="bg-white border-2 border-stone-300 shadow-xl rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-white px-6 py-4">
                <div className="flex items-center justify-center">
                  <h2 className="text-xl font-bold tracking-widest">QUOTATION</h2>
                </div>
              </div>

              {/* Company Info & Quotation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-stone-300">
                {/* Left - Company Info */}
                <div className="p-6 border-b md:border-b-0 md:border-r border-stone-300">
                  <div className="flex items-start gap-4">
                    <img src={DTLogo} alt="DT Logo" className="w-16 h-16 object-contain" />
                    <div>
                      <h3 className="font-bold text-lg text-stone-800">Dibyendu Tewary</h3>
                      <p className="text-sm text-stone-600">Timber Merchant</p>
                      <p className="text-xs text-stone-500 mt-1">
                        Church Rd, Chandrakona Road, Sarbera<br />
                        West Midnapore, West Bengal - 721253
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        Phone: +91-7001026851<br />
                        Email: admin@dtewary.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right - Quotation Info */}
                <div className="p-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
                        Quotation No.
                      </label>
                      <div className="px-3 py-2 bg-stone-100 rounded text-stone-800 font-mono font-bold">
                        {quotationNumber}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
                        Date
                      </label>
                      <div className="px-3 py-2 bg-stone-100 rounded text-stone-800">
                        {new Date().toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
                        Buyer's Ref
                      </label>
                      <input
                        type="text"
                        value={quotationDetails.buyersRef}
                        onChange={(e) => setQuotationDetails({ ...quotationDetails, buyersRef: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm"
                        placeholder="Reference No."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
                        Mode of Payment
                      </label>
                      <select
                        value={quotationDetails.modeOfPayment}
                        onChange={(e) => setQuotationDetails({ ...quotationDetails, modeOfPayment: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm"
                      >
                        <option value="">Select</option>
                        <option value="advance">Advance</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="credit">Credit (30 Days)</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer Details */}
              <div className="p-6 border-b-2 border-stone-300 bg-stone-50">
                <h4 className="text-sm font-bold text-stone-700 uppercase mb-4">Invoice To / Buyer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={buyerDetails.companyName}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white"
                      placeholder="Company / Firm Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">GSTIN</label>
                    <input
                      type="text"
                      value={buyerDetails.gstin}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, gstin: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white font-mono"
                      placeholder="22AAAAA0000A1Z5"
                      maxLength={15}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Address *</label>
                    <textarea
                      required
                      value={buyerDetails.address}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, address: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white resize-none"
                      rows={2}
                      placeholder="Full Address"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={buyerDetails.contactPerson}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white"
                      placeholder="Contact Person Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={buyerDetails.phone}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={buyerDetails.email}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, email: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Destination</label>
                    <input
                      type="text"
                      value={quotationDetails.destination}
                      onChange={(e) => setQuotationDetails({ ...quotationDetails, destination: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm bg-white"
                      placeholder="Delivery Location"
                    />
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-800 text-white">
                    <tr>
                      <th className="px-3 py-3 text-left w-10">S.No</th>
                      <th className="px-3 py-3 text-left">Product Type</th>
                      <th className="px-3 py-3 text-left">Wood Type</th>
                      <th className="px-3 py-3 text-left">Length (ft)</th>
                      <th className="px-3 py-3 text-left">Size</th>
                      <th className="px-3 py-3 text-right">Qty</th>
                      <th className="px-3 py-3 text-center">Unit</th>
                      <th className="px-3 py-3 text-right">Rate (₹)</th>
                      <th className="px-3 py-3 text-center">HSN</th>
                      <th className="px-3 py-3 text-right">Amount (₹)</th>
                      <th className="px-3 py-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-b border-stone-200 hover:bg-stone-50">
                        <td className="px-3 py-2 text-stone-600">{index + 1}</td>
                        <td className="px-3 py-2">
                          <select
                            value={item.productType}
                            onChange={(e) => handleItemChange(index, "productType", e.target.value)}
                            className="w-full px-2 py-1.5 border border-stone-300 rounded text-sm focus:border-brand-green outline-none"
                          >
                            {productTypes.map((pt) => (
                              <option key={pt.value} value={pt.value}>{pt.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={item.woodType}
                            onChange={(e) => handleItemChange(index, "woodType", e.target.value)}
                            className="w-full px-2 py-1.5 border border-stone-300 rounded text-sm focus:border-brand-green outline-none"
                          >
                            {woodTypes.map((wt) => (
                              <option key={wt.value} value={wt.value}>{wt.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={item.length}
                            onChange={(e) => handleItemChange(index, "length", e.target.value)}
                            className="w-20 px-2 py-1.5 border border-stone-300 rounded text-sm focus:border-brand-green outline-none"
                            placeholder="12"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={item.size}
                            onChange={(e) => handleItemChange(index, "size", e.target.value)}
                            className="w-28 px-2 py-1.5 border border-stone-300 rounded text-sm focus:border-brand-green outline-none"
                            placeholder={item.productType === "pole" ? "31-40cm" : "3inX2in"}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                            className="w-20 px-2 py-1.5 border border-stone-300 rounded text-sm text-right focus:border-brand-green outline-none"
                            placeholder="100"
                          />
                        </td>
                        <td className="px-3 py-2 text-center text-stone-600">{item.unit}</td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                            className="w-24 px-2 py-1.5 border border-stone-300 rounded text-sm text-right focus:border-brand-green outline-none"
                            placeholder="500"
                          />
                        </td>
                        <td className="px-3 py-2 text-center text-stone-600 font-mono">{item.hsn}</td>
                        <td className="px-3 py-2 text-right font-semibold text-stone-800">
                          ₹{calculateAmount(item).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2">
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Item Button */}
              <div className="px-6 py-3 border-b border-stone-200">
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 text-brand-green hover:text-emerald-700 font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Item
                </button>
              </div>

              {/* Totals */}
              <div className="flex justify-end p-6 bg-stone-50">
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Subtotal:</span>
                    <span className="font-semibold">₹{totals.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">CGST @ 9%:</span>
                    <span>₹{totals.cgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">SGST @ 9%:</span>
                    <span>₹{totals.sgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-stone-300 pt-2">
                    <span className="text-stone-600">Total GST @ 18%:</span>
                    <span>₹{(totals.cgst + totals.sgst).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t-2 border-stone-800 pt-2">
                    <span>Grand Total:</span>
                    <span className="text-brand-green">₹{totals.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Terms & Notes */}
              <div className="p-6 border-t border-stone-200 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Terms of Delivery</label>
                    <textarea
                      value={quotationDetails.termsOfDelivery}
                      onChange={(e) => setQuotationDetails({ ...quotationDetails, termsOfDelivery: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm resize-none"
                      rows={3}
                      placeholder="Ex-Godown / Delivered at Site / FOB etc."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Validity</label>
                    <select
                      value={quotationDetails.validityDays}
                      onChange={(e) => setQuotationDetails({ ...quotationDetails, validityDays: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-brand-green outline-none text-sm"
                    >
                      <option value="7">7 Days</option>
                      <option value="15">15 Days</option>
                      <option value="30">30 Days</option>
                      <option value="45">45 Days</option>
                      <option value="60">60 Days</option>
                    </select>
                    <p className="text-xs text-stone-500 mt-2">
                      This quotation is valid for {quotationDetails.validityDays} days from the date of issue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t-2 border-stone-300 bg-stone-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="text-xs text-stone-500">
                    <p>E. & O.E.</p>
                    <p className="mt-1">Subject to West Midnapore Jurisdiction</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-stone-800">For Dibyendu Tewary</p>
                    <p className="text-xs text-stone-500 mt-4">Authorized Signatory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-8">
              {formSuccess && (
                <div className="mb-4 p-4 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-xl flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>{formSuccess}</span>
                </div>
              )}
              {formError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-stone-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-brand-green to-emerald-600 hover:from-emerald-600 hover:to-brand-green shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Quotation...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit Quotation Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default QuotationPage;
