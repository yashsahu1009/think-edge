 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import companyLogo from "../assets/logo1.jpg";
import paymentBanner from "../assets/large1.jpg";
import load from "../assets/successful-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--complete-done-success-tick-pulsing-circle-status-pack-user-interface-icons-8403662-vmake-vmake (online-video-cutter.com).mp4";

function PaymentPage() {
  const [formData, setFormData] = useState({ email: "", mobile: "", name: "" });
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({ id: null, amount: 0, title: "", image: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCourse({
      id: localStorage.getItem("selectedCourseId"),
      amount: parseInt(localStorage.getItem("selectedCourseAmount"), 10) || 0,
      title: localStorage.getItem("selectedCourseTitle"),
      image: localStorage.getItem("selectedCourseImage") || paymentBanner,
      description: localStorage.getItem("selectedCourseDescription"),
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.email.includes("@")) formErrors.email = "Enter a valid email.";
    if (!/^[0-9]{10}$/.test(formData.mobile)) formErrors.mobile = "Enter a valid 10-digit phone number.";
    if (!formData.name.trim()) formErrors.name = "Full name is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const generateInvoice = (transactionData) => {
    const { name, email, mobile, amount, courseId, courseTitle } = transactionData;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("ThinkEdge Payment Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Mobile: ${mobile}`, 20, 60);
    doc.text(`Course: ${courseTitle}`, 20, 70);
    doc.text(`Course ID: ${courseId}`, 20, 80);
    doc.text(`Amount Paid: ₹${amount}`, 20, 90);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 100);
    doc.save("Payment_Invoice.pdf");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!course.id) return alert("Error: No course selected.");

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) return alert("Failed to load Razorpay.");

    const options = {
      key: "rzp_test_IN0eM3HBLCrQub",
      amount: course.amount * 100,
      currency: "INR",
      name: "ThinkEdge",
      description: "Course Payment",
      image: companyLogo,
      prefill: formData,
      theme: { color: "#0d2366" },
      handler: async (response) => {
        setShowModal(true);
        const token = localStorage.getItem("authToken");
        const transactionData = {
          ...formData,
          amount: course.amount,
          courseId: course.id,
          courseTitle: course.title,
          transactionId: response.razorpay_payment_id,
        };

        try {
          const res = await fetch("http://192.168.29.224:8081/api/createTransaction", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
          });
          if (!res.ok) throw new Error("Transaction failed.");
          generateInvoice(transactionData);
        } catch (error) {
          console.error("Error recording transaction:", error);
        }
      },
    };
    new window.Razorpay(options).open();
  };

  return (
    
    <div className="container mx-auto py-10">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
    <div className="col-span-2">
      <div className="space-y-5">
        <img src={companyLogo} alt="Company Logo" className="w-48 mb-3" />
        <h2 className="text-2xl font-semibold text-gray-900">{course.title}</h2>
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <img src={course.image} alt="Course" className="w-full h-60 object-cover rounded-md mb-4" />
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
      </div>
    </div>
    <div className="container mx-auto">
      <div className="grid gap-10">
        <div className="col-span-1 bg-gray-100 p-5 rounded-lg shadow-lg">
          <h5 className="text-[#0d2366] text-lg font-semibold">Payment Details</h5>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Amount</label>
              <input type="text" value={`₹${course.amount}`} readOnly className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
              <small className="text-gray-500">18% GST included, paid to the Government</small>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
              {errors.email && <small className="text-red-500">{errors.email}</small>}
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold">Phone</label>
              <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your phone" className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
              {errors.mobile && <small className="text-red-500">{errors.mobile}</small>}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">Full Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
              {errors.name && <small className="text-red-500">{errors.name}</small>}
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Pay ₹{course.amount}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <video autoPlay loop className="w-32 mx-auto">
          <source src={load} type="video/mp4" />
        </video>
        <h2 className="text-lg font-semibold mt-4">Payment Successful!</h2>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Dashboard</button>
      </div>
    </div>
  )}
</div>
  );
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  
}

export default PaymentPage;
