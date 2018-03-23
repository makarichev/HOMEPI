var express = require("express");

var Unit = require("./../../lib/unitServer.js");

var unit = new Unit(__dirname);


unit.io.on("connect", function(client) {

    client.on("scan", function() {

        client.emit("scanresult", [1,2,3,4,5])

        //test
    })

})

