const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function searchYouTubeVideos(query, maxResults = 5) {
  const url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
    query
  )}&maxResults=${maxResults}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("유튜브 API 호출 실패");
    }
    const data = await response.json();
    return data.items; // 영상 목록 리턴
  } catch (error) {
    console.error(error);
    return [];
  }
}
