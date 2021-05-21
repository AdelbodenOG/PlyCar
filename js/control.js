const gpio = require('pigpio').Gpio;
const io = require('socket.io-client')
const config = require('./config.json')

var socket = io(`http://${config.ip}`) 
var servo = new gpio(4, {mode: gpio.OUTPUT})
var motor = new gpio(14, {mode: gpio.OUTPUT})
var panServo = new gpio(17, {mode: gpio.OUTPUT})
var tiltServo = new gpio(27, {mode: gpio.OUTPUT})
init(1500)

console.log("Setup done")

var i = 0

module.exports = socket.on("car-control", data =>{

    var axis = data.axis * 500 + 1500 
    var speed = (data.gear * 10 + 1500) + (data.speed * 100)
    var pan = data.pan * 500 + 1510 
    var tilt = data.tilt * 500 + 1510 

    if(data.reverse == 1 && !data.speed == 1){
        //tfd
    }

    console.log(tilt);
    console.log(pan);

    servo.servoWrite(axis)
    motor.servoWrite(speed)
    panServo.servoWrite(pan)
    tiltServo.servoWrite(tilt)
})

function init(def){
    servo.servoWrite(def)
    motor.servoWrite(def)
    panServo.servoWrite(def)
    tiltServo.servoWrite(def)
}