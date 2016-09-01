'use strict';

const mongoose = require('mongoose')
  , env = require('./env-config')
  , debug = require('./debug-config')('db');

// configure a mongoose connection
mongoose.connect(env.db.uri);

const db = mongoose.connection;

// configure connection listeners
db.on('connected', () => {
  debug('MongoDB connected.');
}).on('open', () => {
  debug('MongoDB open.');
}).on('disconnected', () => {
  debug('MongoDB disconnected.');
}).on('error', (err) => {
  debug('MongoDB error: ' + err);
});

// configure process listener
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('MongoDB disconnected through app termination');
    process.exit(0);
  });
});

module.exports = db;
