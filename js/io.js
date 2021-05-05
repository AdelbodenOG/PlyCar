//Config to connect to the Socket on the Server
const io = require('socket.io-client')
const config = require('./config.json')

//Creats the connection
module.exports = socket = io(`http://${config.ip}`)