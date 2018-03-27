var util = require("util")
var events = require("events")
var fs = require("fs")
var path = require("path")


function UnitConfigurator(__path) {
    this.__path = __path
    this.configFile = path.join(__path, "config.json");
}

util.inherits(UnitConfigurator, events.EventEmitter)

UnitConfigurator.prototype.watch = function () {

    var self = this;

    var listener = function (config) {
        self.emit("reconfig", config)
    }

    this.on("message", listener);

    this.readConfig();

    var watcher = fs.watch(this.configFile, 'utf-8', function (eventType, filename) {
        self.readConfig();
    })
}

UnitConfigurator.prototype.readConfig = function () {
    var self = this;

    fs.readFile(this.configFile, 'utf-8', function (error, data) {
        if (error) self.emit("error", error)
        else {
            try {
                var config = JSON.parse(data);
                self.emit("message", config)
            }
            catch (ex) { self.emit("error", ex) }
        }
    })

}


UnitConfigurator.prototype.initSocket = function (server) {
    var self = this;


    server.of("/config").on("connection", function (client) {

        client.emit("message", "привет")


        // var listener = function (config) {
        //     client.send(config);
        // }


    })

    //     client.on("get", function () {
    //         self.on("config", function(config) {
    //             client.emit("config", config;
    //         })
    //         self.readConfig();
    //     })

    //     client.on("save", function (newConfig) {
    //         // _this.config = newConfig;
    //         // _this.configurator.save()
    //         // client.emit("config", _this.config);
    //     })

    // })

}


module.exports = UnitConfigurator;