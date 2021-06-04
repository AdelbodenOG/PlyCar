//Stream the Video Data from the PyCamera to the Server
const { StreamCamera, Codec } = require('pi-camera-connect')
const dgram = require('dgram')
const client = dgram.createSocket('udp4')
var streamCamera

//Function to init the Stream
module.exports = async function initStream(config, rebuild){
    if(rebuild == true){
        streamCamera.stopCapture()
    }
    streamCamera = new StreamCamera({
        codec: Codec.MJPEG,
        fps: config.fps,
        width: config.width,
        height: config.height,
        bitRate: config.rate 
    })
    
    //Start Capture
    streamCamera.startCapture()
    
    //Sends the data on the udp Socket 
    while(true){
        var buffer = await streamCamera.takeImage()
        client.send(buffer, 0, buffer.length, config.udpPort, config.ip)

    }
}
