var net = require('net');

var client = new net.Socket()

client.connect({host: "192.168.60.91", port: 8000})

client.on('data',(data)=>{
    console.log(data.toString('utf-8'));
})