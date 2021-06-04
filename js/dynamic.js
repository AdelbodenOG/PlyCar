var spawn = require('child_process').spawn;
const { StreamCamera, Codec } = require('pi-camera-connect')
const dgram = require('dgram')

const client = dgram.createSocket('udp4')
const EventEmitter = require('events');

module.exports = async function init(config) {
    const pinger = ping("drop.verion.ch")
    let camReay = false
    var rate = 3000000

    var streamCamera = camera(config)

    streamCamera.startCapture()
    camReay = true


    pinger.on("ping", latency => {
        let rateChanged = false
	    let action
        if (latency < 60 && rate < 20862909) {
            rateChanged = true
            rate = Math.round(rate * 1.1)
	        action = "UP"
        }
        if (latency > 80) {
            rateChanged = true
            rate = Math.round(rate * 0.9)
	        action = "DOWN"
        }

        if (rateChanged == true) {
            console.log("----------------");
	        console.log(action)
            console.log(rate);
            console.log(latency);
            console.log("----------------");

            camReay = false
            streamCamera.stopCapture()

            streamCamera = new StreamCamera({
                codec: Codec.MJPEG,
                fps: config.fps,
                width: config.width,
                height: config.height,
                bitRate: rate 
            })

            streamCamera.startCapture()
            camReay = true

            takeFrame()
        }
    })
    
    //Sends the data on the udp Socket 
    async function takeFrame() {
        if (camReay == true) {
            var buffer = await streamCamera.takeImage()
            //console.log(buffer.length);
            client.send(buffer, 0, buffer.length, config.udpPort, config.ip)
        }

        takeFrame()
    }

    takeFrame()
}

function camera(config) {
    var streamCamera = new StreamCamera({
        codec: Codec.MJPEG,
        fps: config.fps,
        width: config.width,
        height: config.height,
        bitRate: 1000000 
    })

    return streamCamera
}

function ping(host) {
    const events = new EventEmitter();
    const pinger = spawn("ping", [`${host}`])
    var latencies = []

    pinger.stdout.on("data", buffer => {
        const data = String(buffer)
        const latency = Number(data.split("time=")[1].match(/\d+/)[0])

        if (latencies.length < 5) {
            latencies.push(latency)
        }
        else {
            const avgLatency = Math.round(average(latencies))
            events.emit("ping", avgLatency)
            latencies = []
        }
    })

    return events
}

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
