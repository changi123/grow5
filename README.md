# 📚 5분 투자형 지식 피드 - Grow5

## 1. 프로젝트 소개

**Grow5**는 사용자가 관심 있는 주제를 입력하면 관련된 **유튜브 영상, 네이버 블로그, 네이버 뉴스**를 추천해주는 웹앱
짧은 시간 안에 폭넓은 정보를 탐색하고 습득할 수 있도록 설계

- 🖥 **배포 주소**: [https://grow5-62185.web.app/](https://grow5-62185.web.app/)
- 📁 **주요 기능**: 키워드 기반 추천, 유튜브/블로그/뉴스 추천, 랜덤 추천 기능
- 🛠 **GitHub**: [https://github.com/changi123/grow5](https://github.com/changi123/grow5) 

---

## 2. 프로젝트 스택

- **Frontend**: React (Vite 기반)
- **Backend (프록시 서버)**: Firebase Functions (Node.js, Axios)
- **API 연동**
  - YouTube Data API v3
  - Naver Search API (Blog / News)
- **Styling**: 기본 CSS, Inline Style
- **기타**: React Router v6, Firebase Secret Manager, 환경변수 사용

---

## 3. 주요 기능 소개

### ✅ 키워드 기반 추천 페이지 (메인)

- 사용자가 키워드를 입력하면 해당 키워드로 관련 콘텐츠 검색
- 추천 결과: 유튜브 영상, 블로그 글, 뉴스 기사
- 각 결과는 카드 형태로 출력 (썸네일, 제목, 간략 요약 제공)
- "다시 추천 받기" 기능으로 랜덤 추천 가능

### 📝 구글 로그인
- firebase에서 지원하는 구글 로그인 사용으로 google 로그인 시 기능 사용

---

### 🎞️ 유튜브 영상 추천

- YouTube Data API 활용
- 입력 키워드 기반 검색 → 50개 검색 결과 중 랜덤 2개 추천
- 썸네일, 제목, 채널명, 간략 설명 표시

---

### 📝 네이버 블로그 추천

- Naver Search API (blog) 활용
- Firebase Functions 프록시 서버 경유 → API Key 보안 확보
- 블로그 제목, 발행 블로거, 요약 제공

---

### 📰 네이버 뉴스 추천

- Naver Search API (news) 활용
- 역시 Firebase Functions 프록시 서버 경유
- 뉴스 제목, 출처, 요약 제공

---

## 4. 후기
- 네이버 API를 사용하기 위해 firebase Function을 써서  프록시 서버 경유 해본 것이 좀 재밌었다.
- 유튜브, 네이버 등 OPEN API KEY를 발급받아 활용해보니 훨씬 보여줄 수 있는 데이터 수준이 올라간다.
- 또 다른 firebase에서 지원하는 기능들을 사용해보자 스토리지, 실시간 로그 등등
- 더욱 다양한 OPEN API로 좋은 주제로 간단한 프로젝트 다양하게 해보자

---

## 5. 주요 UI

### 메인화면
<table align="center">
  <tr>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/b943fe35-5621-47d8-ae2f-6dbb64dadcec/image.jpg" width="300"/></td>
  </tr>
</table>

### 로그인화면 & 구글 로그인

<table align="center">
  <tr>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/7494ee59-5d58-4c15-a9e5-f6b77c79d69e/image.jpg" width="300"/></td>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/efe5e923-36e4-44c3-8acd-b95e1f5dab4c/image.jpg" width="300"/></td>
  </tr>
</table>

### 추천 관심사 설정 & 설정된 관심사
<table align="center">
  <tr>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/f489362f-29be-400d-b0f1-bf059001fbe4/image.jpg" width="300"/></td>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/d8f39b97-a42d-4a1c-9be2-e292ca56a2e5/image.jpg" width="300"/></td>
  </tr>
</table>

### 관심사 호출 유튜브API & 관심사 호출 네이버API
<table align="center">
  <tr>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/1e54f9c0-99e5-40f5-948c-f9fb1a9c6684/image.jpg" width="300"/></td>
    <td align="center"><img src="https://velog.velcdn.com/images/changi_gg/post/7b075302-bf83-4ce0-bd63-c82a5428e65a/image.jpg" width="300"/></td>
  </tr>
</table>
