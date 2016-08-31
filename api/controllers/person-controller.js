'use strict';

var Person = require('../models/person-model')
  , success = require('../models/success-response-model')
  , ctrl = {};

ctrl.findAll = function(req, res, next) {
  Person.findAll()
    .then(function(persons) {
      new success.FindMany(persons).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.findById = function(req, res, next) {
  Person.findById(req.params.id)
    .then(function(person) {
      new success.FindOne(person).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.save = function(req, res, next) {
  Person.save(req.body)
    .then(function(person) {
      new success.Inserted(person._id).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.update = function(req, res, next) {
  var person = req.body;
  person._id = req.params.id;

  Person.update(person)
    .then(function(data) {
      new success.Updated(person._id).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.remove = function(req, res, next) {
  Person.remove(req.params.id)
    .then(function(data) {
      new success.Removed().send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

module.exports = ctrl;
