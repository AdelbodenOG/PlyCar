//Stream the Video Data from the PyCamera to the Server
const { StreamCamera, Codec } = require('pi-camera-connect')
const dgram = require('dgram')
const client = dgram.createSocket('udp4')

//Function to init the Stream
module.exports = async function initStream(config){
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG,
        fps: config.fps,
        width: config.width,
        height: config.height,
        bitRate: config.rate * 10000 ///1000000
    })
    
    //Start Capture
    streamCamera.startCapture()
    
    //Sends the data on the udp Socket 
    while(true){
        var buffer = await streamCamera.takeImage()
        client.send(buffer, 0, buffer.length, config.port, config.ip)
    }
}
