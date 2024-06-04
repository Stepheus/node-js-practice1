const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res)=>{
    console.log("Server Created");
    
    res.setHeader("Content-Type", "text/html");
    let path = "./";
    switch (req.url){
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/bathroom-services.html":
            path += "bathroom-services.html";
            res.statusCode = 200;
            break;
        case "/flooring-services.html":
            path += "flooring-services.html";
            res.statusCode = 200;
            break;
        case "/kitchen-services.html":
            path += "kitchen-services.html";
            res.statusCode = 200;
            break;
        case "/patio-services.html":
            path += "patio-services";
            res.statusCode = 200;
            break;
        default:
            path = "404.html";
            res.statusCode =404;
            break;

    }

    fs.readFile(path, (error, data)=>{
        if (error){
            console.error("Error file opening");
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    })


})

server.listen(3000, "localhost", ()=>{
    console.log("server listening")
})