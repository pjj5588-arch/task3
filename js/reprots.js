// reports.js

document.addEventListener("DOMContentLoaded", () => {

  // 1. 테마 적용 (저장된 값 불러오기)
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark") {
    document.body.classList.add("bg-dark", "text-light");
  }

  // 2. 다운로드 버튼 클릭
  const downloadBtn = document.querySelector(".app-content-header button");
  downloadBtn.addEventListener("click", () => {
    // 현재 차트 데이터를 CSV로 변환 예시
    const chartsData = [
      { name: "방문자", data: [150, 200, 180, 220, 170, 210, 230] },
      { name: "판매액", data: [500, 700, 600, 800, 750, 900, 850] },
      { name: "회원가입", data: [5, 8, 4, 10, 6, 9, 7] }
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    chartsData.forEach(chart => {
      csvContent += chart.name + "," + chart.data.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shop_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // 3. 사이드바 토글 (AdminLTE 스타일)
  document.querySelectorAll('[data-lte-toggle="sidebar"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("sidebar-collapse");
    });
  });

});
