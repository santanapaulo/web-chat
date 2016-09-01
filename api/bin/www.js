'use strict';

var httpServer = require('http').createServer(app)
  , app = require('../app')
  , env = require('../config/env-config')
  , debug = require('../config/debug-config')('http')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4000 });

var stdin = process.openStdin();
var activeWs;

stdin.addListener("data", (data) => {
  activeWs.send(data.toString());
});

wss.on('connection', function connection(ws) {
  // var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  activeWs = ws;
  ws.on('message', function (message) {
    console.log('received: %s', message);
  });
});

httpServer.on('request', app);

// Mandamos o servidor escutar a porta 3000
httpServer.listen(env.port, function() {
  debug('Servidor escutando a porta ' + httpServer.address().port);
});
