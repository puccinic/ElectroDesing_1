// jshint esversion: 6

var mymap = L.map('mapid').setView([11.0192, -74.8505], 15);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVjY2luaWMiLCJhIjoiY2swOTh3NHA2MDVoczNtbW5odXAybDlxbSJ9.ySZV9JduMLAW8DphUa4Bsg'
}).addTo(mymap);
var markers = [];
var latlngs = [];
var marker = L.marker([51.5, -0.09]).addTo(mymap);
var polyline = L.polyline(latlngs, {color: 'green'}).addTo(mymap);
var req = new XMLHttpRequest();
req.onreadystatechange = function(aEvt) {
    if (req.readyState == 4) {
        if (req.status == 200) {
            let res = JSON.parse(req.responseText);
            console.log(res);
            let lat = `<b>latitud:</b> ${res.lat} `;
            let lon = `<b>longitud:</b> ${res.lon} `;
            let time = `<b>tiempo:</b> ${res.time} `;
            let texti = '<p>' + lat + lon + time + '</p>';
            $('#syrus').html(texti);
            polyline.addLatLng([res.lat, res.lon]);
            marker.setLatLng([res.lat, res.lon]);
	    markers.push(L.circleMarker([res.lat,res.lon],5).addTo(mymap));
        }
    } else {}
};
window.setInterval(function() {
    req.open('GET', '/Appdata', true);
    req.send(null);
}, 5000);
