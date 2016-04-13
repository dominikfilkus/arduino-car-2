var ledControl = (function() {
    var turnedOn,
        socket = io.connect('http://localhost');

    /**
     * @name ledControl#switchLEDs
     * @public
     * @description Switch the state of the LEDs between on and off.
     * @param keyCode The code of the key which is pressed
     */
    var switchLEDs = function(keyCode) {
        if (keyCode === 32) {
            if (turnedOn) {
                socket.emit('leds_off');
                turnedOn = false;
            } else {
                socket.emit('leds_on');
                turnedOn = true;
            }
        }
    };


    return {
        switchLEDs: switchLEDs
    };
})();