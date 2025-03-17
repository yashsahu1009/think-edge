 import React, { useState } from "react";
import comapny from "../assets/logo1.jpg";
import payment from "../assets/large1.jpg";

function PaymentPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    fullName: "",
  });

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

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => initiatePayment();
      script.onerror = () => alert("Failed to load Razorpay. Please try again.");
      document.body.appendChild(script);
    } else {
      initiatePayment();
    }
  };

  const initiatePayment = () => {
    const options = {
      key: "rzp_test_IN0eM3HBLCrQub", // Replace with your Razorpay Key
      amount: 100, // 100 paise = ₹1

      currency: "INR",
      name: "ThinkEdge",
      description: "Sigma 5.0 | Complete Placement Prep",
      image: comapny,
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#0d2366",
      },
      handler: function (response) {
        console.log("Payment Successful!", response);
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
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
        {/* Course Details Section */}
        <div className="col-span-2">
          <div className="space-y-5">
            <img src={comapny} alt="Apna College Logo" className="w-48 mb-3" />
            <h1 className="text-[#0d2366] text-3xl font-semibold">
              Sigma 5.0 | Complete Placement Prep
            </h1>
            <img
              src={payment}
              alt="Sigma 5.0 Banner"
              className="w-96 mb-4 border-2 border-white"
            />
            <p className="font-bold">
              <strong>Sigma Oct'24 Batch</strong> | Data Structures & Algorithms + Web Development
            </p>
            <p className="italic">*with additional Quant & Aptitude resources.</p>
            <h5 className="text-[#0d2366] text-lg font-semibold mt-4">With this course, you will get:</h5>
            <ul className="list-disc ml-6 space-y-2">
              <li>Complete Java Language</li>
              <li>Complete Data Structures & Algorithms</li>
              <li>Live practice doubt classes for DSA</li>
              <li>Library of DSA Qs with Video Solutions of Top Companies</li>
              <li>Complete Frontend Development (HTML, CSS, JavaScript & frameworks like Bootstrap & Tailwind)</li>
              <li>Complete Backend Development (Node.js, Express.js)</li>
            </ul>

            <div className="mt-4">
              <h6 className="text-[#0d2366] text-lg">
                <i className="bi bi-person-lines-fill mr-2"></i> Contact Us:
              </h6>
              <p>
                <strong><i className="bi bi-envelope text-[#0d2366] mr-2"></i> Email:</strong> sigma@apnacollege.in
              </p>
              <p>
                <strong><i className="bi bi-telephone text-[#0d2366] mr-2"></i> Phone:</strong> 9999999999
              </p>
            </div>

            <div className="mt-3">
              <h6 className="text-[#0d2366] text-lg">Terms & Conditions:</h6>
              <p>You agree to share information entered on this page with Apna College (owner of this page) and Razorpay, adhering to applicable laws.</p>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg shadow-md mt-5 text-center">
      <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay Logo" className="max-h-12" />
      <p className="mt-3">
        Want to create a page like this for your Business? Visit 
        <a href="https://razorpay.com/payment-pages/" target="_blank" className="text-blue-500 hover:underline">
          Razorpay Payment Pages
        </a> 
        to get started!
      </p>
      <p>
        <i className="bi bi-flag mr-2"></i> 
        <a href="#" className="text-blue-500 hover:underline">Report Page</a>
      </p>
    </div>
          </div>
        </div>
        <div className="container mx-auto  ">
        <div className="grid   gap-10">
        {/* Payment Form Section */}
        <div className="col-span-1 bg-gray-100 p-5 rounded-lg shadow-lg">
          <h5 className="text-[#0d2366] text-lg font-semibold">Payment Details</h5>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold">Amount</label>
              <input
                type="text"
                id="amount"
                value="₹1.00"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              />
              <small className="text-gray-500">18% GST included, paid to the Government</small>
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
              {errors.email && <small className="text-red-500">{errors.email}</small>}
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
              {errors.phone && <small className="text-red-500">{errors.phone}</small>}
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
              {errors.fullName && <small className="text-red-500">{errors.fullName}</small>}
            </div>

            <button
              type="button"
              onClick={handlePayment}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Pay ₹1
            </button>
          </form>
          <div className="mt-5">
      <img
        src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png"
        alt="Payment Methods"
        className="w-full"
      />
    </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default PaymentPage;
