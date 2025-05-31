// src/components/BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
//
export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        padding: "8px 14px",
        fontSize: 15,
        fontWeight: "600",
        color: "#444",
        backgroundColor: "#fff",
        border: "1.5px solid #ccc",
        borderRadius: 10,
        boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        zIndex: 1100,
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f9f9f9";
        e.currentTarget.style.borderColor = "#999";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
        e.currentTarget.style.color = "#222";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.borderColor = "#ccc";
        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.12)";
        e.currentTarget.style.color = "#444";
      }}
      aria-label="뒤로가기"
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>←</span> 뒤로가기
    </button>
  );
}
