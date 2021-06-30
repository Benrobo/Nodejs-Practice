// Nodejs routing system using mime-types module

// npm install mime-types

const http = require("http")
const fs = require("fs")
const url = require("url");
const mime = require("mime-types");



let server = http.createServer((req, res)=>{
    Route(req, res)

})

server.listen(5000)



function Route(req, res){
    let parseUrl = url.parse(req.url)

    let path = parseUrl.path.replace(/^\/+|\/+$/g, "")
    
    // check if path == ""
    if(path == ""){
        path = "index.html"
    }

    let file = __dirname + "/views/" + path;

    fs.readFile(file, (err, data)=>{
        if (err) {
            console.log(`File Not Found ${file}`);
            res.writeHead(404);
            res.end();
        }else {
            let mimeType = mime.lookup(path);
            res.writeHead(200, {"Content-Type" : mimeType})
            res.end(data)
            return
        }
    })
}



