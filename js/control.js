const gpio = require('pigpio').Gpio;
const net = require('net');
const config = require('./config.json')
var client = new net.Socket()

client.connect({host: config.ip, port: 5050})
var servo = new gpio(4, {mode: gpio.OUTPUT})
var motor = new gpio(14, {mode: gpio.OUTPUT})
var panServo = new gpio(17, {mode: gpio.OUTPUT})
var tiltServo = new gpio(27, {mode: gpio.OUTPUT})
init(1500)
console.log("Setup done")

client.on('data', (data)=>{

    var controls = JSON.parse(data.toString('utf-8'))

    var axis = controls.axis * 500 + 1500 
    var speed = (controls.gear * 100) * controls.speed + 1500
    var pan = controls.pan * 500 + 1500
    var tilt = controls.tilt * 500 + 1500

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