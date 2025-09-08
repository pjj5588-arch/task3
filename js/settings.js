// settings.js

document.addEventListener("DOMContentLoaded", () => {

  // 1. 사이트 정보 저장
  const siteForm = document.querySelector("form:nth-of-type(1)");
  siteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const siteName = document.getElementById("siteName").value;
    const siteEmail = document.getElementById("siteEmail").value;
    const siteLogo = document.getElementById("siteLogo").files[0];

    // 로컬 스토리지에 저장 (데모용)
    localStorage.setItem("siteName", siteName);
    localStorage.setItem("siteEmail", siteEmail);
    if (siteLogo) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("siteLogo", reader.result);
      };
      reader.readAsDataURL(siteLogo);
    }

    alert("사이트 정보가 저장되었습니다!");
  });

  // 2. 계정 및 알림 저장
  const accountForm = document.querySelector("form:nth-of-type(2)");
  accountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailNotif = document.getElementById("emailNotifications").checked;
    const smsNotif = document.getElementById("smsNotifications").checked;
    const password = document.getElementById("password").value;

    localStorage.setItem("emailNotifications", emailNotif);
    localStorage.setItem("smsNotifications", smsNotif);
    if(password) localStorage.setItem("password", password);

    alert("계정 및 알림 설정이 저장되었습니다!");
  });

  // 3. 테마 변경 저장
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  themeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const theme = document.querySelector('input[name="theme"]:checked').value;
      if(theme === "dark"){
        document.body.classList.add("bg-dark", "text-light");
      } else {
        document.body.classList.remove("bg-dark", "text-light");
      }
      localStorage.setItem("theme", theme);
    });
  });

  // 페이지 로드 시 저장된 테마 적용
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme){
    document.querySelector(`input[name="theme"][value="${savedTheme}"]`).checked = true;
    if(savedTheme === "dark"){
      document.body.classList.add("bg-dark", "text-light");
    }
  }

});
