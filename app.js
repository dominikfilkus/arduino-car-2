'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').Server(app),
    global = require('./src/global.js');

global.io = require('socket.io')(server);

var boardModule = require('./src/boardModule.js'),
    servoModule = require('./src/servoModule'),
    ledModule = require('./src/ledModule');

server.listen(80);

app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('dist/js'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

boardModule.initBoard().then(function() {
    servoModule.initServo();
    ledModule.initLed();
});

