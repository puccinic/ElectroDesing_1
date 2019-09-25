// jshint esversion: 6

let mymap = L.map('mapid').setView([11.0192, -74.8505], 15);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVjY2luaWMiLCJhIjoiY2swOTh3NHA2MDVoczNtbW5odXAybDlxbSJ9.ySZV9JduMLAW8DphUa4Bsg'
}).addTo(mymap);
let markers = [];
let latlngs = [];
let marker = L.marker([51.5, -0.09]).addTo(mymap);
let polyline = L.polyline(latlngs, {color: 'green'}).addTo(mymap);
const req = new XMLHttpRequest();
req.onreadystatechange = function(aEvt) {
    if (req.readyState == 4) {
        if (req.status == 200) {
            const res = JSON.parse(req.responseText);
            const lat = `<b>latitud:</b> ${res.lat} `;
            const lon = `<b>longitud:</b> ${res.lon} `;
            const time = `<b>tiempo:</b> ${new Date(res.time).toString()} `;
            const texti = '<p>' + lat + lon + time + '</p>';
            $('#syrus').html(texti);
            const polyLength = polyline.getLatLngs().length;
            const lastPos = polyline.getLatLngs()[polyLength-1];
            if (polyline.isEmpty()||((res.lat != lastPos.lat) && (res.lon != lastPos.lng))){
                polyline.addLatLng([res.lat, res.lon]);
                marker.setLatLng([res.lat, res.lon]);
	            markers.push(L.circleMarker([res.lat,res.lon],5).addTo(mymap).setRadius(1));
            }
        }
    }
};
window.setInterval(function() {
    req.open('GET', '/Appdata', true);
    req.send(null);
}, 5000);


$('.myButton').click(function () {
    $('.info').text('');
    const timeMargin = {initTime: new Date($('#init-date').val()).getTime(),
                      finalTime : new Date($('#final-date').val()).getTime()
                     };

    $.post('/',timeMargin).done(function (data){
        console.log(data);
    });

});
