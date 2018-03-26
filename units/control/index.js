var Configurator = require("../../lib/configurator.js")
require('socket.io')
var events = require('events')
var util = require('util')


function Unit() {
}


util.inherits(Unit, events.EventEmitter);

Unit.prototype.start = function() {
 
    var self = this;

    var configurator = new Configurator(__dirname);


    configurator.on("init", function (config) {

        var server = require("http")

            .createServer(function (req, res) {
                res.end()
            })

            .listen(config.port, function () {
                console.log('unit: "%s" start on port %s', config.title, config.port)
            })

            self.emit("server", server);
        
        

    })


    this.on("server", function(server) {

        console.log(configurator.config)
        var io = require('socket.io')(server)

        // configurator.initSocket(server, io)

    })

}

var unit = new Unit();
unit.start()


// io.on("connection", function(socket) {

//     console.log("socket connected")

//     socket.on("disconnect", function() {
//         console.log("socket disconnected")
//     })

// })





