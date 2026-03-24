import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase/config";
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";
import DTLogo from "../../assets/DTLOGO.png";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const QuotationPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [quotationNumber, setQuotationNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [previousQuotations, setPreviousQuotations] = useState([]);
  const [loadingQuotations, setLoadingQuotations] = useState(true);
  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'history'

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
      rateType: "ask", // 'ask' for asking price, 'provide' for providing own rate
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

  // Set user email from logged in user
  useEffect(() => {
    if (currentUser?.email) {
      setUserEmail(currentUser.email);
    }
  }, [currentUser]);

  // Fetch previous quotations
  const fetchPreviousQuotations = useCallback(async () => {
    if (!currentUser) return;
    setLoadingQuotations(true);
    try {
      const quotationsRef = ref(database, "quotations");
      const snapshot = await get(quotationsRef);
      if (snapshot.exists()) {
        const allQuotations = snapshot.val();
        const userQuotations = Object.values(allQuotations).filter(
          (q) => q.createdBy?.uid === currentUser.uid
        );
        // Sort by date descending
        userQuotations.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPreviousQuotations(userQuotations);
      }
    } catch (error) {
      console.error("Error fetching quotations:", error);
    } finally {
      setLoadingQuotations(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchPreviousQuotations();
  }, [fetchPreviousQuotations]);

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
        rateType: "ask",
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
          email: userEmail, // Use editable email field
          name: currentUser.displayName || "",
        },
        status: "pending",
      };

      const quotationRef = ref(database, `quotations/${quotationNumber.replace(/\//g, "-")}`);
      await set(quotationRef, quotationData);

      setFormSuccess("Quotation submitted successfully!");

      // Refresh quotations list
      fetchPreviousQuotations();

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

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return { label: "Accepted", className: "bg-green-100 text-green-800 border-green-200" };
      case "declined":
        return { label: "Not Proceeded", className: "bg-amber-100 text-amber-800 border-amber-200" };
      case "pending":
      default:
        return { label: "Under Review", className: "bg-blue-100 text-blue-800 border-blue-200" };
    }
  };

  // Format currency for PDF (avoid unicode issues)
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "Rs. 0.00";
    return `Rs. ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Generate PDF for quotation
  const generatePDF = (quotation) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const downloadDateTime = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Header
    doc.setFillColor(41, 37, 36); // stone-800
    doc.rect(0, 0, pageWidth, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("QUOTATION", pageWidth / 2, 16, { align: "center" });

    // Company Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Dibyendu Tewary", 14, 38);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Timber Merchant", 14, 44);
    doc.setFontSize(8);
    doc.text("Church Rd, Chandrakona Road, Sarbera", 14, 50);
    doc.text("West Midnapore, West Bengal - 721253", 14, 55);
    doc.text("Phone: +91-9933749960, +91-7001026851", 14, 60);
    doc.text("Email: admin@dtewary.com", 14, 65);

    // Quotation Details
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Quotation No: ${quotation.quotationNumber}`, pageWidth - 14, 38, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date(quotation.date).toLocaleDateString("en-IN")}`, pageWidth - 14, 44, { align: "right" });
    if (quotation.quotationDetails?.modeOfPayment) {
      doc.text(`Payment: ${quotation.quotationDetails.modeOfPayment}`, pageWidth - 14, 50, { align: "right" });
    }

    // Buyer Details
    doc.setFillColor(245, 245, 244); // stone-100
    doc.rect(14, 72, pageWidth - 28, 28, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE TO:", 18, 80);
    doc.setFont("helvetica", "normal");
    doc.text(quotation.buyerDetails?.companyName || "", 18, 86);
    doc.text(quotation.buyerDetails?.address || "", 18, 92);
    if (quotation.buyerDetails?.gstin) {
      doc.text(`GSTIN: ${quotation.buyerDetails.gstin}`, 18, 98);
    }
    doc.text(`Contact: ${quotation.buyerDetails?.contactPerson || ""} | ${quotation.buyerDetails?.phone || ""}`, pageWidth / 2, 86);

    // Items Table
    const tableData = quotation.items?.map((item, index) => [
      index + 1,
      item.description || `${item.woodType?.toUpperCase()} ${item.productType?.toUpperCase()} ${item.length}ft ${item.size}`,
      item.hsn,
      item.quantity,
      item.unit,
      item.rateType === "ask" ? "Request Quote" : formatCurrency(item.rate),
      item.rateType === "ask" ? "-" : formatCurrency(item.amount),
    ]) || [];

    autoTable(doc, {
      startY: 108,
      head: [["S.No", "Description", "HSN", "Qty", "Unit", "Rate", "Amount"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [41, 37, 36], textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 60 },
        2: { cellWidth: 18 },
        3: { cellWidth: 18 },
        4: { cellWidth: 15 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
      },
    });

    // Totals - positioned better
    const finalY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : 150;
    const hasRates = quotation.items?.some(item => item.rateType !== "ask");
    const totalsX = pageWidth - 60; // Position totals section better

    if (hasRates && quotation.subtotal > 0) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      // Draw totals box
      doc.setDrawColor(200, 200, 200);
      doc.rect(totalsX - 10, finalY - 5, 65, 40);

      doc.text("Subtotal:", totalsX, finalY);
      doc.text(formatCurrency(quotation.subtotal), pageWidth - 18, finalY, { align: "right" });

      doc.text("CGST @ 9%:", totalsX, finalY + 7);
      doc.text(formatCurrency(quotation.cgst), pageWidth - 18, finalY + 7, { align: "right" });

      doc.text("SGST @ 9%:", totalsX, finalY + 14);
      doc.text(formatCurrency(quotation.sgst), pageWidth - 18, finalY + 14, { align: "right" });

      // Separator line
      doc.setLineWidth(0.5);
      doc.line(totalsX - 5, finalY + 19, pageWidth - 14, finalY + 19);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Grand Total:", totalsX, finalY + 28);
      doc.text(formatCurrency(quotation.totalAmount), pageWidth - 18, finalY + 28, { align: "right" });
    }

    // Footer
    const footerY = 270;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("E. & O.E. | Subject to West Midnapore Jurisdiction", 14, footerY);

    // Computer generated notice with date/time
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(`This is a computer generated quotation. Downloaded on: ${downloadDateTime}`, 14, footerY + 8);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("For Dibyendu Tewary", pageWidth - 14, footerY - 10, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Authorized Signatory", pageWidth - 14, footerY - 4, { align: "right" });

    // Save
    doc.save(`Quotation_${quotation.quotationNumber?.replace(/\//g, "-")}.pdf`);
  };

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

      {/* Tabs */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("new")}
              className={`px-6 py-4 font-medium text-sm transition-colors relative ${activeTab === "new"
                ? "text-brand-green"
                : "text-stone-500 hover:text-stone-700"
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Quotation
              </span>
              {activeTab === "new" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-6 py-4 font-medium text-sm transition-colors relative ${activeTab === "history"
                ? "text-brand-green"
                : "text-stone-500 hover:text-stone-700"
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Quotations
                {previousQuotations.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-stone-200 text-stone-600 rounded-full">
                    {previousQuotations.length}
                  </span>
                )}
              </span>
              {activeTab === "history" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Quotation Form */}
      {activeTab === "new" && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* User Email Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-blue-800 font-medium">Logged in as:</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 px-3 py-1.5 text-sm bg-white border border-blue-200 rounded-lg text-stone-700">
                      {currentUser?.email || "Not logged in"}
                    </div>
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

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
                        <th className="px-2 py-3 text-left w-8">S.No</th>
                        <th className="px-2 py-3 text-left">Product</th>
                        <th className="px-2 py-3 text-left">Wood</th>
                        <th className="px-2 py-3 text-left">Length</th>
                        <th className="px-2 py-3 text-left">Size</th>
                        <th className="px-2 py-3 text-right">Qty</th>
                        <th className="px-2 py-3 text-center">Unit</th>
                        <th className="px-2 py-3 text-center">Pricing</th>
                        <th className="px-2 py-3 text-right">Rate (₹)</th>
                        <th className="px-2 py-3 text-center">HSN</th>
                        <th className="px-2 py-3 text-right">Amount</th>
                        <th className="px-2 py-3 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-stone-200 hover:bg-stone-50">
                          <td className="px-2 py-2 text-stone-600">{index + 1}</td>
                          <td className="px-2 py-2">
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
                          <td className="px-2 py-2">
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
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              value={item.length}
                              onChange={(e) => handleItemChange(index, "length", e.target.value)}
                              className="w-16 px-2 py-1.5 border border-stone-300 rounded text-sm focus:border-brand-green outline-none"
                              placeholder="12"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="text"
                              value={item.size}
                              onChange={(e) => handleItemChange(index, "size", e.target.value)}
                              className="w-24 px-2 py-1.5 border border-stone-300 rounded text-sm focus:border-brand-green outline-none"
                              placeholder={item.productType === "pole" ? "31-40cm" : "3inX2in"}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                              className="w-16 px-2 py-1.5 border border-stone-300 rounded text-sm text-right focus:border-brand-green outline-none"
                              placeholder="100"
                            />
                          </td>
                          <td className="px-2 py-2 text-center text-stone-600 text-xs">{item.unit}</td>
                          <td className="px-2 py-2">
                            <select
                              value={item.rateType}
                              onChange={(e) => handleItemChange(index, "rateType", e.target.value)}
                              className={`w-full px-2 py-1.5 border rounded text-xs focus:border-brand-green outline-none ${item.rateType === "ask"
                                ? "border-amber-300 bg-amber-50 text-amber-700"
                                : "border-stone-300 bg-white text-stone-700"
                                }`}
                            >
                              <option value="ask">Ask Price</option>
                              <option value="provide">My Rate</option>
                            </select>
                          </td>
                          <td className="px-2 py-2">
                            {item.rateType === "ask" ? (
                              <div className="w-20 px-2 py-1.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-600 text-center">
                                Requested
                              </div>
                            ) : (
                              <input
                                type="number"
                                value={item.rate}
                                onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                                className="w-20 px-2 py-1.5 border border-stone-300 rounded text-sm text-right focus:border-brand-green outline-none"
                                placeholder="500"
                              />
                            )}
                          </td>
                          <td className="px-2 py-2 text-center text-stone-600 font-mono text-xs">{item.hsn}</td>
                          <td className="px-2 py-2 text-right font-semibold text-stone-800 text-xs">
                            {item.rateType === "ask" ? (
                              <span className="text-amber-600">TBD</span>
                            ) : (
                              `₹${calculateAmount(item).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                            )}
                          </td>
                          <td className="px-2 py-2">
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

                {/* Pricing Note */}
                <div className="px-6 py-3 bg-amber-50 border-b border-amber-200">
                  <p className="text-xs text-amber-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Ask Price:</strong> We'll provide our best quote. <strong>My Rate:</strong> Enter your preferred rate for negotiation.</span>
                  </p>
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
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting
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
      )}

      {/* Previous Quotations History */}
      {activeTab === "history" && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white border-2 border-stone-300 shadow-xl rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold tracking-wide">My Quotation History</h2>
                  <span className="text-sm text-stone-300">{previousQuotations.length} quotation(s)</span>
                </div>
              </div>

              {/* Loading State */}
              {loadingQuotations ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-2 border-stone-300 border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-stone-500">Loading your quotations...</p>
                </div>
              ) : previousQuotations.length === 0 ? (
                <div className="p-12 text-center">
                  <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-stone-500 mb-4">You haven't submitted any quotations yet.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("new")}
                    className="px-6 py-2 bg-brand-green text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                  >
                    Create Your First Quotation
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-stone-100 border-b border-stone-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-stone-600">Quotation No.</th>
                        <th className="px-4 py-3 text-left font-semibold text-stone-600">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-stone-600">Company</th>
                        <th className="px-4 py-3 text-left font-semibold text-stone-600">Items</th>
                        <th className="px-4 py-3 text-right font-semibold text-stone-600">Amount</th>
                        <th className="px-4 py-3 text-center font-semibold text-stone-600">Status</th>
                        <th className="px-4 py-3 text-center font-semibold text-stone-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousQuotations.map((quotation) => {
                        const statusBadge = getStatusBadge(quotation.status);
                        return (
                          <tr key={quotation.quotationNumber} className="border-b border-stone-100 hover:bg-stone-50">
                            <td className="px-4 py-4 font-mono font-semibold text-stone-800">
                              {quotation.quotationNumber}
                            </td>
                            <td className="px-4 py-4 text-stone-600">
                              {new Date(quotation.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-4">
                              <div className="font-medium text-stone-800">{quotation.buyerDetails?.companyName || "-"}</div>
                              <div className="text-xs text-stone-500">{quotation.buyerDetails?.contactPerson || ""}</div>
                            </td>
                            <td className="px-4 py-4 text-stone-600">
                              {quotation.items?.length || 0} item(s)
                            </td>
                            <td className="px-4 py-4 text-right">
                              {quotation.totalAmount > 0 ? (
                                <span className="font-semibold text-stone-800">
                                  ₹{quotation.totalAmount?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </span>
                              ) : (
                                <span className="text-stone-400 text-xs">Price Requested</span>
                              )}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${statusBadge.className}`}>
                                {statusBadge.label}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                type="button"
                                onClick={() => generatePDF(quotation)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-green hover:text-emerald-700 hover:bg-brand-green/10 rounded-lg transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default QuotationPage;
