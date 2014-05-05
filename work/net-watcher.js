'use strict';
const
fs = require('fs'),
net = require('net'),
filename = process.argv[2],
server = net.createServer(function(connection) {
    console.log("Subscriber connected.");
    let json = JSON.stringify({
        type: 'watching',
        file: filename,
        timestamp: Date.now()
    });
    connection.write(json + "\n");
    let watcher = fs.watch(filename, function() {
        let json = JSON.stringify({
            type: 'changed',
            file: filename,
            timestamp: Date.now()
        });
        connection.write(json + "\n");
    });
    connection.on('close', function() {
        console.log("SUbscriber disconnected.");
        watcher.close();
    })
});
if (!filename) {
    throw Error('No target filename was specified');
}
server.listen(5432, function() {
    console.log("LIstening for sbscribers.");
});