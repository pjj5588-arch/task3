// localStorage에서 초기 직원 데이터 불러오기
let staffList = JSON.parse(localStorage.getItem('staffList')) || [
  {id:1, name:'백강혁', position:'의사', location:''},
  {id:2, name:'천장미', position:'간호사', location:''},
  {id:3, name:'한유림', position:'의사', location:''},
  {id:4, name:'양재원', position:'레지던트', location:''},
  {id:5, name:'마동석', position:'마취과 의사', location:''},
  {id:6, name:'김유정', position:'재활직원', location:''},
];

// 직원 카드 렌더링 함수
function createStaffCard(staff) {
  const card = document.createElement('div');
  card.className = 'staff-card';
  card.draggable = true;
  card.id = 'staff-' + staff.id;
  card.innerHTML = `
    ${staff.name}<br>${staff.position}
    <button class="deleteBtn btn btn-sm btn-danger">삭제</button>
  `;
  staffCards.appendChild(card);

  // 드래그 시작
  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', staff.id);
  });

  // 삭제 버튼 이벤트
  card.querySelector('.deleteBtn').addEventListener('click', () => {
    if(confirm(`${staff.name}님을 삭제하시겠습니까?`)) {
      card.remove(); // 화면에서 제거
      staffList = staffList.filter(s => s.id !== staff.id);
      saveStaffList();
    }
  });
}

// localStorage 저장
function saveStaffList() {
  localStorage.setItem('staffList', JSON.stringify(staffList));
}

// 초기 직원 카드 생성 (병동 위치 적용)
const staffCards = document.getElementById('staffCards');
staffList.forEach(staff => {
  createStaffCard(staff);
  if(staff.location) {
    const ward = document.getElementById(staff.location);
    if(ward) ward.appendChild(document.getElementById('staff-' + staff.id));
  }
});

// 직원 추가 버튼
document.getElementById('addStaffBtn').addEventListener('click', () => {
  const name = prompt("직원 이름을 입력하세요");
  const position = prompt("직책을 입력하세요");
  if(name && position) {
    const newStaff = {id: Date.now(), name, position, location: ''};
    staffList.push(newStaff);
    saveStaffList();
    createStaffCard(newStaff);
  }
});

// 병동 영역 드롭 설정
document.querySelectorAll('.ward').forEach(ward => {
  ward.addEventListener('dragover', e => e.preventDefault());
  ward.addEventListener('drop', e => {
    e.preventDefault();
    const staffId = e.dataTransfer.getData('text/plain');
    const staffCard = document.getElementById('staff-' + staffId);
    ward.appendChild(staffCard);

    // 위치 업데이트 후 저장
    const staff = staffList.find(s => s.id == staffId);
    if(staff) {
      staff.location = ward.id;
      saveStaffList();
    }

    console.log(`직원 ${staffId} 배치: ${ward.id}`);
  });
});

// 직원 목록 영역(#staffCards)도 드롭 가능 (원래 위치로 복귀)
staffCards.addEventListener('dragover', e => e.preventDefault());
staffCards.addEventListener('drop', e => {
  e.preventDefault();
  const staffId = e.dataTransfer.getData('text/plain');
  const staffCard = document.getElementById('staff-' + staffId);
  staffCards.appendChild(staffCard);

  const staff = staffList.find(s => s.id == staffId);
  if(staff) {
    staff.location = '';
    saveStaffList();
  }

  console.log(`직원 ${staffId} 원래 목록으로 복귀`);
});