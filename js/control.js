const gpio = require('pigpio').Gpio;
const io = require('socket.io-client')
const config = require('./config.json')

var socket = io(`http://${config.ip}`) 
var servo = new gpio(4, {mode: gpio.OUTPUT})
var motor = new gpio(14, {mode: gpio.OUTPUT})
motor.servoWrite(1500)

console.log("Setup done")

module.exports = socket.on("car-control", data =>{
    var axis = data.axis * 500 + 1500
    var speed = (data.gear * 10 + 1500) + (data.speed * 100)
    console.log(speed);
    servo.servoWrite(axis)
    motor.servoWrite(speed)
})
