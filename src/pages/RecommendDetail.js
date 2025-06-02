import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export default function RecommendDetail() {
  const { category } = useParams();

  // 상태 정의
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videoIndices, setVideoIndices] = useState([]);

  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogIndices, setBlogIndices] = useState([]);

  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsIndices, setNewsIndices] = useState([]);

  // 랜덤 인덱스 n개 뽑는 함수 (중복 없이)
  function getRandomIndices(max, count) {
    const indices = new Set();
    while (indices.size < count && indices.size < max) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  }

  // 유튜브 영상 데이터 불러오기
  useEffect(() => {
    async function fetchVideos() {
      setVideosLoading(true);
      try {
        const url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
          category
        )}&maxResults=20&order=relevance&key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("유튜브 API 요청 실패");

        const data = await response.json();

        const videoList = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails?.medium?.url,
          description: item.snippet.description,
        }));

        setVideos(videoList);
        setVideoIndices(getRandomIndices(videoList.length, 2));
      } catch (error) {
        console.error(error);
        setVideos([]);
        setVideoIndices([]);
      }
      setVideosLoading(false);
    }
    fetchVideos();
  }, [category]);

  // 블로그 데이터 - 프록시 서버를 통해 네이버 블로그 API 호출
  useEffect(() => {
    async function fetchBlogs() {
      setBlogsLoading(true);
      try {
        // 환경에 따라 URL 분기 처리
        const isLocal = window.location.hostname === "localhost";

        const url = isLocal
          ? `http://localhost:5001/grow5-62185/us-central1/naverSearch?q=${encodeURIComponent(
              category
            )}`
          : `https://us-central1-grow5-62185.cloudfunctions.net/naverSearch?q=${encodeURIComponent(
              category
            )}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("네이버 블로그 API 요청 실패");

        const data = await response.json();

        const blogList = data.items.map((item, idx) => ({
          id: `naverblog${idx + 1}`,
          title: item.title.replace(/<[^>]+>/g, ""),
          url: item.link,
          source: item.bloggername,
          // thumbnail:
          //   item.thumbnail || "https://via.placeholder.com/300x120?text=Blog",
          description: item.description
            ? item.description.replace(/<[^>]*>?/gm, "")
            : "",
        }));

        setBlogs(blogList);
        setBlogIndices(getRandomIndices(blogList.length, 2));
      } catch (error) {
        console.error(error);
        setBlogs([]);
        setBlogIndices([]);
      }
      setBlogsLoading(false);
    }

    fetchBlogs();
  }, [category]);

  // 뉴스 데이터
  useEffect(() => {
    async function fetchNews() {
      setNewsLoading(true);
      try {
        // 환경에 따라 URL 분기 처리
        const isLocal = window.location.hostname === "localhost";

        const url = isLocal
          ? `http://localhost:5001/grow5-62185/us-central1/naverNewsSearch?q=${encodeURIComponent(
              category
            )}`
          : `https://us-central1-grow5-62185.cloudfunctions.net/naverNewsSearch?q=${encodeURIComponent(
              category
            )}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("네이버 뉴스 API 요청 실패");

        const data = await response.json();
        const newsList = data.items.map((item, idx) => ({
          id: `news${idx + 1}`,
          title: item.title.replace(/<[^>]+>/g, ""),
          url: item.link,
          source: item.originallink || "네이버뉴스",
          // thumbnail: `https://via.placeholder.com/300x120?text=News+${idx + 1}`, // 썸네일 없음 → 기본 이미지
          description: item.description
            ? item.description.replace(/<[^>]*>?/gm, "")
            : "",
        }));

        setNews(newsList);
        setNewsIndices(getRandomIndices(newsList.length, 2));
      } catch (error) {
        console.error("뉴스 요청 실패:", error);
        setNews([]);
        setNewsIndices([]);
      }
      setNewsLoading(false);
    }

    fetchNews();
  }, [category]);

  // 다시 추천받기: 각 컨텐츠별 랜덤 인덱스 새로 뽑기
  const handleReload = (type) => {
    if (type === "video") {
      setVideoIndices(getRandomIndices(videos.length, 2));
    } else if (type === "blog") {
      setBlogIndices(getRandomIndices(blogs.length, 2));
    } else if (type === "news") {
      setNewsIndices(getRandomIndices(news.length, 2));
    }
  };

  // 카드 스타일 등 (기존 코드 유지)
  const sectionStyle = { marginBottom: 40 };
  const cardContainerStyle = {
    display: "flex",
    gap: 16,
    overflowX: "auto",
    paddingBottom: 8,
  };
  const cardStyle = {
    flex: "0 0 70%",
    maxWidth: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    minHeight: 240,
    overflow: "hidden",
  };
  const titleStyle = {
    fontSize: 16,
    fontWeight: "700",
    padding: "8px 12px 4px",
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const descStyle = {
    fontSize: 14,
    color: "#444",
    padding: "0 12px",
    margin: "4px 0 0 0",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: 40,
  };
  const sourceStyle = {
    padding: "0 12px 12px",
    fontSize: 13,
    color: "#555",
  };

  // 선택된 인덱스 기반으로 현재 보여줄 아이템 추출
  const getItemsByIndices = (items, indices) =>
    indices.map((idx) => items[idx]).filter(Boolean);

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: "0 12px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 32,
          fontSize: 22,
          fontWeight: "700",
          color: "#1976d2",
          userSelect: "none",
        }}
      >
        {category} 추천 컨텐츠
      </h2>

      {/* 유튜브 영상 섹션 */}
      <section style={sectionStyle}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 12,
            color: "#e62117",
            userSelect: "none",
          }}
        >
          🎬 유튜브 영상
        </h3>

        {videosLoading ? (
          <p>불러오는 중...</p>
        ) : videos.length === 0 ? (
          <p style={{ color: "#888" }}>관련된 영상이 없습니다.</p>
        ) : (
          <>
            <div style={cardContainerStyle}>
              {getItemsByIndices(videos, videoIndices).map((video) => (
                <div
                  key={video.id}
                  style={cardStyle}
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${video.id}`,
                      "_blank"
                    )
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.open(
                        `https://www.youtube.com/watch?v=${video.id}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  {
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    />
                  }
                  <div style={{ flex: 1 }}>
                    <strong style={titleStyle}>{video.title}</strong>
                    <p style={descStyle}>
                      {video.description
                        ? video.description.slice(0, 60) +
                          (video.description.length > 60 ? "..." : "")
                        : ""}
                    </p>
                    <p style={sourceStyle}>{video.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleReload("video")}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 12,
                borderRadius: 12,
                backgroundColor: "#e62117",
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                userSelect: "none",
                boxShadow: "0 4px 12px rgba(230,33,23,0.6)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#b71814")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#e62117")
              }
              aria-label="유튜브 영상 다시 추천받기"
            >
              🔄 다시 추천받기
            </button>
          </>
        )}
      </section>

      {/* 블로그 섹션 */}
      <section style={sectionStyle}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 12,
            color: "#2e7d32",
            userSelect: "none",
          }}
        >
          📝 블로그 글
        </h3>
        {blogsLoading ? (
          <p>불러오는 중...</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: "#888" }}>관련된 블로그 글이 없습니다.</p>
        ) : (
          <>
            <div style={cardContainerStyle}>
              {getItemsByIndices(blogs, blogIndices).map((blog) => (
                <a
                  key={blog.id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...cardStyle,
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  {/* <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  /> */}
                  <div style={{ flex: 1 }}>
                    <strong style={titleStyle}>{blog.title}</strong>
                    <p style={descStyle}>
                      {blog.description
                        ? blog.description.slice(0, 60) +
                          (blog.description.length > 60 ? "..." : "")
                        : ""}
                    </p>
                    <p style={sourceStyle}>{blog.source}</p>
                  </div>
                </a>
              ))}
            </div>
            <button
              onClick={() => handleReload("blog")}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 12,
                borderRadius: 12,
                backgroundColor: "#2e7d32",
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                userSelect: "none",
                boxShadow: "0 4px 12px rgba(46,125,50,0.6)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1b4d1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2e7d32")
              }
              aria-label="블로그 글 다시 추천받기"
            >
              🔄 다시 추천받기
            </button>
          </>
        )}
      </section>

      {/* 뉴스 섹션 */}
      <section style={sectionStyle}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 12,
            color: "#1976d2",
            userSelect: "none",
          }}
        >
          📰 뉴스 기사
        </h3>
        {newsLoading ? (
          <p>불러오는 중...</p>
        ) : news.length === 0 ? (
          <p style={{ color: "#888" }}>관련된 뉴스 기사가 없습니다.</p>
        ) : (
          <>
            <div style={cardContainerStyle}>
              {getItemsByIndices(news, newsIndices).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...cardStyle,
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  {/* <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  /> */}
                  <div style={{ flex: 1 }}>
                    <strong style={titleStyle}>{item.title}</strong>
                    <p style={descStyle}>
                      {item.description
                        ? item.description.slice(0, 60) +
                          (item.description.length > 60 ? "..." : "")
                        : ""}
                    </p>
                    <p style={sourceStyle}>{item.source}</p>
                  </div>
                </a>
              ))}
            </div>
            <button
              onClick={() => handleReload("news")}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 12,
                borderRadius: 12,
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                userSelect: "none",
                boxShadow: "0 4px 12px rgba(25,118,210,0.6)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0e4a91")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1976d2")
              }
              aria-label="뉴스 기사 다시 추천받기"
            >
              🔄 다시 추천받기
            </button>
          </>
        )}
      </section>
    </div>
  );
}
