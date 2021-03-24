console.clear()

var dgram = require('dgram')
var socket = dgram.createSocket('udp4')
const PORT = 8888

socket.on('error',(error)=>{
    console.log(error);
})

socket.on('message', (msg, info)=>{
    console.log("Message: " + msg);
    console.log("Message received from: "+ JSON.stringify(info))
})
socket.bind(PORT)

console.log("Socket open on port: " + PORT);