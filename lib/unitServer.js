var settings = require("./../settings.json")
var path = require("path")
var util = require("util")
var events = require("events")
var Configurator = require("./configurator.js")

var unitServer = function(__path) {

    var _this = this;

    this.__path = __path;
    
    
    var configurator = new Configurator(__path, this);
    configurator.on("configChanged", function(config) {
        console.log(config)
        //_this.config = config;
    })
    
    this.config = require(__path + '/config.json');


    var express = require("express");
    this.app = express();

    this.http = require("http").Server(this.app);
    this.http.listen(this.config.port, function(aaa) {
        console.log('unit: "%s" start on port %s', _this.config.title, _this.config.port)
    })


    this.app.use('/share', express.static(path.join(__dirname, "./../share")));
    this.app.use(express.static(path.join(__path, "/public")));
    
    this.app.get("/", function(req, res) {
        console.log(req.hostname)
         res.sendFile("index.html"); 
    });

    this.app.get("/config", function(req, res) {res.sendFile(path.join(__dirname, "./../share", "config.html"))});


    this.io = require("socket.io")(this.http, {
        // transports: ["websocket"],
        // serveClient: false
    });

    
    var configurator = require("./configurator.js")(__path, this)

    
}



util.inherits(unitServer, events.EventEmitter)


module.exports = unitServer;
