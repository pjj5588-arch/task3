kakao.maps.load(function() {
    if(sessionStorage.getItem("isLoggedIn") !== "true") {
        alert("로그인이 필요합니다.");
        window.location.href = "index.html";
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        sessionStorage.removeItem("isLoggedIn");
        window.location.href = "index.html";
    });

    var mapContainer = document.getElementById('hospitalMap');
    var mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 7
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var infowindow = new kakao.maps.InfoWindow({});

    var hospitalPositions = [
        {title: '강남병원', latlng: new kakao.maps.LatLng(37.4979, 127.0276), address: '서울 강남구 역삼동 123', phone: '02-1234-5678'},
        {title: '서울중앙병원', latlng: new kakao.maps.LatLng(37.5610, 126.9820), address: '서울 중구 충무로 45', phone: '02-2345-6789'},
        {title: '삼성서울병원', latlng: new kakao.maps.LatLng(37.4889, 127.0843), address: '서울 강남구 일원동 50', phone: '02-3456-7890'},
        {title: '서울아산병원', latlng: new kakao.maps.LatLng(37.5260, 127.0720), address: '서울 송파구 풍납동 88', phone: '02-4567-8901'},
        {title: '세브란스병원', latlng: new kakao.maps.LatLng(37.5596, 126.9430), address: '서울 서대문구 연세로 50', phone: '02-5678-9012'},
        {title: '한양대학교병원', latlng: new kakao.maps.LatLng(37.5550, 127.0372), address: '서울 성동구 왕십리로 222', phone: '02-6789-0123'}
    ];

    hospitalPositions.forEach(function(pos) {
        var marker = new kakao.maps.Marker({
            position: pos.latlng,
            map: map,
            title: pos.title
        });

kakao.maps.event.addListener(marker, 'click', function() {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        // 병원별로 InfoWindow 너비 조정
        let boxWidth = "200px"; // 기본 크기
        if(pos.title === "세브란스병원" || pos.title === "한양대학교병원") {
            boxWidth = "250px"; // 더 큰 크기
        }

        infowindow.setContent(`
            <div style="
                padding:10px; 
                border:1px solid #888; 
                border-radius:8px; 
                background-color:#fff;
                box-shadow:2px 2px 5px rgba(0,0,0,0.3);
                width:${boxWidth};
                font-size:14px;
            ">
                <strong style="font-size:16px;">${pos.title}</strong><br>
                주소: ${pos.address}<br>
                전화: ${pos.phone}
            </div>
        `);
        infowindow.open(map, marker);
    }
});

    });
});
