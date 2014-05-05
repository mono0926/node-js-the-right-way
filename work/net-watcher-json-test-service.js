"use strict";
const
net = require('net'),
server = net.createServer(function(connection) {
    console.log("Subscriber connected");
    connection.write('{"type": "changed", "file": "targ"');

    let timer = setTimeout(function() {
        connection.write('et.txt", "timestamp":1358175658495}' + "\n");
        connection.end();
    }, 1000);
    connection.on('end', function() {
        clearTimeout(timer);
        console.log("'subscriber disconnected");
    })
});
server.listen(5432, function() {
    console.log("Test server lisning for subscribers...");
})