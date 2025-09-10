// 로그인 확인
if (sessionStorage.getItem("isLoggedIn") !== "true") {
  alert("로그인이 필요합니다.");
  window.location.href = "index.html";
}

// 로그아웃
document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

// 초기 데이터 (localStorage에 있으면 불러오기)
let patients = JSON.parse(localStorage.getItem("patients")) || [
  { name: "김철수", phone: "010-1234-5678", dob: "1985-05-01", record: "내과 진료" },
  { name: "이영희", phone: "010-8765-4321", dob: "1990-09-12", record: "외과 진료" }
];

const patientTable = document.getElementById("patientTable").querySelector("tbody");
const patientForm = document.getElementById("patientForm");
const patientModal = new bootstrap.Modal(document.getElementById("patientModal"));
const modalTitle = document.getElementById("modalTitle");
const patientIndexInput = document.getElementById("patientIndex");

// ✅ localStorage 저장 함수
function savePatients() {
  localStorage.setItem("patients", JSON.stringify(patients));
}

// ✅ 테이블 렌더링
function renderTable() {
  patientTable.innerHTML = "";
  patients.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.phone}</td>
      <td>${p.dob}</td>
      <td>${p.record}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editPatient(${index})">수정</button>
        <button class="btn btn-sm btn-danger" onclick="deletePatient(${index})">삭제</button>
      </td>
    `;
    patientTable.appendChild(tr);
  });
}

// ✅ 환자 추가/수정
patientForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const patientData = {
    name: document.getElementById("patientName").value,
    phone: document.getElementById("patientPhone").value,
    dob: document.getElementById("patientDOB").value,
    record: document.getElementById("patientRecord").value
  };
  const index = patientIndexInput.value;

  if (index === "") {
    patients.push(patientData); // 새 환자 추가
  } else {
    patients[index] = patientData; // 기존 환자 수정
  }

  savePatients(); // ✅ 저장
  renderTable();
  patientModal.hide();
  patientForm.reset();
  patientIndexInput.value = "";
  modalTitle.innerText = "환자 추가";
});

// ✅ 환자 수정
function editPatient(index) {
  const p = patients[index];
  modalTitle.innerText = "환자 수정";
  document.getElementById("patientName").value = p.name;
  document.getElementById("patientPhone").value = p.phone;
  document.getElementById("patientDOB").value = p.dob;
  document.getElementById("patientRecord").value = p.record;
  patientIndexInput.value = index;
  patientModal.show();
}

// ✅ 환자 삭제
function deletePatient(index) {
  if (confirm("정말 삭제하시겠습니까?")) {
    patients.splice(index, 1);
    savePatients(); // ✅ 저장
    renderTable();
  }
}

// ✅ 초기 렌더링
renderTable();


