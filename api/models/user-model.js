'use strict';

var mongoose = require('mongoose')
  , userSchema = new mongoose.Schema({
      name: { type: mongoose.Schema.Types.String, required: true, trim: true },
      password: { type: mongoose.Schema.Types.String, required: true, trim: true }
    })
  , User = mongoose.model('User', userSchema);

module.exports.authenticate = function authenticate(name, password) {
  return new Promise((resolve, reject) => {
    let _query = {
      name: name
    , password: password
    };

    User.findOne(_query, (err, user) => {
      if(err) {
        reject(err);
      } else {
        if(user) {
          resolve(user);
        } else {
          reject(err);
        }
      }
    });

  });
};
