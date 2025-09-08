
document.addEventListener("DOMContentLoaded", () => {
  // 테이블, 폼, 모달, 검색 input
  const userTable = document.getElementById("userTable").querySelector("tbody");
  const addUserForm = document.getElementById("addUserForm");
  const addUserModal = new bootstrap.Modal(document.getElementById("addUserModal"));
  const searchInput = document.getElementById("searchInput");

  // 상태 매핑
  const statusMap = { active: '활성', inactive: '휴면', suspended: '정지' };
  const statusClassMap = { active: 'success', inactive: 'warning', suspended: 'danger' };

  // 현재 편집 중인 행
  let editingRow = null;

  // -----------------
  // 회원 추가 / 편집 submit
  // -----------------
  addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const status = document.getElementById("userStatus").value;
    const date = document.getElementById("userDate").value;

    if (editingRow) {
      // 편집 모드: 기존 행 업데이트
      const cells = editingRow.cells;
      cells[1].innerText = name;
      cells[2].innerText = email;
      cells[3].innerText = date;
      cells[4].innerHTML = `<span class="badge bg-${statusClassMap[status]}">${statusMap[status]}</span>`;
      editingRow = null; // 편집 종료
    } else {
      // 추가 모드: 새 행 생성
      const newRow = document.createElement("tr");
      const newId = generateUserId();
      newRow.innerHTML = `
        <td>${newId}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${date}</td>
        <td><span class="badge bg-${statusClassMap[status]}">${statusMap[status]}</span></td>
        <td>
          <a href="#" class="text-primary me-2 view-btn"><i class="bi bi-eye"></i></a>
          <a href="#" class="text-warning me-2 edit-btn"><i class="bi bi-pencil"></i></a>
          <a href="#" class="text-danger delete-btn"><i class="bi bi-trash"></i></a>
        </td>
      `;
      userTable.appendChild(newRow);
    }

    addUserForm.reset();
    addUserModal.hide();
  });

  // -----------------
  // ID 자동 생성
  // -----------------
  function generateUserId() {
    const ids = Array.from(userTable.querySelectorAll("tr")).map(tr => parseInt(tr.cells[0].innerText.replace("#","")));
    const maxId = ids.length ? Math.max(...ids) : 100;
    return `#${maxId + 1}`;
  }

  // -----------------
  // 편집 / 삭제 / 보기
  // -----------------
  userTable.addEventListener("click", (e) => {
    e.preventDefault();
    const row = e.target.closest("tr");
    const btn = e.target.closest("a");
    if (!row || !btn) return;

    // 삭제
    if (btn.classList.contains("delete-btn")) {
      if (confirm("정말 삭제하시겠습니까?")) {
        row.remove();
      }
    }
    // 편집
    else if (btn.classList.contains("edit-btn")) {
      const cells = row.cells;
      document.getElementById("userName").value = cells[1].innerText;
      document.getElementById("userEmail").value = cells[2].innerText;
      document.getElementById("userStatus").value = Object.keys(statusMap).find(key => statusMap[key] === cells[4].innerText);
      document.getElementById("userDate").value = cells[3].innerText;

      editingRow = row; // 편집 중인 행 저장
      addUserModal.show();
    }
    // 보기
    else if (btn.classList.contains("view-btn")) {
      const cells = row.cells;
      alert(`회원 정보\nID: ${cells[0].innerText}\n이름: ${cells[1].innerText}\n이메일: ${cells[2].innerText}\n가입일: ${cells[3].innerText}\n상태: ${cells[4].innerText}`);
    }
  });

  // -----------------
  // 검색
  // -----------------
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    Array.from(userTable.rows).forEach(row => {
      const name = row.cells[1].innerText.toLowerCase();
      const email = row.cells[2].innerText.toLowerCase();
      row.style.display = name.includes(filter) || email.includes(filter) ? "" : "none";
    });
  });

});

