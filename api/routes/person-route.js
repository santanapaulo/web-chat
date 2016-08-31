'use strict';

var express = require('express')
  , route = express.Router()
  , ctrl = require('../controllers/person-controller');

route.get('/people', ctrl.findAll);
route.get('/person/:id', ctrl.findById);
route.post('/persons', ctrl.save);
route.put('/person/:id', ctrl.update);
route.delete('/person/:id', ctrl.remove);

module.exports = route;
