var express = require('express');
var path = require("path")

var server = require("http").createServer()
var app = require('express')(server);





var port = process.env.PORT || '3000';
server.listen(port, function() {
  console.log("board started on port: %s", port)
})




app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client", "index.html"))
})

app.use("/share", express.static(path.join(__dirname, "./public")));



