import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupportIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          zIndex: 1000,
        }}
      >
        ❓
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1001,
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            <strong>Support Chat</strong>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ❌
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>👋 Hi! How can we help you?</p>
          </div>

          {/* Input Box */}
          <input
            type="text"
            placeholder="Type a message..."
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SupportIcon;
