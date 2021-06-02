const gpio = require('pigpio').Gpio;
const config = require('./config.json')
const ucon = require("./ucon")

const client = ucon.client(config.ip, config.port)

var servo = new gpio(4, {mode: gpio.OUTPUT})
var motor = new gpio(14, {mode: gpio.OUTPUT})
var panServo = new gpio(17, {mode: gpio.OUTPUT})
var tiltServo = new gpio(27, {mode: gpio.OUTPUT})

client.on("data", data => {
    var controls = JSON.parse(data.toString())

    var axis = controls.axis * 500 + 1500
    var speed = (controls.gear * config.gearStrength) * controls.speed + 1550
    var pan = controls.pan * 500 + 1500
    var tilt = controls.tilt * 500 + 1500

    console.log(speed)

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

init(1500)