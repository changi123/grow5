// src/components/HomeButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        padding: 0,
        fontSize: 30, // 이모지 크기 키움
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 1100,
        userSelect: "none",
        lineHeight: 1,
      }}
      aria-label="홈으로"
    >
      🏠
    </button>
  );
}
