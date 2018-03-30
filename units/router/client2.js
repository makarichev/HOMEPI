
var routerClient =  require('./routerClient.js')

console.clear()
console.log("TEST APP STARTED")

var server = require("http").createServer();
server.listen(3002, function() {
    console.log("client1 started on port: %s", 3002)
})



var client = new routerClient('client2')

client.on("message", function(message) {
    console.log("receive message from %s", message.from)
})

// setInterval(function() {
//     socket.send("client2", {message:'blablabla'})
// }, 2000)
