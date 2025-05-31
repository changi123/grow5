import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
//
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 성공!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입 성공!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google 로그인 성공!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "로그인" : "회원가입"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.submitBtn}>
            {isLogin ? "로그인" : "회원가입"}
          </button>
        </form>

        <div style={{ marginTop: "16px" }}>
          <button onClick={handleGoogleLogin} style={styles.googleBtn}>
            🔐 Google 계정으로 로그인
          </button>
        </div>

        <p style={styles.toggleText}>
          {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleBtn}>
            {isLogin ? "회원가입 하기" : "로그인 하기"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  // 기존 스타일 동일
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f8",
  },
  card: {
    backgroundColor: "white",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "320px",
    textAlign: "center",
  },
  title: {
    marginBottom: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  submitBtn: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },
  googleBtn: {
    backgroundColor: "#fff",
    color: "#444",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  toggleText: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#555",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "#1976d2",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "4px",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
  },
};
