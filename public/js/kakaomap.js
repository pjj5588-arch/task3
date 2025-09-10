kakao.maps.load(function() {
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

    // 지도 생성
    var mapContainer = document.getElementById('hospitalMap');
    var mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 7
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 설정
    var hospitalPositions = [
        {title: '강남병원', latlng: new kakao.maps.LatLng(37.4979, 127.0276)},
    {title: '서울중앙병원', latlng: new kakao.maps.LatLng(37.5610, 126.9820)},
    {title: '삼성서울병원', latlng: new kakao.maps.LatLng(37.4889, 127.0843)},
    {title: '서울아산병원', latlng: new kakao.maps.LatLng(37.5260, 127.0720)},
    {title: '세브란스병원', latlng: new kakao.maps.LatLng(37.5596, 126.9430)},
    {title: '한양대학교병원', latlng: new kakao.maps.LatLng(37.5550, 127.0372)}
    ];

    hospitalPositions.forEach(function(pos) {
        var marker = new kakao.maps.Marker({
            position: pos.latlng,
            map: map,
            title: pos.title
        });

        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;">' + pos.title + '</div>'
        });

        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    });
});
