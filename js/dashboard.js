
document.addEventListener('DOMContentLoaded', function () {
  // ---------------------------
  // OverlayScrollbars (사이드바)
  // ---------------------------
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  if (sidebarWrapper && OverlayScrollbarsGlobal?.OverlayScrollbars) {
    const isMobile = window.innerWidth <= 992;
    if (!isMobile) {
      OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
        scrollbars: { theme: 'os-theme-light', autoHide: 'leave', clickScroll: true },
      });
    }
  }

  // ---------------------------
  // Fullscreen toggle
  // ---------------------------
  const fsToggle = document.querySelector('[data-lte-toggle="fullscreen"]');
  if (fsToggle) {
    fsToggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fsToggle.querySelector('[data-lte-icon="maximize"]').style.display = 'none';
        fsToggle.querySelector('[data-lte-icon="minimize"]').style.display = 'inline';
      } else {
        document.exitFullscreen();
        fsToggle.querySelector('[data-lte-icon="maximize"]').style.display = 'inline';
        fsToggle.querySelector('[data-lte-icon="minimize"]').style.display = 'none';
      }
    });
  }

  // ---------------------------
  // Sidebar toggle
  // ---------------------------
  document.querySelectorAll('[data-lte-toggle="sidebar"]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-collapse');
    });
  });

  // ---------------------------
  // ApexCharts - 방문자 차트
  // ---------------------------
  const visitorsChart = new ApexCharts(document.querySelector('#visitors-chart'), {
    series: [
      { name: 'High', data: [100, 120, 170, 167, 180, 177, 160] },
      { name: 'Low', data: [60, 80, 70, 67, 80, 77, 100] }
    ],
    chart: { type: 'line', height: 200, toolbar: { show: false } },
    stroke: { curve: 'smooth' },
    colors: ['#0d6efd','#adb5bd'],
    markers: { size: 1 },
    xaxis: { categories: ['22th','23th','24th','25th','26th','27th','28th'] },
    legend: { show: false },
  });
  visitorsChart.render();

  // ---------------------------
  // ApexCharts - 판매 차트
  // ---------------------------
  const salesChart = new ApexCharts(document.querySelector('#sales-chart'), {
    series: [
      { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
      { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
      { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    ],
    chart: { type: 'bar', height: 200 },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
    colors: ['#0d6efd','#20c997','#ffc107'],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'] },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: val => '$ ' + val + ' thousands' } },
    legend: { show: false },
  });
  salesChart.render();

  // ---------------------------
  // 제품 테이블 '더보기' 클릭 이벤트
  // ---------------------------
  document.querySelectorAll('.table tbody tr').forEach(row => {
    const moreBtn = row.querySelector('td:last-child a');
    if (moreBtn) {
      moreBtn.addEventListener('click', e => {
        e.preventDefault();
        alert(`제품 상세 보기: ${row.children[0].textContent.trim()}`);
      });
    }
  });

// Counter up - 퍼센트만 적용
const counters = document.querySelectorAll('.card-body span.fw-bold');
counters.forEach(counter => {
  // %가 붙은 요소만
  if (!counter.textContent.includes('%')) return;

  let value = parseFloat(counter.textContent.replace('%','')) || 0;
  let start = 0;
  const duration = 1000;
  const stepTime = Math.abs(Math.floor(duration / value));

  const timer = setInterval(() => {
    start += 1;
    counter.textContent = start + '%';
    if (start >= value) clearInterval(timer);
  }, stepTime);
});

});
