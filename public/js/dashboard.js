// 대시보드.js

// 로그인 확인
function checkLogin() {
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    alert("로그인이 필요합니다.");
    window.location.href = "index.html";
  }
}

// 로그아웃 버튼 이벤트
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }
}

// 예약 통계 혼합 차트 (클릭 시 모달)
function renderAppointmentsChart() {
  const chartDiv = document.querySelector("#appointmentsChart");
  if (!chartDiv) return;

  const options = {
    chart: { 
      height: 300, 
      type: 'line', 
      stacked: false,
    },
    series: [
      { name: '요일별 예약 수', type: 'column', data: [5,10,15,7,12,8,20] },
      { name: '누적 예약 수', type: 'line', data: [5,15,30,37,49,57,77] }
    ],
    stroke: { width: [0, 3], curve: 'smooth' },
    xaxis: { categories: ['월','화','수','목','금','토','일'] },
    yaxis: [
      { title: { text: '예약 수' } },
      { opposite: true, title: { text: '누적 예약 수' } }
    ],
    colors: ['#0d6efd','#198754'],
    dataLabels: { enabled: false },
    tooltip: { shared: true }
  };

  new ApexCharts(chartDiv, options).render();
}

// 초기화 함수
function initDashboard() {
  checkLogin();
  setupLogout();
  renderAppointmentsChart();
}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", initDashboard);
