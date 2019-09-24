// jshint esversion: 6

const mysql = require('mysql');

exports.decode = (msg) => {
    const message = msg.toString();
    const numWeeks = parseInt(message.slice(6, 10));
    const numDay = parseInt(message[10]);
    const dayTime = parseInt(message.slice(11, 16)) - (5 * 3600);
    const totalSeconds = (numWeeks * 604800) + (numDay * 86400) + dayTime;
    const totalMilis = totalSeconds * 1000;
    const date = totalMilis + (new Date(1980, 0, 6).getTime());
    const lon = parseInt(message.slice(24, 33)) / 100000;
    const lat = parseInt(message.slice(16, 24)) / 100000;
    return {
        lat: lat,
        lon: lon,
        time: date
    };

};

exports.insert = (msg) => {
    const con = mysql.createConnection({
        host: "database-1.cgh4kgpy7rzv.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "dinosaurio.99",
        database: "DesignDB"
    });

    con.connect();
    const sql = `INSERT INTO SyrusData(Latitude,Longitude,Time) VALUES(${msg.lat},${msg.lon},'${msg.time}')`;
    con.query(sql,function(err, result) {
        if (err) throw err;
        console.log("record inserted");
    });
    con.end();
};


exports.get = (request, response) => {
    const con = mysql.createConnection({
        host: "database-1.cgh4kgpy7rzv.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "dinosaurio.99",
        database: "DesignDB"
    });

    con.connect();
    const sql = "SELECT Latitude AS lat, Longitude AS lon, Time AS time FROM SyrusData WHERE Num = (SELECT Max(Num) FROM SyrusData);";
    con.query(sql, function(err, result) {
        if (err) throw err;
        response.json(result[0]);
    });
    con.end();
};
