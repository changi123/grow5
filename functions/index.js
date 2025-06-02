const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const axios = require("axios");
const cors = require("cors")({ origin: true });

const NAVER_CLIENT_ID = defineSecret("NAVER_CLIENT_ID");
const NAVER_CLIENT_SECRET = defineSecret("NAVER_CLIENT_SECRET");

exports.naverSearch = onRequest(
  {
    secrets: [NAVER_CLIENT_ID, NAVER_CLIENT_SECRET],
  },
  (req, res) => {
    cors(req, res, async () => {
      const query = req.query.q;
      if (!query) return res.status(400).json({ error: "Missing query" });

      try {
        const response = await axios.get(
          "https://openapi.naver.com/v1/search/blog.json",
          {
            params: { query },
            headers: {
              "X-Naver-Client-Id": NAVER_CLIENT_ID.value(),
              "X-Naver-Client-Secret": NAVER_CLIENT_SECRET.value(),
            },
          }
        );

        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).json(response.data);
      } catch (error) {
        console.error(
          "Naver API error:",
          error.response?.data || error.message
        );
        res.set("Access-Control-Allow-Origin", "*");
        res.status(500).json({ error: "Failed to fetch from Naver API" });
      }
    });
  }
);
exports.naverNewsSearch = onRequest(
  {
    secrets: [NAVER_CLIENT_ID, NAVER_CLIENT_SECRET],
  },
  (req, res) => {
    cors(req, res, async () => {
      const query = req.query.q;
      if (!query) return res.status(400).json({ error: "Missing query" });

      try {
        const response = await axios.get(
          "https://openapi.naver.com/v1/search/news.json",
          {
            params: { query },
            headers: {
              "X-Naver-Client-Id": NAVER_CLIENT_ID.value(),
              "X-Naver-Client-Secret": NAVER_CLIENT_SECRET.value(),
            },
          }
        );

        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).json(response.data);
      } catch (error) {
        console.error(
          "Naver API error:",
          error.response?.data || error.message
        );
        res.set("Access-Control-Allow-Origin", "*");
        res.status(500).json({ error: "Failed to fetch from Naver News API" });
      }
    });
  }
);
