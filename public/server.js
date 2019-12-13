//サーバーサイド

var http=require("http");
var fs=require("fs");
var url=require("url");

http.createServer(function(req,res){
    var requrl=req.url;
    var tmp;
    var type;
    var queries;

    //クエリパラメータ処理
    queries=url.parse(requrl,true).query;
    if(queries)requrl=requrl.split("?")[0];

    //ファイルリクエスト処理
    tmp=requrl.split(".");
    type="";
    switch(tmp[tmp.length-1]){
        case "/":
            requrl="/index.html";
            type="text/html";
            break;
        
        case "css":
            type="text/css";
            break;

        case "js":
            type="text/javascript";
            break;
    }
    
    fs.readFile(__dirname+requrl, function(err,data){
        res.writeHead(200,{"Content-Type":type});
        res.end(data);
    })
}
).listen(8080);
console.log("Server is running at Port:8080");