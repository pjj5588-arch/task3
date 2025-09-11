const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

// 기본 페이지
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "partners.html"));
});

// 개별 HTML 파일 요청
app.get("/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "public", req.params.file), err => {
    if (err) res.status(404).send("페이지를 찾을 수 없습니다.");
  });
});

// 협력병원 API 프록시 (페이지네이션 지원)
app.get("/api/hospitals", async (req, res) => {
  const API_KEY = "e29ccf241dc9a96bb03ce5c693991694e354b6a0eceae6cdb1ee1b29afafb74c";
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const API_URL = `https://api.odcloud.kr/api/15072702/v1/uddi:99fa9952-80ae-4426-907b-e02909dc7791?serviceKey=${API_KEY}&page=${page}&perPage=${perPage}&_type=json`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("API 호출 실패:", err);
    res.status(500).json({ error: "API 호출 실패" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
