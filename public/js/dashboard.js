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

// 예약 통계 혼합 차트
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

// 카드별 상세 내용
const cardDetails = {
  "예약 현황": `
    <ul>
      <li>김철수 - 10:00 - 내과</li>
      <li>이영희 - 11:00 - 외과</li>
      <li>박민수 - 14:00 - 내과</li>
      <li>최지은 - 14:30 - 외과</li>
    </ul>
  `,
  "오늘 환자 현황": `
    <p>오늘 방문 환자: <strong>20명</strong></p>
    <p>오늘 신규 등록 환자: <strong>5명</strong></p>
  `,
  "환자 통계": `
    <p>이번 주 예약 수: <strong>120명</strong></p>
    <p>이번 달 예약 수: <strong>450명</strong></p>
  `,
  "공지사항": `
    <ul>
      <li>병원 휴진 안내</li>
      <li>새로운 진료과 추가</li>
      <li>신규 직원 채용</li>
      <li>우수 병원 선정</li>
    </ul>
  `,
  "매출 현황": `
    <p>오늘 매출: <strong>₩1,200,000</strong></p>
    <p>이번 주 매출: <strong>₩8,500,000</strong></p>
    <p>이번 달 매출: <strong>₩35,000,000</strong></p>
  `,
  "진료과별 예약 비율": `<p>진료과별 예약 비율 차트를 확인하세요.</p>`,
  "최근 예약": `
    <ul>
      <li>박민수 - 14:00 - 내과</li>
      <li>최지은 - 14:30 - 외과</li>
    </ul>
  `,
  "직원 근무 현황": `
    <ul>
      <li>김간호 - 근무 중</li>
      <li>이수진 - 휴무</li>
      <li>박원장 - 근무 중</li>
    </ul>
  `,
  "응급 / 취소 / 연기": `
    <p>오늘 응급 환자: <strong>3명</strong></p>
    <p>오늘 예약 취소: <strong>2건</strong></p>
    <p>오늘 예약 연기: <strong>1건</strong></p>
  `
};

// 모든 카드 클릭 이벤트
function setupCardClickEvents() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const modalBody = document.getElementById('modalBody');
      const cardTitle = card.querySelector('h5').innerText;

      // 카드 제목에 맞는 상세 내용 가져오기
      modalBody.innerHTML = cardDetails[cardTitle] || `<p>${cardTitle} 상세 정보 없음</p>`;

      const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
      detailModal.show();
    });
  });
}

// 초기화 함수
function initDashboard() {
  checkLogin();
  setupLogout();
  renderAppointmentsChart();
  setupCardClickEvents();
}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", initDashboard);
