// Import dependencies
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

// Initialize Express App
var app = express();
var port = process.env.PORT || 8080;

// Middleware
app.use(favicon(__dirname + '/favicon.ico'));

// Route handling
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/whoami', function(req, res) {
  var languageStr = req.headers['accept-language'];
  var softwareStr = req.headers['user-agent'];
  var languageSubStr = languageStr.substring(0, languageStr.indexOf(','));
  var softwareSubStr = softwareStr.substring(softwareStr.indexOf('(') + 1, softwareStr.indexOf(')'));
  res.json({
    ipaddress: req.connection.remoteAddress,
    language: languageSubStr,
    software: softwareSubStr
  });
});

// Server initialization
app.listen(port);
console.log('Listening on port ' + port);
