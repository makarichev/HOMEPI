var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'launcher.service',
  description: 'HOMEPI launcher service',
  script: __dirname + '\\..\\..\\launcher\\index.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log("instaled OK")
  svc.start();
});

svc.install();