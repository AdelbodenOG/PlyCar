//Stream the Video Data from the PyCamera to the Server
const { StreamCamera, Codec } = require('pi-camera-connect')
const config = require('./config.json')
const ucon = require("./ucon")

var streamCamera
const server = ucon.client(config.ip, config.port)

//Function to init the Stream
module.exports = {
        initStream: async (rebuild)=>{
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
            var b64 = buffer.toString('base64')
            server.send("frame",b64)

        }
    }
}