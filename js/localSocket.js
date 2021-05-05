//Creates a local Socket on port 7070 to communicate with the Python Scripts
const express = require('express')
const app = express()
const port = 7070
const server = require('http').createServer(app)
const io = require('socket.io')(server)

//If somone connects to the Socket
io.on("connect", client =>{
    console.log("new client connected: " + client.handshake.headers["user-agent"])
})

//Export to emit something on the Socket
module.exports = function emitControl(data){
    io.sockets.emit("car-control", data)
}

//Listen on the Port 7070
server.listen(port, ()=>{
    console.log("Server open on port: " + port)
})