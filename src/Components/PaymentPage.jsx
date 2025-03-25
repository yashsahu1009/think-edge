import React, { useState, useEffect } from "react";
import companyLogo from "../assets/logo1.jpg";
import { useNavigate } from "react-router-dom";
import loadAnimation from "../assets/successful-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--complete-done-success-tick-pulsing-circle-status-pack-user-interface-icons-8403662-vmake-vmake (online-video-cutter.com).mp4";

function PaymentPage() {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [courseId, setCourseId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Load course details from localStorage
  useEffect(() => {
    setCourseId(localStorage.getItem("selectedCourseId"));
    setAmount(localStorage.getItem("selectedCourseAmount"));
    setCourseTitle(localStorage.getItem("selectedCourseTitle"));
    setCourseImage(localStorage.getItem("selectedCourseImage"));
    setCourseDescription(localStorage.getItem("selectedCourseDescription"));
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

  const handlePayment = async (e) => {
    e.preventDefault();
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
          const res = await fetch("http://192.168.29.223:8081/api/createTransaction", {
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
            <h2 className="text-2xl font-semibold text-gray-900">{courseTitle}</h2>

            <div className="bg-white p-6 rounded-lg   max-w-md w-full">
              {courseImage && <img src={courseImage} alt={courseTitle} className="w-full h-60 object-cover rounded-md mb-4" />}
             
             
             
               
              <p className="text-gray-600 mt-2">{courseDescription}</p>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="container mx-auto">
          <div className="grid gap-10">
            <div className="col-span-1 bg-gray-100 p-5 rounded-lg shadow-lg">
              <h5 className="text-[#0d2366] text-lg font-semibold">Payment Details</h5>
              <form onSubmit={handlePayment} className="space-y-4">
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

                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
              <source src={loadAnimation} type="video/mp4" />
            </video>
            <h2 className="text-lg font-semibold mt-4">Payment Successful!</h2>
            <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
