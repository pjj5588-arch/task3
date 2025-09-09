 // 로그인 확인
    if(sessionStorage.getItem("isLoggedIn") !== "true") {
      alert("로그인이 필요합니다.");
      window.location.href = "index.html";
    }

    // 로그아웃
    document.getElementById("logoutBtn").addEventListener("click", () => {
      sessionStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });

    // 초기 데이터
    let appointments = [
      {name: "김철수", time: "10:00", dept: "내과", status: "예약 완료"},
      {name: "이영희", time: "11:00", dept: "외과", status: "예약 완료"}
    ];

    const appointmentTable = document.getElementById("appointmentTable").querySelector("tbody");
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    const modalTitle = document.getElementById("modalTitle");
    const appointmentIndexInput = document.getElementById("appointmentIndex");

    function renderTable() {
      appointmentTable.innerHTML = "";
      appointments.forEach((a, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${a.name}</td>
          <td>${a.time}</td>
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
        name: document.getElementById("appointmentName").value,
        time: document.getElementById("appointmentTime").value,
        dept: document.getElementById("appointmentDept").value,
        status: document.getElementById("appointmentStatus").value
      };
      const index = appointmentIndexInput.value;
      if(index === "") {
        appointments.push(data);
      } else {
        appointments[index] = data;
      }
      renderTable();
      appointmentModal.hide();
      appointmentForm.reset();
      appointmentIndexInput.value = "";
      modalTitle.innerText = "예약 추가";
    });

    function editAppointment(index){
      const a = appointments[index];
      modalTitle.innerText = "예약 수정";
      document.getElementById("appointmentName").value = a.name;
      document.getElementById("appointmentTime").value = a.time;
      document.getElementById("appointmentDept").value = a.dept;
      document.getElementById("appointmentStatus").value = a.status;
      appointmentIndexInput.value = index;
      appointmentModal.show();
    }

    function deleteAppointment(index){
      if(confirm("정말 삭제하시겠습니까?")){
        appointments.splice(index,1);
        renderTable();
      }
    }

    // 초기 렌더링
    renderTable();