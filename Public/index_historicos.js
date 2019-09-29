// jshint esversion: 6

let mymap = L.map('mapid').setView([11.0192, -74.8505], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVjY2luaWMiLCJhIjoiY2swOTh3NHA2MDVoczNtbW5odXAybDlxbSJ9.ySZV9JduMLAW8DphUa4Bsg'
}).addTo(mymap);

let markers = [];
let marker = L.marker([51.5, -0.09]).addTo(mymap);
let polyline = L.polyline([], {
    color: 'red'
}).addTo(mymap);

$('.myButton').click(function() {
    const timeMargin = {
        initTime: new Date($('#init-date').val()).getTime(),
        finalTime: new Date($('#final-date').val()).getTime()
    };
    // cambio
    $.get('/search', timeMargin).done(function(data) {
        console.log(data);
        marker.setLatLng([51.5, -0.09]);
        mymap.removeLayer(polyline);
        for(let i = markers.length - 1; i >= 0; i--){
            mymap.removeLayer(markers[i]);
            markers.pop();
        }
        if (data.length != 0){
            let latlngs = [];
            data.forEach(function(row){
                let lastPos = latlngs[latlngs.length-1];
                if(latlngs.length === 0||(row.lat != lastPos[0] || row.lon != lastPos[1])){
                    latlngs.push([row.lat,row.lon]);
                    markers.push(L.circleMarker([row.lat,row.lon], 5).addTo(mymap).setRadius(1));
                }
            });
            polyline = L.polyline(latlngs, {
                color: 'red'
            }).addTo(mymap);
            marker.setLatLng(latlngs[latlngs.length-1]);
            mymap.setView(latlngs[latlngs.length-1],15);
        } else {
            alert('no hay datos disponibles para esa fecha');
        }
    });
});
