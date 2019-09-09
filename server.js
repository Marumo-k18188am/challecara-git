//デバッグ用

var http=require("http");
var fs=require("fs");

http.createServer(function(req,res){
    var url=req.url;
    var tmp=url.split(".");
    var type="";
    switch(tmp[tmp.length-1]){
        case "/":
            url="/index.html";
            type="text/html";
            break;
        
        case "css":
            type="text/css";
            break;

        case "js":
            type="text/javascript";
            break;
    }
    
    fs.readFile(__dirname+url, function(err,data){
        res.writeHead(200,{"Content-Type":type});
        res.end(data);
    })
}
).listen(8080);
console.log("Server is running at Port:8080");