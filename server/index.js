'use strict'

var server = require('./app');
var server_port = process.env.PORT || 3000;

var oracledb = require('oracledb');
var db_config = require('./database/dbconfig.js');
//var conn_object = require('./database/connection_object.js');

oracle_connection = null;

function initDBConnection() {
    //return oracledb.getConnection(db_config) //ABRO LA CONEXIÓN A LA DB 
    return new Promise((resolve, reject) => {
        oracledb.getConnection(db_config, (err, connection) => {
            if (err) {
                reject()
            } else {
                oracle_connection = connection;
                resolve()
            }
        })

    })
}

function initWebServer() {
    return server.listen(server_port) //LEVANTO EL SERVIDOR
}

initDBConnection()
    .then(connection => {
        console.log(`database connection was successfull...`);
        //oracle_connection = connection;
        return initWebServer();
    })
    .then(() => {
        console.log(`webserver listening on http://localhost: ${server_port}...`);
        //conn_object.setConnectionObject(oracle_connection);
    })
    .catch(error => {
        console.log("Error: ", error);
        if (oracle_connection) return connection.close() //CIERRO LA CONEXIÓN SI ES QUE SE ABRIO
    });







