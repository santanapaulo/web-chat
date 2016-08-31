'use strict';

var error = require('./error-model')
  , mongoose = require('mongoose')
  // , userModel = mongoose.model('../models/user-model')
  , personModel = new mongoose.Schema({
      name: { type: mongoose.Schema.Types.String, trim: true },
      birthDate: { type: mongoose.Schema.Types.Date, default: null },
      sex: { type: mongoose.Schema.Types.String, enum: ['Male', 'Female'] },
      phones: { type: [mongoose.Schema.Types.String], default: [] },
      active: { type: mongoose.Schema.Types.Boolean, default: true }
    })
  , Person = mongoose.model('Person', personModel);

module.exports.findAll = function findAll() {
  return new Promise(function(resolve, reject) {
    let query = { active: true };

    Person.find(query, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.findById = function findById(personId) {
  return new Promise(function(resolve, reject) {
    let query = { _id: personId, active: true };

    Person.findOne(query, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.save = function save(person) {
  return new Promise(function(resolve, reject) {
    new Person(person).save(function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.update = function update(person) {
  return new Promise(function(resolve, reject) {
    let query = { _id : person._id };

    Person.update(query, person, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.remove = function remove(personId) {
  return new Promise(function(resolve, reject) {
    let query = { _id : personId }
      , mod = { active: false };

    Person.update(query, mod, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};
