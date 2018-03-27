var fs = require("fs")
var path = require("path")
var util = require("util")
var events = require("events")

var configurator = function(__path, unit) {

    var self = this;
    
    var defaultConfigFile = path.join(__path, "config.json");
    var configFile = path.join(__path, "config.local");

    var readConfig = function() {
        fs.readFile(configFile, 'utf-8', function(err, data) {
            self.emit("init", JSON.parse(data))
        })
    }


    fs.exists(configFile, function(exists) {
        if (!exists) fs.copyFile(defaultConfigFile, configFile, function(err) {
            readConfig()
        })
        else readConfig()
    })



    this.initUnit = function(unit) {
        unit.io.of("/config").on("connection", function (client) {

            client.on("get", function () {
                client.emit("config", unit.config);
            })
    
            client.on("save", function (newConfig) {
                // _this.config = newConfig;
                // _this.configurator.save()
                // client.emit("config", _this.config);
            })
    
        })

    }

    this.save = function() {
        var configFile = path.join(unit.__path, 'config.json');

        fs.writeFile(configFile, JSON.stringify(unit.config, null, 4), function(err) {
             if(err) {
                 return console.log(err);
             }
        });

        console.log("unit config saved")
    }


    return this;


}

util.inherits(configurator, events.EventEmitter)

module.exports = configurator;