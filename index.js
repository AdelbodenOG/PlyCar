//Start pf the Application
console.clear()

//Import from other Files
const stream = require('./js/stream')
const config = require('./js/config.json')

//Import from Frameworks 
const {spawn} = require('child_process')

//Start the Stream
console.log("Initialise Stream")
stream(config)

//Starts the python proccesses 

const python = spawn('python', ["-u", './py/control.py'])
    
//Listen & logs the Python Prints 
python.stdout.on("data", (data)=>{
    console.log("Python: "+ data)
})
