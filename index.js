//Start pf the Application
console.clear()

const config = require('./js/config.json')
const ucon = require("./js/ucon")
const server = ucon.client(config.ip, config.port)
var telemetry


const control = require('./js/control')
const h264 = require('./js/h264')
//telemetry = require('./js/telemetry')

function init() {
    control.init(server,config)
    h264.initStream(config)
    if(telemetry){
        telemetry.init(server, config)
    }
}

init()