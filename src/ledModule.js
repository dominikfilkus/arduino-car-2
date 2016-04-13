module.exports = {
    initLed: initLed
};

var five = require('johnny-five'),
    global = require('./global.js');

var leftLed,
    rightLed;

function initLed() {
    leftLed = new five.Led(12);
    rightLed = new five.Led(2);
    initSocketListeners();
}

function initSocketListeners() {
    global.io.sockets.on('connection', function (socket) {
        socket.on('leds_on', function () {
            leftLed.on();
            rightLed.on();
        });

        socket.on('leds_off', function () {
            leftLed.off();
            rightLed.off();
        });
    });
}