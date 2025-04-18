 // PaymentPage.jsx

import React, { useState, useEffect } from "react";
import companyLogo from "../assets/logo1.jpg";
import paymentBanner from "../assets/large1.jpg";
import { useNavigate } from "react-router-dom";
import load from "../assets/successful-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--complete-done-success-tick-pulsing-circle-status-pack-user-interface-icons-8403662-vmake-vmake (online-video-cutter.com).mp4";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentPage() {
  const [formData, setFormData] = useState({ email: "", mobile: "", name: "" });
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    amount: 0,
    title: "",
    image: "",
    description: "",
  });
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
    let formErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      formErrors.mobile = "Phone number must be exactly 10 digits.";
    }
    if (formData.name.trim() === "") {
      formErrors.name = "Full name is required.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }
    });
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_IN0eM3HBLCrQub",
      amount: course.amount * 100,
      currency: "INR",
      name: "ThinkEdge",
      description: "Course Payment",
      image: companyLogo,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      theme: { color: "#0d2366" },
      handler: async (response) => {
        const transactionData = {
          email: formData.email,
          mobile: formData.mobile,
          name: formData.name,
          amount: course.amount,
          courseId: course.id,
        };

        const token = localStorage.getItem("authToken");

        try {
          const res = await fetch(
            "http://thinkedge.ap-south-1.elasticbeanstalk.com/api/createTranscation",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(transactionData),
            }
          );

          const data = await res.json();
          if (res.ok) {
            setShowModal(true);
            toast.success("Payment Successful!");
            setTimeout(generatePDF, 300); // Delay to ensure DOM update
          } else {
            alert(`Transaction failed: ${data.message}`);
          }
        } catch (error) {
          console.error("Error recording transaction:", error);
          alert("Payment successful, but failed to record transaction.");
        }
      },
      modal: {
        ondismiss: () => alert("Payment was cancelled."),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generatePDF = () => {
    const input = document.getElementById("bill-template");
    if (!input) return;

    input.style.display = "block";
    input.style.position = "relative";

    setTimeout(() => {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, imgHeight);
        pdf.save(`ThinkEdge_Receipt_${Date.now()}.pdf`);

        input.style.display = "none";
      });
    }, 200);
  };

  return (
    <div className="container mx-auto py-10">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-2 space-y-5">
          <img src={companyLogo} alt="Company Logo" className="w-48 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-900">{course.title}</h2>
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <img src={course.image} alt="Course" className="w-full h-60 object-cover rounded-md mb-4" />
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid gap-10">
            <div className="col-span-1 bg-gray-100 p-5 rounded-lg shadow-lg">
              <h5 className="text-[#0d2366] text-lg font-semibold">Payment Details</h5>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold">Amount</label>
                  <input type="text" value={`₹${course.amount || "0"}`} readOnly className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
                  <small className="text-gray-500">18% GST included</small>
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
                <button onClick={handlePayment} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Pay ₹{course.amount || "0"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <video autoPlay loop className="w-32 mx-auto">
              <source src={load} type="video/mp4" />
            </video>
            <h2 className="text-lg font-semibold mt-4">Payment Successful!</h2>
            <p>Thank you for your payment. Your transaction has been recorded.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button onClick={generatePDF} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Download Bill</button>
              <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Bill Template for PDF */}
      <div
        id="bill-template"
        className="bg-white p-6 w-[50%] text-sm text-black border border-gray-300 shadow-lg rounded-lg"
        style={{ display: "none", position: "absolute", top: "-9999px", left: "-9999px" }}
      >
        <div className="text-center mb-6">
          <img src={companyLogo} alt="Company Logo" className="w-24 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-blue-600">ThinkEdge Course Receipt</h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
            <p><strong>Course:</strong> {course.title}</p>
            <p><strong>Amount Paid:</strong> ₹{course.amount}</p>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.mobile}</p>
        </div>

        <div className="mt-6 border-t border-gray-300 pt-4">
          <p className="text-center text-xs text-gray-500">Thank you for choosing ThinkEdge!</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
