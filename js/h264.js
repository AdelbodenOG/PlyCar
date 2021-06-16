const cp = require("child_process")
const kill  = require('tree-kill');


module.exports = {
    initStream: (config)=>{
        var bitrate = config.rate
        var fps = config.fps
        var stream                                                                                                          // -ih -awb off -awbg 1.0,2.5 -ev 0 -co 50 
        var command = `raspivid -w ${config.width} -h ${config.height} -fps ${fps} -b ${bitrate} -br ${config.brightness} -t 0 -pf baseline -ISO 1600 -awb auto -ex antishake -co 20 -mm average -o - | socat - udp-sendto:${config.ip}:${config.port},shut-none`
        console.log(`Stream send to ${config.ip}:${config.port}`);
        stream = spawner(command)
    }
}



function spawner(command) {
    const process = cp.spawn(command, [], { shell: true })

    process.stdout.on('data', (data) => {
        console.log(`[Streamer]: ${data}`);
    });
      
    process.stderr.on('data', (data) => {
        console.error(`[Streamer Error]: ${data}`);
    });
    
    process.on('close', (code) => {
        console.log(`[Streamer] Process ended: ${code}`);
    });

    return process
}