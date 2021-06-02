//Start pf the Application
console.clear()

//Import from other Files
const stream = require("./js/dynamic")
const config = require('./js/config.json')
const control = require('./js/control')

//Start the Stream
console.log("Initialise Stream")
stream(config)

