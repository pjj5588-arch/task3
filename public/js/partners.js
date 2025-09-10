async function fetchHospitals() {
  try {
    const response = await fetch("/api/hospitals", { cache: "no-store" });
    const data = await response.json();
    const items = data.data || data.response?.body?.items?.item || [];
    renderTable(items);
  } catch (err) {
    console.error("API 불러오기 실패:", err);
    renderTable(tempHospitals); // 임시 데이터 사용
  }
}
