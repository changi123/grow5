import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Recommend() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      // 로그인 안 된 상태면 로그인 페이지로 이동
      navigate("/login");
      return;
    }

    async function fetchCategories() {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setCategories(userData.categories || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
      setLoading(false);
    }
    fetchCategories();
  }, [auth.currentUser, db, navigate]);

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: 80,
          fontSize: 18,
          color: "#555",
        }}
      >
        불러오는 중...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "80px auto 40px",
        padding: "0 16px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 40,
          color: "#1976d2",
          fontWeight: "700",
          fontSize: 28,
          userSelect: "none",
        }}
      >
        🎯 추천 피드를 선택해주세요!
      </h2>

      {categories.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: 16,
            marginTop: 60,
            userSelect: "none",
          }}
        >
          관심 분야가 설정되어 있지 않습니다.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 24,
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                navigate(`/recommend/${encodeURIComponent(category)}`)
              }
              style={{
                padding: 22,
                borderRadius: 16,
                background: "linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)",
                color: "white",
                fontWeight: "600",
                fontSize: 17,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 5px 12px rgba(25, 118, 210, 0.35)",
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
                userSelect: "none",
                textAlign: "center",
                lineHeight: "1.3",
                whiteSpace: "normal",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(25, 118, 210, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 5px 12px rgba(25, 118, 210, 0.35)";
              }}
              aria-label={`카테고리 ${category} 추천 보기`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
