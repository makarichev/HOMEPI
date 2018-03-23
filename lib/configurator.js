var fs = require("fs")
var path = require("path")
module.exports = function(unit) {

    this.save = function() {
        var configFile = path.join(unit.__path, 'config.json');

        fs.writeFile(configFile, JSON.stringify(unit.config, null, 4), function(err) {
             if(err) {
                 return console.log(err);
             }
        });

        console.log("unit config saved")
    }


}