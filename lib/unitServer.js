var settings = require("./../settings.json")
var path = require("path")
var util = require("util")
var events = require("events")
var Configurator = require("./configurator.js")

function unitServer(__path) {

    var self = this;

    this.__path = __path;
    
    
    var configurator = new Configurator(__path, this);
    
    configurator.on("init", function(config) {
        self.config = config;
        self.http.listen(self.config.port, function(aaa) {
            console.log('unit: "%s" start on port %s', self.config.title, self.config.port)
        })
    
    })



    var express = require("express");
    this.app = express();

    this.http = require("http").Server(this.app);


    this.app.use('/share', express.static(path.join(__dirname, "./../share")));
    this.app.use(express.static(path.join(__path, "/public")));
    
    this.app.get("/", function(req, res) {
         res.sendFile("index.html"); 
    });

    this.app.get("/config", function(req, res) {res.sendFile(path.join(__dirname, "./../share", "config.html"))});


    this.io = require("socket.io")(this.http, {
        // transports: ["websocket"],
        // serveClient: false
    });

    
    

    configurator.initUnit(this)
    

    this.configio = function(io) {


    }

    
}



util.inherits(unitServer, events.EventEmitter)


unitServer.prototype.configio = function(io) {


}





module.exports = unitServer;
