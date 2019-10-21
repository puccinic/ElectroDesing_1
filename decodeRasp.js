
const mysql = require('mysql');
const request = requiere('request');

const dbCon = {
    host: "database-1.cgh4kgpy7rzv.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "dinosaurio.99",
    database: "DesignDB"
};


exports.insert = (req, res) => {
    const stateKeys = Object.keys(req.body.Estados); 
    const stateValues = Object.values(req.body.Estados);
    const con = mysql.createConnection(dbCon);
    con.connect();
    const sql = `INSERT INTO ${req.body.Tablero}(${stateKeys},time) VALUES(${stateValues},${req.body.Fecha})`;
    con.query(sql,function(err, result) {
        if (err) throw err;
        console.log("record inserted");
    });
    con.end();
};

exports.get = (req, res) => {
    const con = mysql.createConnection(dbCon);

    con.connect();
    const sql = `SELECT * FROM ${req.body.Tablero} WHERE Num = (SELECT Max(time) FROM ${req.body.Tablero});`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.json(result[0]);
    });
    con.end();
};

exports.search = (req, res) => {
    const con = mysql.createConnection(dbCon);
    con.connect();
    const sql = `SELECT * FROM ${req.body.Tablero}
                WHERE time BETWEEN ${req.body.initTime} and ${req.body.finalTime}
                ORDER BY time;`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        response.json(result);
    });
    con.end();
};

exports.change = (req, res) => {

};

