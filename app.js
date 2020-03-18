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
        fs.readFile('./todolist.json', 'utf8', (err, localJSON) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }

            try {
                const json = JSON.parse(localJSON)

                var jsonString = JSON.stringify(json);

                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.write(jsonString);
                res.end();
            } catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        });
    }

    if (myPath === "/sendData") {
        fs.readFile('./todolist.json', 'utf8', (err, localString) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }

            try {
                if (req.method == 'POST') {

                    console.log(req.headers['content-type']);

                    if (req.headers['content-type'] == "application/json") {
                        console.log("Content type is application/json");

                        req.on('data', function(data) {

                            var dataReceived = data.toString();
    
                            console.log("Data received: " + data.toString());
    
                            // turn data received into JSON object
                            const receivedJSON = JSON.parse(dataReceived);

                            // turn result from readFile to JSON object
                            const localJSON = JSON.parse(localString);



                            if (localJSON.categories == null) {
                                var categories = [];
                                // categories.push(receivedJSON);
                                // localJSON.append(categories);

                                localJSON.categories = [receivedJSON];

                                // turn JSON object back to string
                                // https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
                                var jsonString = JSON.stringify(localJSON);
            
                                // write to file
                                fs.writeFile("todolist.json", jsonString, function(err) {
                                    console.log("Done!");
                                    
                                    res.writeHead(200);
                                    res.end();
                                });
                            } else {
                                localJSON.categories.push(receivedJSON);

                                // turn JSON object back to string
                                // https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
                                var jsonString = JSON.stringify(localJSON);
            
                                // write to file
                                fs.writeFile("todolist.json", jsonString, function(err) {
                                    console.log("Done!");
                                    
                                    res.writeHead(200);
                                    res.end();
                                });
                            }   






                            // if (receivedJSON.input != null) { // new item
                            //     localJSON[receivedJSON.input.pos].list.items.push(receivedJSON.input.item);

                            //     // https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
                            //     var jsonString = JSON.stringify(json);
        
                            //     fs.writeFile("todolist.json", jsonString, function(err) {
                            //         console.log("Done!");
                                    
                            //         res.writeHead(200);
                            //         res.end();
                            //     });
                            // }
                        });
                    }
                }
            } catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        });
    }
}).listen(8080);