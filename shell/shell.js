const pty = require("node-pty")
const os = require("os")
const io = require('socket.io-client')
const config = require('../js/config.json')

socket = io(`http://${config.ip}`) 

function init(ip, socket) {
    const shellType = os.platform() === "win32" ? "powershell.exe" : "bash"

    const shell = pty.spawn(shellType, [], {
        name: "xterm-color",
        cols: 80,
        rows: 80,
        cwd: process.env.HOME,
        env: process.env
    });

    console.log(`shell ready [${ip}]`)

    socket.on("shell-in", data => {
        shell.write(data)
    })

    socket.on("shell-resize", data => {
        shell.resize(data.cols, data.rows)
    })

    shell.on("data", data => {
        socket.emit("shell-out", data)
    })
}

init(config.ip, socket)
