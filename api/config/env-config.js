'use strict';

var env = {
  appName: 'web-chat',
  port: process.env.API_PORT || 3000,
  defaultLocale: 'en',
  defaultMessage: 'unespected-error',
  db: {
    uri: 'mongodb://localhost/webChat',
    // credentials: {
    //   name: 'PAULO',
    //   pass: 'PASS'
    // }
  }
};

module.exports = env;
