

var server = require("http").createServer();

var socket = require("socket.io")(server, { serveClient: false })

socket.on("connection", function(client) {
    console.log(client.client.request.url)
    
    client.on("message", function(from, message){
        console.log("receive message from client %s", from)
        client.broadcast.emit("message", {from:from, message:message})
    })
    
    client.on("disconnect", function(from){
        console.log("client %s disconnect", from)
    })
})


server.listen(process.env.PORT, function() {
    console.log("%s started on port: %s", process.env.UNIT_NAME, process.env.PORT)
})
