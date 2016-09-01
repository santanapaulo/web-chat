'use strict';

var Person = require('../models/person-model')
  , success = require('../models/success-response-model')
  , ctrl = {};

ctrl.findAll = (req, res, next) => {
  Person.findAll()
    .then((persons) => {
      new success.FindMany(persons).send(req, res);
    })
    .catch((err) => {
      next(err);
    });
};

ctrl.findById = (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      new success.FindOne(person).send(req, res);
    })
    .catch((err) => {
      next(err);
    });
};

ctrl.save = (req, res, next) => {
  Person.save(req.body)
    .then((person) => {
      new success.Inserted(person._id).send(req, res);
    })
    .catch((err) => {
      next(err);
    });
};

ctrl.update = (req, res, next) => {
  var person = req.body;
  person._id = req.params.id;

  Person.update(person)
    .then((data) => {
      new success.Updated(person._id).send(req, res);
    })
    .catch((err) => {
      next(err);
    });
};

ctrl.remove = (req, res, next) => {
  Person.remove(req.params.id)
    .then((data) => {
      new success.Removed().send(req, res);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = ctrl;
