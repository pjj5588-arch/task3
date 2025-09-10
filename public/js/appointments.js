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

let storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

const defaultAppointments = [
];

// 기본 데이터 중 없으면 추가
defaultAppointments.forEach(def => {
  if (!storedAppointments.some(a => a.name === def.name && a.date === def.date && a.time === def.time)) {
    storedAppointments.push(def);
  }
});

appointments = storedAppointments;
localStorage.setItem("appointments", JSON.stringify(appointments));


const appointmentTable = document.getElementById("appointmentTable").querySelector("tbody");
const appointmentForm = document.getElementById("appointmentForm");
const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
const modalTitle = document.getElementById("modalTitle");
const appointmentIndexInput = document.getElementById("appointmentIndex");

// localStorage 저장
function saveAppointments() {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}

function renderTable() {
  appointmentTable.innerHTML = "";
  appointments.forEach((a, index) => {
    const displayDate = a.date || "미정";
    const displayTime = a.time || "미정";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.name}</td>
      <td>${displayDate} ${displayTime}</td>
      <td>${a.dept}</td>
      <td>${a.status}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editAppointment(${index})">수정</button>
        <button class="btn btn-sm btn-danger" onclick="deleteAppointment(${index})">삭제</button>
      </td>
    `;
    appointmentTable.appendChild(tr);
  });
}



// 예약 추가/수정
appointmentForm.addEventListener("submit", function(e){
  e.preventDefault();
  const data = {
  name: document.getElementById("appointmentName").value.trim() || "이름없음",
  date: document.getElementById("appointmentDate").value || "미정",
  time: document.getElementById("appointmentTime").value || "미정",
  dept: document.getElementById("appointmentDept").value.trim() || "미정",
  status: document.getElementById("appointmentStatus").value || "예약 완료"
};

  
  const index = appointmentIndexInput.value;

  if(index === "") {
    appointments.push(data); // 새 예약
  } else {
    appointments[index] = data; // 수정
  }

  saveAppointments();
  renderTable();
  appointmentModal.hide();
  appointmentForm.reset();
  appointmentIndexInput.value = "";
  modalTitle.innerText = "예약 추가";
});

// 예약 수정
function editAppointment(index){
  const a = appointments[index];
  modalTitle.innerText = "예약 수정";
  document.getElementById("appointmentName").value = a.name;
  document.getElementById("appointmentDate").value = a.date;
  document.getElementById("appointmentTime").value = a.time;
  document.getElementById("appointmentDept").value = a.dept;
  document.getElementById("appointmentStatus").value = a.status;
  appointmentIndexInput.value = index;
  appointmentModal.show();
}

// 예약 삭제
function deleteAppointment(index){
  if(confirm("정말 삭제하시겠습니까?")){
    appointments.splice(index, 1);
    saveAppointments();
    renderTable();
  }
}

// 초기 렌더링
renderTable();
