var http = require('http'),
    exec = require('child_process').exec,
    config = require('./config')


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});

  exec("df -lh", function(error, stdout, stderr) {

   	var lines = stdout.trim().split('\n'),
        header = lines.shift().split(/[\s]+/),
        drives = [];


    lines.forEach(function(line, index, array) {
      var drive = {},
          properties = line.split(/[\s]+/);

      properties.forEach(function(property, index, array) {
        drive[header[index].toLowerCase()] = property; 
      });

      drives.push(drive);
    });


   	res.end(JSON.stringify(drives));
   });

}).listen(config.port, config.host);