var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {

    var q = url.parse(req.url, true);
    var myPath = q.pathname;

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
        });
    }

    if (myPath === "/sendData") {
        fs.readFile('./todolist.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }

            try {
                if (req.method == 'POST') {
                    req.on('data', function(data) {
                        console.log("Data received: " + data.toString());

                        const customer = JSON.parse(jsonString)

                        // https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
                        customer.items.push(data.toString());

                        var customerString = JSON.stringify(customer);

                        fs.writeFile("./todolist.json", customerString, function(err) {
                            console.log("Done!");
                            
                            res.writeHead(200);
                            res.end();
                        });
                    });
                }
            } catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        });
    }
}).listen(8080);