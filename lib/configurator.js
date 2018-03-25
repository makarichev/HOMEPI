var fs = require("fs")
var path = require("path")
var util = require("util")
var events = require("events")

var configurator = function(__path, unit) {


    var configFile = path.join(__path, "config.json");
    //this.emit("configChanged", [1,2,3])


    this.save = function() {
        var configFile = path.join(unit.__path, 'config.json');

        fs.writeFile(configFile, JSON.stringify(unit.config, null, 4), function(err) {
             if(err) {
                 return console.log(err);
             }
        });

        console.log("unit config saved")
    }





}

util.inherits(configurator, events.EventEmitter)

module.exports = configurator;