//Start pf the Application
console.clear()

const gpio = require('pigpio').Gpio;

var motor = new gpio(14, {mode: gpio.OUTPUT})

motor.servoWrite(1500)

//Import from other Files
const stream = require("./js/stream.js")
const config = require('./js/config.json')
const control = require('./js/control')

//Start the Stream
console.log("Initialise Stream")
stream(config)

