'use strict'

var oracledb = require('oracledb');
var db_config = require('../database/dbconfig.js');
var db = require('../database/queries/query_cities');
//var conn_object = require('../database/connection_object.js');

var object_format = { outFormat: oracledb.OBJECT };
var auto_commit = { autoCommit: true };


function getFavoriteCities(context) {
    return oracle_connection.execute(db.get_favorites, {}, object_format)
        .then((results) => {
            if (context === 'API') {
                return res.send(results.rows);
            } else if (context === 'SOCKET_IO') {
                io.emit('change', results.rows);
                return res.send();
            }
        })
        .catch(error => console.log(error));
}

function postVote(req, res, next) {
    return connection.execute(db.post_vote, { ID: { val: req.body.ID } }, auto_commit)
        .then(() => {
            return res.send(results); //ESTARA BIEN EL RETURN??
        })
        .catch(error => console.log(error));
}

module.exports = {
    getFavoriteCities,
    postVote
}