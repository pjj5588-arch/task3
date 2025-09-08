document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-filter");
  const table = document.querySelector("table tbody");

  // 검색 필터
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    Array.from(table.rows).forEach(row => {
      const orderNumber = row.cells[0].textContent.toLowerCase();
      const customer = row.cells[1].textContent.toLowerCase();
      const product = row.cells[2].textContent.toLowerCase();
      if(orderNumber.includes(filter) || customer.includes(filter) || product.includes(filter)){
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  // 삭제 버튼
  table.addEventListener("click", e => {
    if(e.target.closest(".bi-x-circle")){
      const row = e.target.closest("tr");
      const orderId = row.cells[0].textContent;
      if(confirm(`${orderId} 주문을 정말 삭제하시겠습니까?`)){
        row.remove();
        updateTotalCount();
      }
    }
  });

  // 상세보기 버튼
  table.addEventListener("click", e => {
    if(e.target.closest(".bi-eye")){
      const row = e.target.closest("tr");
      const orderId = row.cells[0].textContent;
      const customer = row.cells[1].textContent;
      const product = row.cells[2].textContent;
      const qty = row.cells[3].textContent;
      const total = row.cells[4].textContent;
      const status = row.cells[5].textContent;
      const date = row.cells[6].textContent;

      alert(`주문 상세정보\n\n주문번호: ${orderId}\n고객명: ${customer}\n상품: ${product}\n수량: ${qty}\n총 금액: ${total}\n상태: ${status}\n주문일: ${date}`);
    }
  });

  // 총 주문 건수 업데이트
  function updateTotalCount(){
    const countSpan = document.querySelector(".card-header .text-muted");
    const total = table.querySelectorAll("tr").length;
    countSpan.textContent = `총 ${total}건`;
  }
});