const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // node-fetch 필요

const app = express();
const PORT = 3000;

// public 폴더 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public")));

// 기본 경로
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 개별 HTML 파일 요청 처리
app.get("/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "public", req.params.file), err => {
    if(err) res.status(404).send("페이지를 찾을 수 없습니다.");
  });
});

// 협력병원 API 프록시
app.get("/api/hospitals", async (req, res) => {
  const API_KEY = "e29ccf241dc9a96bb03ce5c693991694e354b6a0eceae6cdb1ee1b29afafb74c";
const API_URL = `https://api.odcloud.kr/api/15072702/v1/SomeEndpoint?serviceKey=${API_KEY}&page=1&perPage=10&_type=json`;



  try {
    const response = await fetch(API_URL);
    const text = await response.text();
    console.log("API 응답 텍스트:", text);

    let data;
    try {
      data = JSON.parse(text); // JSON 변환 시도
    } catch (e) {
      console.error("JSON 파싱 실패, API가 JSON을 반환하지 않았습니다.", e);
      return res.status(500).json({ error: "API가 JSON을 반환하지 않았습니다.", raw: text });
    }

    res.json(data); // 정상적으로 JSON 파싱되면 API 데이터 반환

  } catch (err) {
    console.error("API 호출 실패:", err);
    res.status(500).json({ error: "API 호출 실패" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`개발 서버 실행 중: http://localhost:${PORT}`);
});
