module.exports = {
    initServo: initServo
};

var five = require('johnny-five'),
    global = require('./global.js');

var frontServo,
    rightServo,
    leftServo;

function initServo() {
    frontServo = new five.Servo.Continuous(9);
    rightServo = new five.Servo.Continuous(10);
    leftServo = new five.Servo.Continuous(11);

    initSocketListeners();
}

function initSocketListeners() {
    global.io.sockets.on('connection', function (socket) {
        socket.on('servo_forward', function () {
            rightServo.cw();
            leftServo.ccw();
        });

        socket.on('servo_backward', function () {
            rightServo.ccw();
            leftServo.cw();
        });

        socket.on('servo_stop', function() {
            rightServo.stop();
            leftServo.stop();
        });

        socket.on('servo_front_stop', function() {
            frontServo.stop();
        });

        socket.on('servo_right', function() {
            frontServo.ccw();
        });

        socket.on('servo_left', function() {
            frontServo.cw();
        });
    });
}