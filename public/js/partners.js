let currentPage = 1;
const perPage = 10;
let totalCount = 0;

const tempHospitals = [
  { 의료기관명: "샘플병원", 전화번호: "02-000-0000", 도로명주소: "서울시 강남구" }
];

function renderTable(items) {
  const tbody = document.querySelector("#partnersTable tbody");
  tbody.innerHTML = "";

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3">데이터가 없습니다.</td></tr>`;
    return;
  }

  items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.의료기관명 || "-"}</td>
      <td>${item.전화번호 || "-"}</td>
      <td>${item.도로명주소 || "-"}</td>
    `;
    tbody.appendChild(row);
  });

  // 페이지 정보 표시
  document.getElementById("pageInfo").textContent = `페이지 ${currentPage} / ${Math.ceil(totalCount / perPage)}`;
}

async function fetchHospitals(page = 1) {
  try {
    const response = await fetch(`/api/hospitals?page=${page}&perPage=${perPage}`, { cache: "no-store" });
    const data = await response.json();

    const items = data.data || [];
    totalCount = data.totalCount || items.length;

    renderTable(items);

    // 버튼 상태
    document.getElementById("prevBtn").disabled = currentPage <= 1;
    document.getElementById("nextBtn").disabled = currentPage >= Math.ceil(totalCount / perPage);

  } catch (err) {
    console.error("API 불러오기 실패:", err);
    renderTable(tempHospitals);
  }
}

// 페이지 버튼 이벤트
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchHospitals(currentPage);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentPage < Math.ceil(totalCount / perPage)) {
    currentPage++;
    fetchHospitals(currentPage);
  }
});

// 초기 데이터 로드
window.addEventListener("DOMContentLoaded", () => fetchHospitals(currentPage));

// 로그아웃
document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});
