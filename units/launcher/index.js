var path = require('path')
var fs = require("fs")
var childProcess = require("child_process");

var Unit = require("../../lib/unitServer.js");
var unit = new Unit(__dirname);



var runUnits = {};



//контур управления
unit.io.of("/manage").on("connection", function(client) {
  
    client.emit('changed', getHostUnits())

    client.on('install', function(data) {
        install(data);
        client.emit('units', getHostUnits())
    })

    client.on('uninstall', function(data) {
        uninstall(data);
        client.emit('units', getHostUnits())
    })
    
    client.on('start', function(data) {
        startUnit(data, client);
    })
    
    client.on('stop', function(data) {
        stopUnit(data);
        client.emit('units', getHostUnits())
    })


})


function install(_unit) {
    var _index = unit.config.installed.indexOf(_unit.name)
    if (_index < 0) {
        unit.config.installed.push(_unit.name);
        unit.configurator.save();
    }
    console.log('install %s', _unit.name)
}

function uninstall(_unit) {
    var _index = unit.config.installed.indexOf(_unit.name)
    if (_index >= 0) {
        unit.config.installed.splice(_index, 1);
        unit.configurator.save();
    }
    console.log('uninstall %s', _unit.name)
}



function getHostUnits () {

    var unitsPath = path.join(__dirname, './../units');

    var res = [];

    fs.readdirSync(unitsPath).forEach((dir) => {
        var configFile = path.join(unitsPath, dir, 'config.json');
        var content = fs.readFileSync(configFile, 'utf8');
        var _unit = JSON.parse(content);
        

        _unit.installed = unit.config.installed.indexOf(_unit.name) >= 0

        _unit.started = false;

        var process = runUnits[_unit.name];
        if (process) {
            _unit.started = process.started;
            _unit.error = process.error;
        }
        res.push(_unit);
    })
    return res;

}




function startUnit(_unit, initClient) {
    


    var bat = {}
    var unitPath = path.join(__dirname, './../units', _unit.name);


    bat.process = childProcess.spawn('node', ['index.js'], {cwd: unitPath})
    bat.process.stderr.on('data', (data) => {
        bat.started = false;
        if (initClient != null) initClient.emit('changed', getHostUnits())        
    });
      
    bat.started = true;
   
    runUnits[_unit.name] = bat;
      
    if (initClient != null) initClient.emit('changed', getHostUnits())

    console.log('start %s', _unit.title)

}

function stopUnit(_unit, initClient) {
    if (runUnits[_unit.name]) {

        runUnits[_unit.name].process.kill();
        runUnits[_unit.name].started = false

        if (initClient) initClient.emit('changed', getHostUnits())
        
        console.log('stop %s', _unit.title)
    }

}







// var units = getHostUnits();
// units.forEach(function(_unit) {
//     if (_unit.installed) startUnit(_unit, null)
// })
