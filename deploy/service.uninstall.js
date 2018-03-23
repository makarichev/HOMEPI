var settings = require('./../settings.json');
var path = require('path');

var _moduleName = process.argv[2]
var Service

if (process.platform)
  Service = require('node-windows').Service;
else
  Service = require('node-windows').Service;

var _settings = settings[_moduleName]
var _name = 'HOMPI.' + _moduleName.toUpperCase()
var _description = 'HOMPI.' + _moduleName.toUpperCase() + '.' + _settings.port
var _path = path.join(_moduleName, _moduleName + ".js");


// Create a new service object
var svc = new Service({
  name: _name,
  description: _description,
  script: _path
});





// // Listen for the "install" event, which indicates the
// // process is available as a service.
svc.on('install',function(){
   console.log('service started')
   svc.start();
});

svc.on('uninstall',function(){
  console.log('service uninstal')
});

svc.on('uninstall',function(){
   console.log('uninstall')
});


svc.uninstall();
//svc.install();