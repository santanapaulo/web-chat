'use strict';

var success = require('../models/success-response-model')
  , ctrl = {};

ctrl.getProfile = (req, res, next) => {
  let _user = req.user;
  delete _user.password;
  new success.FindOne(_user).send(req, res);
};

module.exports = ctrl;
