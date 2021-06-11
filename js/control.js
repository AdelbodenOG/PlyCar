const gpio = require('pigpio').Gpio;
const config = require('./config.json')
const ucon = require("./ucon")
const stream = require("./stream")

const client = ucon.client(config.ip, config.port)


var servo = new gpio(16, {mode: gpio.OUTPUT})
var motor = new gpio(21, {mode: gpio.OUTPUT})
var panServo = new gpio(17, {mode: gpio.OUTPUT})
var tiltServo = new gpio(27, {mode: gpio.OUTPUT})

client.on("car-control", (data)=> {
    var controls = data

    var axis = controls.axis * 500 + 1500 
    var speed = (controls.gear * config.gearStrength) * controls.speed + 1540
    var pan = controls.pan * 500 + 1350
    var tilt = controls.tilt * 500 + 1550 

    //console.log(speed)

    servo.servoWrite(axis)
    motor.servoWrite(speed)
    panServo.servoWrite(pan)
    tiltServo.servoWrite(tilt)
})
client.on("bitrate", (data)=>{
    if(data.status == 'up'){
        var rate = config.rate + config.rateUpdate
        config.rate = rate
    }
    else if(data.status == 'down'){
        var rate = config.rate - config.rateUpdate
        config.rate = rate
    }

    stream(config, true)
})

function init(def){
    servo.servoWrite(def)
    motor.servoWrite(def)
    panServo.servoWrite(def)
    tiltServo.servoWrite(def)
}

init(1500)
