var settings = require("./../settings.json")
var Configurator = require("./configurator.js")

var path = require("path")

module.exports = function(__path) {

    var _this = this;

    this.__path = __path;
    
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

    
var configurator1 = require("./configurator.1.js")(this)

    this.configurator = new Configurator(this);



    
}
