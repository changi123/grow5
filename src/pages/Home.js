import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("로그아웃 완료");
      navigate("/login");
      setMenuOpen(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="home-container">
      <style>{`
        .home-container {
          position: relative;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: sans-serif;
        }

        .hamburger-button {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1000;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 900;
        }

        .side-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 240px;
          height: 100%;
          background-color: white;
          box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }

        .side-menu.open {
          transform: translateX(0);
        }

        .side-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #ddd;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }

        .side-menu-content {
          display: flex;
          flex-direction: column;
          padding: 16px;
        }

        .menu-link {
          background: none;
          border: none;
          text-align: left;
          padding: 8px 0;
          font-size: 16px;
          color: #333;
          cursor: pointer;
        }

        .menu-link:hover {
          color: #000;
        }

        .main-content {
          max-width: 420px;
          margin: 0 auto;
          padding: 48px 16px;
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #222;
        }

        .subtitle {
          text-align: center;
          color: #777;
          margin-bottom: 24px;
        }

        .card-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .card-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }

        .card-button {
          background-color: #333;
          color: #fff;
          padding: 10px 16px;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .card-button:hover {
          background-color: #555;
        }
      `}</style>

      {/* 햄버거 버튼 */}
      <button
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        🍔
      </button>

      {/* 오버레이 */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* 사이드 메뉴 */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <h2 className="logo">Grow5</h2>
          <button onClick={() => setMenuOpen(false)} className="close-button">
            ←
          </button>
        </div>
        <div className="side-menu-content">
          <button
            className="menu-link"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            🔑 로그인
          </button>
          <button
            className="menu-link"
            onClick={() => {
              navigate("/mypage");
              setMenuOpen(false);
            }}
          >
            👤 마이페이지
          </button>
          <button className="menu-link" onClick={handleLogout}>
            🚪 로그아웃
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <h1 className="title">Grow5</h1>
        <p className="subtitle">
          하루 5분, 당신의 성장을 돕는 짧은 지식 피드 앱
        </p>

        <div className="card-list">
          <div className="card">
            <h3 className="card-title">📚 관심 카테고리 설정</h3>
            <p className="card-description">
              관심 있는 분야를 선택하면 맞춤 콘텐츠를 추천해드려요.
            </p>
            <button
              onClick={() => navigate("/categories")}
              className="card-button"
            >
              바로가기 →
            </button>
          </div>

          <div className="card">
            <h3 className="card-title">🎯 오늘의 추천 피드</h3>
            <p className="card-description">
              지금 내 취향에 맞는 지식을 추천받아 보세요.
            </p>
            <button
              onClick={() => navigate("/recommend")}
              className="card-button"
            >
              바로가기 →
            </button>
          </div>

          <div className="card">
            <h3 className="card-title">⭐ 찜한 콘텐츠</h3>
            <p className="card-description">
              저장해둔 콘텐츠를 한눈에 확인해 보세요.
            </p>
            <button
              onClick={() => navigate("/favorites")}
              className="card-button"
            >
              바로가기 →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
