//Start pf the Application
console.clear()

//Import from other Files
const stream = require('./js/stream')
const config = require('./js/config.json')
const localSocket = require('./js/localSocket')
const socket = require('./js/io')
//Import from Frameworks 
const {spawn} = require('child_process')
const io = require('socket.io-client')

//Start the Stream
stream(config)

//If the socket receive any data on the "car-control" chanel 
socket.on("car-control", (input)=>{
    //emit the Data on the local Socket 
    localSocket(input)
})

//Starts the python proccesses 
const python = spawn('python', ["-u", './py/controller.py'])
    
//Listen & logs the Python Prints 
python.stdout.on("data", (data)=>{
    console.log("Python: "+ data)
})
