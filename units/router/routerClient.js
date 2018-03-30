var events = require("events");
var util = require("util");
io = require("socket.io-client");

function RouterClient(unit) {
    var self = this
    this.unit = unit
    this.socket = require("socket.io-client")("http://localhost:3010", {reconnection: true, reconnectionDelay : 10000})

    this.socket.on("message", function(message) {
        this.emit(message)
        console.log("receive message from %s", message.from)
    })
    
    this.socket.on("reconnect", function() {
        console.log("reconnect")
    })
    
    this.socket.on("disconnect", function() {
        console.log("disconnect")
    })


}
RouterClient.prototype.emit = function(message, data) {
    if (this.socket.connected) {
        this.socket.emit("message", this.unit, data)
        console.log("send message")
    }
};


util.inherits(RouterClient, events.EventEmitter);


module.exports = RouterClient;