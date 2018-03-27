var UnitBase = require("../../lib/unitBase.js")
var util = require("util")
var http = require("http")

function TestUnit(__path) {
    UnitBase.call(this, __path)
    var self = this

    this.on("started", function(config) {
    })
    
}

util.inherits(TestUnit, UnitBase)

// TestUnit.prototype.start = function() {
//     UnitBase.prototype.start.call(this)
//     console.log("child start call")
// }





if (!module.parent) {

    var unit = new TestUnit(__dirname);
    
    unit.on("childServerStarted", function(port) {
        console.log("child server started on %s", port)
    })

    unit.on("started", function(config) {
        unit.testconnect("get", "/config");
    })

    
    unit.start();

}

module.exports = TestUnit;


