import React, { useState, useEffect } from "react";
import companyLogo from "../assets/logo1.jpg";
import paymentBanner from "../assets/large1.jpg";
import { useNavigate } from "react-router-dom";
import load from "../assets/successful-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--complete-done-success-tick-pulsing-circle-status-pack-user-interface-icons-8403662-vmake-vmake (online-video-cutter.com).mp4"

function PaymentPage() {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [courseId, setCourseId] = useState(null);
  const [amount, setAmount] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedCourseId = localStorage.getItem("selectedCourseId");
    const storedAmount = localStorage.getItem("selectedCourseAmount");
    if (storedCourseId) setCourseId(storedCourseId);
    if (storedAmount) setAmount(storedAmount);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email.includes("@")) {
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
      amount: amount * 100,
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
        console.log("Payment Success:", response);

        const transactionData = {
          email: formData.email,
          mobile: formData.mobile,
          name: formData.name,
          amount: amount,
          courseId: courseId,
        };

        const token = localStorage.getItem("authToken");

        try {
          const res = await fetch("http://192.168.246.11:8081/api/createTranscation", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
          });

          const data = await res.json();
          if (res.ok) {
            setShowModal(true);
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

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Course Details Section */}
        <div className="col-span-2">
          <div className="space-y-5">
            <img src={companyLogo} alt="Company Logo" className="w-48 mb-3" />
            <h1 className="text-[#0d2366] text-3xl font-semibold">
              Sigma 5.0 | Complete Placement Prep
            </h1>
            <img src={paymentBanner} alt="Sigma 5.0 Banner" className="w-96 mb-4 border-2 border-white" />
            <p className="font-bold">
              <strong>Sigma Oct'24 Batch</strong> | Data Structures & Algorithms + Web Development
            </p>
            <h5 className="text-[#0d2366] text-lg font-semibold mt-4">With this course, you will get:</h5>
            <ul className="list-disc ml-6 space-y-2">
              <li>Complete Java Language</li>
              <li>Complete Data Structures & Algorithms</li>
              <li>Live practice doubt classes for DSA</li>
              <li>Library of DSA Qs with Video Solutions of Top Companies</li>
              <li>Complete Frontend Development (HTML, CSS, JavaScript & frameworks like Bootstrap & Tailwind)</li>
              <li>Complete Backend Development (Node.js, Express.js)</li>
            </ul>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="container mx-auto">
          <div className="grid gap-10">
            <div className="col-span-1 bg-gray-100 p-5 rounded-lg shadow-lg">
              <h5 className="text-[#0d2366] text-lg font-semibold">Payment Details</h5>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold">Amount</label>
                  <input
                    type="text"
                    value={`₹${amount || "0"}`}
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
                  <label htmlFor="mobile" className="block text-sm font-semibold">Phone</label>
                  <input
                    type="text"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                  {errors.mobile && <small className="text-red-500">{errors.mobile}</small>}
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                  {errors.name && <small className="text-red-500">{errors.name}</small>}
                </div>

                <button onClick={handlePayment} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Pay ₹{amount || "0"}
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
       <p>Thank you for your payment. Your transaction has been recorded.</p>
       <button 
         onClick={() => navigate("/")} 
         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
       >
         Go to Dashboard
       </button>
     </div>
   </div>
 )}


  

    </div>
  );
}

export default PaymentPage;
