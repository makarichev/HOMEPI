var http = require("http")
var io = require("socket.io")
var util = require("util")
var events = require("events")
var UnitConfigurator = require("./UnitConfigurator.js")


function UnitBase(__path) {
    
    this.__path = __path
}

util.inherits(UnitBase, events.EventEmitter)

UnitBase.prototype.start = function() {

    var self = this;

    var configurator = new UnitConfigurator(this.__path)
    configurator.on('error', function(data) {console.log(data)});
    
    configurator.on('reconfig', function(config) {
        


        var app = require("express");
        var server = require("http").Server(app);
        var io = require("socket.io")(server);
        
        server.listen(config.port, function() {
            configurator.initSocket(io);
            self.config = config;

            console.log("unit started on port: %s", self.config.port)
            self.emit("started", config);
    
        })
    });

    configurator.watch();
}


//тестовыe методы
UnitBase.prototype.testconnect = function(message, ns) {

        var client = require("socket.io-client")('http://localhost:' + this.config.port + ns);
        client.emit("message", message);
        client.disconnect();
}


module.exports = UnitBase;

