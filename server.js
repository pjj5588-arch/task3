const express = require("express");
const path = require("path");
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

app.listen(PORT, () => {
  console.log(`개발 서버 실행 중: http://localhost:${PORT}`);
});
