
var RrouterClient =  require('./routerClient.js')

console.clear()
console.log("TEST APP STARTED")

var server = require("http").createServer();
server.listen(3001, function() {
    console.log("client1 started on port: %s", 3001)
})



var client = new RrouterClient('client1')

setInterval(function() {

    client.emit({message:'blablabla'})
    
}, 2000)
    
