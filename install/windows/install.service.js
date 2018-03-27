var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'launcher.service',
  description: 'HOMEPI launcher service',
  script: __dirname + '\\..\\..\\launcher\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log("instaled OK")
  svc.start();
});

svc.on('error',function(err){
    console.log("instaled error")
    console.log(err)
  });
  
svc.install();