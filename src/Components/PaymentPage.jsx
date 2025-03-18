import React, { useState } from "react";
import companyLogo from "../assets/logo1.jpg";
import paymentBanner from "../assets/large1.jpg";

function PaymentPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    amount: "99", // Default amount
    coupon: "" // Coupon code field
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    fullName: "",
    coupon: ""
  });

  // Valid Coupons & Discounts (Key: Coupon Code, Value: Discount Amount)
  const validCoupons = {
    "SAVE50": 50,  // ₹50 off
    "DISCOUNT10": 10, // ₹10 off
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email.includes("@")) {
      formErrors.email = "Please enter a valid email address.";
    }
    if (formData.phone.length < 10) {
      formErrors.phone = "Phone number must be at least 10 digits.";
    }
    if (formData.fullName.trim() === "") {
      formErrors.fullName = "Full name is required.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    let finalAmount = parseInt(formData.amount); // Convert amount to integer

    // Apply discount if a valid coupon is entered
    if (formData.coupon in validCoupons) {
      finalAmount -= validCoupons[formData.coupon]; // Reduce amount
      if (finalAmount < 0) finalAmount = 0; // Prevent negative prices
    }

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => initiatePayment(finalAmount);
      script.onerror = () => alert("Failed to load Razorpay. Please try again.");
      document.body.appendChild(script);
    } else {
      initiatePayment(finalAmount);
    }
  };

  const initiatePayment = (finalAmount) => {
    const options = {
      key: "rzp_test_IN0eM3HBLCrQub", // Replace with your Razorpay Key
      amount: finalAmount * 100, // Convert to paise
      currency: "INR",
      name: "ThinkEdge",
      description: "Sigma 5.0 | Complete Placement Prep",
      image: companyLogo,
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#0d2366",
      },
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      modal: {
        ondismiss: function () {
          alert("Payment was cancelled.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="space-y-5">
            <img src={companyLogo} alt="Company Logo" className="w-48 mb-3" />
            <h1 className="text-[#0d2366] text-3xl font-semibold">
              Sigma 5.0 | Complete Placement Prep
            </h1>
            <img src={paymentBanner} alt="Sigma 5.0 Banner" className="w-96 mb-4 border-2 border-white" />
            <img src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png" alt="Feature 1" className="w-96 mb-4" />
            <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Feature 2" className="w-96 mb-4" />
            <p className="font-bold">
              <strong>Sigma Oct'24 Batch</strong> | Data Structures & Algorithms + Web Development
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid gap-10">
            <div className="col-span-1 bg-gray-100 p-5 rounded-lg shadow-lg">
              <h5 className="text-[#0d2366] text-lg font-semibold">Payment Details</h5>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-semibold">Select Amount</label>
                  <select
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  >
                    <option value="99">₹99</option>
                    <option value="199">₹199</option>
                    <option value="299">₹299</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="coupon" className="block text-sm font-semibold">Coupon Code</label>
                  <input
                    type="text"
                    id="coupon"
                    value={formData.coupon}
                    onChange={handleChange}
                    placeholder="Enter coupon code (if any)"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Pay ₹{formData.amount - (validCoupons[formData.coupon] || 0)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
