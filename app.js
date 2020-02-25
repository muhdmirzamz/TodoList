var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {

    var q = url.parse(req.url, true);
    var myPath = q.pathname;
    var search = q.search;

    console.log("Path: " + myPath);

    if (myPath === '/todolist.js') {
        console.log("javascipt coming through");

        var h = "." + myPath;

        fs.readFile(h, function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/javascript'});
            res.write(data);
            res.end();
        });
    }

    if (myPath === '/index.css') {
        console.log("css coming through");

        var h = "." + myPath;

        fs.readFile(h, function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/css'});
            res.write(data);
            res.end();
        });
    }

    if (myPath === '/index.html') {
        console.log("index gooo");

        var h = "." + myPath;

        fs.readFile(h, function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });
    }

    if (search != null) {
        console.log("Item: " + q.query.item);
    }
}).listen(8080);