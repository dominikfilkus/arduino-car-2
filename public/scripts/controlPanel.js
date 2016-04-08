(function() {
    document.onkeydown = checkKeyDown;
    document.onkeyup = checkKeyUp;

    function checkKeyDown(e) {
        servoControl.moveServos(e.keyCode);
    }

    function checkKeyUp(e) {
        servoControl.stopServos(e.keyCode);
    }

}());