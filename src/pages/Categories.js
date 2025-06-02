import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CATEGORY_LIST = [
  "IT/기술",
  "자기계발",
  "경제/금융",
  "건강/운동",
  "예술/디자인",
  "과학",
  "역사/철학",
  "심리학",
  "창업/비즈니스",
  "언어/글쓰기",
];

export default function Categories() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        // 기존 데이터 불러오기
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSelectedCategories(docSnap.data().categories || []);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      await setDoc(
        doc(db, "users", userId),
        {
          categories: selectedCategories,
        },
        { merge: true }
      );
      alert("카테고리가 저장되었습니다!");
      navigate("/"); // 또는 /recommend 로 이동
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="categories-container">
      <style>{`
        .categories-container {
          max-width: 480px;
          margin: 0 auto;
          padding: 40px 16px;
          font-family: sans-serif;
        }

        h1 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 24px;
        }

        .category-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .category-button {
          padding: 10px 16px;
          border: 1px solid #ccc;
          border-radius: 20px;
          background-color: #f5f5f5;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .category-button.selected {
          background-color: #333;
          color: white;
          border-color: #333;
        }

        .save-button {
          display: block;
          margin: 32px auto 0;
          padding: 12px 24px;
          font-size: 16px;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>

      <h1>관심 카테고리 선택</h1>
      <div className="category-grid">
        {CATEGORY_LIST.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategories.includes(category) ? "selected" : ""
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="save-button" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
}
