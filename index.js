//Start pf the Application
console.clear()

const config = require('./js/config.json')
const ucon = require("./js/ucon")
const server = ucon.client(config.ip, config.port)

const control = require('./js/control')
const stream = require('./js/stream')
//const telemetry = require('./js/telemetry')

function init() {
    stream.initStream()
}


init()
