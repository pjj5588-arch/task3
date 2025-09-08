
document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.querySelector('.btn-primary');
  const searchInput = document.querySelector('input[placeholder="검색..."]');
  const tableBody = document.querySelector('tbody');

  // 상품 추가
  addBtn.addEventListener('click', () => {
    const name = prompt("상품명 입력:");
    if (!name) return;
    const price = prompt("가격 입력:");
    const stock = prompt("재고 입력:");
    const category = prompt("카테고리 입력:");
    const status = confirm("판매중인가요?") ? '판매중' : '품절';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="../../assets/img/default-150x150.png" class="rounded-circle img-size-32 me-2" alt="Product"></td>
      <td>${name}</td>
      <td>$${price}</td>
      <td>${stock}</td>
      <td>${category}</td>
      <td><span class="badge ${status === '판매중' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
      <td>
        <a href="#" class="text-primary me-2 edit"><i class="bi bi-pencil-square"></i></a>
        <a href="#" class="text-danger delete"><i class="bi bi-trash"></i></a>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // 테이블 검색
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    tableBody.querySelectorAll('tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? '' : 'none';
    });
  });

  // 편집 & 삭제 이벤트
  tableBody.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('a');
    if (!target) return;

    const row = target.closest('tr');

    // 편집
    if (target.classList.contains('edit')) {
      const name = prompt("상품명 수정:", row.children[1].textContent);
      if (name) row.children[1].textContent = name;

      const price = prompt("가격 수정:", row.children[2].textContent.replace('$',''));
      if (price) row.children[2].textContent = '$' + price;

      const stock = prompt("재고 수정:", row.children[3].textContent);
      if (stock) row.children[3].textContent = stock;

      const category = prompt("카테고리 수정:", row.children[4].textContent);
      if (category) row.children[4].textContent = category;

      const status = confirm("판매중인가요?") ? '판매중' : '품절';
      row.children[5].innerHTML = `<span class="badge ${status === '판매중' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
    }

    // 삭제
    if (target.classList.contains('delete')) {
      if (confirm("정말 삭제하시겠습니까?")) {
        row.remove();
      }
    }
  });
});
