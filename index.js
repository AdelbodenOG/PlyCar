//Start pf the Application
console.clear()

//Import from other Files
const stream = require("./js/stream.js")
const config = require('./js/config.json')
const control = require('./js/control')

//Start the Stream
console.log("Initialise Stream")
stream(config)

