var http = require('http'),
    exec = require('child_process').exec,
    config = require('./config')


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  
  exec("df -lh", function(error, stdout, stderr) {

   	var lines = stdout.trim().split('\n'),
        header = lines.shift().split(/[\s]+/),
        drives = [];

    for(var line = 0; line < lines.length; line++) {
      var drive = {},
          properties = lines[line].split(/[\s]+/);

      for(var prop = 0; prop<header.length; prop++) {
        drive[header[prop].toLowerCase()] = properties[prop];
      }
      drives.push(drive);
    }

   	res.end(JSON.stringify(drives));
   });

}).listen(config.port, config.host);