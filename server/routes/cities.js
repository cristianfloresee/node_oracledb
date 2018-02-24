'use strict'

var express = require('express');
var city_controller = require('../controllers/cities');

var api = express.Router();

api.get('/orcl12c', (req, res, next) => city_controller.getFavoriteCities('SOCKET_IO'));
api.get('/api/super-cities', (req, res, next) => city_controller.getFavoriteCities('API'));
api.post('/api/vote', city_controller.postVote);

module.exports = api;
