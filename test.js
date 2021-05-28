const gpio = require('pigpio').Gpio;

var motor = new gpio(14, {mode: gpio.OUTPUT})

var yee = true
var start = 1550
var stop = 1700
var step = 10
                 
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

motor.servoWrite(1500)
sleep(1000)

while(yee){
    //try{
        motor.servoWrite(start)
        console.log(start);
        start += step
        sleep(500)

        if(start == stop){
            yee = false
        }
    /*}
    catch(error){
        console.log("An Error on Freq: " + start);
    }*/
}