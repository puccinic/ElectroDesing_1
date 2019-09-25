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

$.get('/Appdata').done(function (data){
    const lat = `<b>latitud:</b> ${data.lat} `;
    const lon = `<b>longitud:</b> ${data.lon} `;
    const time = `<b>tiempo:</b> ${new Date(data.time).toString()} `;
    const texti = '<p>' + lat + lon + time + '</p>';
    $('#syrus').html(texti);
    const polyLength = polyline.getLatLngs().length;
    const lastPos = polyline.getLatLngs()[polyLength-1];
    if (polyline.isEmpty()||((data.lat != lastPos.lat) && (data.lon != lastPos.lng))){
        polyline.addLatLng([data.lat, data.lon]);
        marker.setLatLng([data.lat, data.lon]);
        markers.push(L.circleMarker([data.lat,data.lon],5).addTo(mymap).setRadius(1));
    }
});


window.setInterval(
    $.get('/Appdata').done(function (data){
        const lat = `<b>latitud:</b> ${data.lat} `;
        const lon = `<b>longitud:</b> ${data.lon} `;
        const time = `<b>tiempo:</b> ${new Date(data.time).toString()} `;
        const texti = '<p>' + lat + lon + time + '</p>';
        $('#syrus').html(texti);
        const polyLength = polyline.getLatLngs().length;
        const lastPos = polyline.getLatLngs()[polyLength-1];
        if (polyline.isEmpty()||((data.lat != lastPos.lat) && (data.lon != lastPos.lng))){
            polyline.addLatLng([data.lat, data.lon]);
            marker.setLatLng([data.lat, data.lon]);
            markers.push(L.circleMarker([data.lat,data.lon],5).addTo(mymap).setRadius(1));
        }
    }), 5000);


$('.myButton').click(function () {
    $('.info').text('');
    const timeMargin = {initTime: new Date($('#init-date').val()).getTime(),
                      finalTime : new Date($('#final-date').val()).getTime()
                     };

    $.get('/search',timeMargin).done(function (data){
        console.log(data);
    });

});
