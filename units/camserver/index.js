var util = require("util");
var unitServer = require("../../lib/unitServer.js")
var Mpeg1Muxer = require("./mpeg1Muxer.js");
var events = require("events")


function camServer(__path) {
    camServer.super_.apply(this, arguments)

    var self = this
    
    var mpeg1Muxer = new Mpeg1Muxer({url: 'rtsp://admin:3rds-zn5y-383q@192.168.1.64:554'})

    this.io.on("connection", function(socket) {

        console.log("connect")
        var sender = function(data) {
            socket.send(data, {binary: true})
        }

        var streamHeader = new Buffer(8);
        streamHeader.write("jsmp");
        streamHeader.writeUInt16BE(640, 4);
        streamHeader.writeUInt16BE(480, 6);
        socket.send(streamHeader, {binary: true});


        mpeg1Muxer.on('mpeg1data', sender);

        socket.on('disconnect', function() {
            console.log("disconnect")
            mpeg1Muxer.removeListener('mpeg1data', sender);
        })
    })

    return this
};

util.inherits(camServer, unitServer);



if (!module.parent) {
    var unit = new camServer(__dirname);
}

else module.exports = camServer;

