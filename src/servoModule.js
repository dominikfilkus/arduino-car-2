module.exports = {
    initServo: initServo
};

var five = require('johnny-five'),
    global = require('./global.js');

var rightServo,
    leftServo;

function initServo() {
    rightServo = new five.Servo.Continuous(10);
    leftServo = new five.Servo.Continuous(11);

    initSocketListeners();
}

function initSocketListeners() {
    global.io.sockets.on('connection', function (socket) {
        socket.on('servo_forward', function () {
            rightServo.cw();
            leftServo.ccw();
            socket.emit('right_servo_cw');
            socket.emit('left_servo_ccw');
        });

        socket.on('servo_backward', function () {
            rightServo.ccw();
            leftServo.cw();
            socket.emit('right_servo_ccw');
            socket.emit('left_servo_cw');
        });

        socket.on('servo_right', function() {
            rightServo.ccw();
            leftServo.ccw();
            socket.emit('right_servo_ccw');
            socket.emit('left_servo_ccw');
        });

        socket.on('servo_left', function() {
            rightServo.cw();
            leftServo.cw();
            socket.emit('right_servo_cw');
            socket.emit('left_servo_cw');
        });

        socket.on('servo_stop', function() {
            rightServo.stop();
            leftServo.stop();
            socket.emit('right_servo_stop');
            socket.emit('left_servo_stop');
        });
    });
}