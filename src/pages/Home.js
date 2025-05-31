import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* 햄버거 아이콘 */}
      <button
        onClick={toggleMenu}
        aria-label="메뉴 열기"
        style={styles.hamburgerBtn}
      >
        <div
          style={{
            ...styles.bar,
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }}
        />
        <div style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
        <div
          style={{
            ...styles.bar,
            transform: menuOpen
              ? "rotate(-45deg) translate(6px, -6px)"
              : "none",
          }}
        />
      </button>

      {/* 슬라이드 메뉴 */}
      <nav
        style={{
          ...styles.sideMenu,
          left: menuOpen ? 0 : "-250px",
        }}
      >
        <h2 style={{ marginBottom: 24, color: "#fff" }}>Grow5 메뉴</h2>
        <button
          style={styles.menuItem}
          onClick={() => {
            navigate("/login");
            setMenuOpen(false);
          }}
        >
          🔑 로그인
        </button>
        <button
          style={styles.menuItem}
          onClick={() => {
            navigate("/mypage");
            setMenuOpen(false);
          }}
        >
          👤 마이페이지
        </button>
        <button
          style={styles.menuItem}
          onClick={() => {
            navigate("/settings");
            setMenuOpen(false);
          }}
        >
          ⚙️ 설정
        </button>
      </nav>

      {/* 메인 화면 */}
      <main style={styles.mainContainer}>
        <h1 style={styles.title}>Grow5</h1>
        <p style={styles.subtitle}>
          하루 5분, 당신의 성장을 돕는 짧은 지식 피드 앱입니다.
        </p>

        <button
          onClick={() => navigate("/categories")}
          style={styles.mainButton}
        >
          🔖 관심 카테고리 설정하러 가기
        </button>

        <button
          onClick={() => navigate("/recommend")}
          style={styles.mainButton}
        >
          🎲 추천 받으러 가기
        </button>

        <button
          onClick={() => navigate("/favorites")}
          style={styles.mainButton}
        >
          ⭐ 찜한 콘텐츠 보러 가기
        </button>
      </main>
    </>
  );
}

const styles = {
  hamburgerBtn: {
    position: "fixed",
    top: 20,
    left: 20,
    width: 30,
    height: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 1001,
  },
  bar: {
    height: 4,
    width: 30,
    backgroundColor: "#4caf50",
    borderRadius: 2,
    transition: "all 0.3s ease",
  },
  sideMenu: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 250,
    height: "100vh",
    background: "linear-gradient(180deg, #4caf50 0%, #81c784 100%)",
    padding: 20,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    transition: "left 0.3s ease",
  },
  menuItem: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    padding: "12px 0",
    textAlign: "left",
    cursor: "pointer",
  },
  mainContainer: {
    maxWidth: 400,
    margin: "60px auto 20px", // 햄버거 높이 + 여백 고려
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#2e7d32",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    color: "#4caf50",
    fontSize: 16,
    fontWeight: "500",
  },
  mainButton: {
    padding: "14px 20px",
    fontSize: 18,
    borderRadius: 10,
    border: "none",
    backgroundColor: "#66bb6a",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(102, 187, 106, 0.5)",
    transition: "background-color 0.3s ease",
  },
};
