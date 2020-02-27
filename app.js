var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {

    var q = url.parse(req.url, true);
    var myPath = q.pathname;
    var search = q.search;

    console.log("Path: " + myPath);

    if (myPath === '/todolist.js') {
        var h = "." + myPath;

        fs.readFile(h, function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/javascript'});
            res.write(data);
            res.end();
        });
    }

    if (myPath === '/index.css') {
        var h = "." + myPath;

        fs.readFile(h, function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/css'});
            res.write(data);
            res.end();
        });
    }

    if (myPath === '/index.html') {
        var h = "." + myPath;

        fs.readFile(h, function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });
    }

    if (myPath === "/retrieveData") {
        fs.readFile('./todolist.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }

            try {
                const customer = JSON.parse(jsonString)

                var jsonS = JSON.stringify(customer);

                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.write(jsonS);
                res.end();
            } catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        })
    }

    if (search != null) {
        console.log("Item: " + q.query.item);

        fs.appendFile("todolist.txt", q.query.item, function(err) {
            console.log("Item saved");
        });
    }
}).listen(8080);