'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

//CARGO RUTAS
var user_routes = require('./routes/cities')

//CARGO MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false })); //EN CADA PETICIÓN SE EJECUTARÁ ESTE MIDDLEWARE
app.use(bodyParser.json()); //CONVIERTE LA INFO QUE RECIBA EN PETICIÓN A JSON
app.use(user_routes);

module.exports = server;