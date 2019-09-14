// jshint esversion: 6
const sqlite3 = require('sqlite3').verbose();
exports.decode = (msg) => {
    let message = msg.toString();
    const numWeeks = parseInt(message.slice(6, 10));
    const numDay = parseInt(message[10]);
    const dayTime = parseInt(message.slice(11, 16)) - (5 * 3600);
    const totalSeconds = (numWeeks * 604800) + (numDay * 86400) + dayTime;
    const totalMilis = totalSeconds * 1000;
    const date = new Date(totalMilis + new Date(1980, 0, 6).getTime()).toString();
    const lon = parseInt(message.slice(24, 33)) / 100000;
    const lat = parseInt(message.slice(16, 24)) / 100000;
    return {
        $lat: lat,
        $lon: lon,
        $time: date
    };

};

exports.insert = (msg) => {
    let db = new sqlite3.Database('./syrusDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the syrus database.');
    });
    db.run(`INSERT INTO SyrusData(Latitude,Longitude,Time) VALUES($lat,$lon,$time)`, msg, function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log('inserted object successfully');
    });
    db.close();
};


exports.get = (request,response) => {
    let db = new sqlite3.Database('./syrusDB.db');
    db.get(`SELECT Latitude lat, Longitude lon, Time time FROM SyrusData WHERE Num = (SELECT Max(Num) FROM SyrusData);`, (err, row) => {
        if (err) {
            return console.error(err.message);
        }else{
            response.json(row);
        }
    });
    db.close();
};
