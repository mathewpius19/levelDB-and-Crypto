var http = require("http");
var blobs = require("content-addressable-blob-store");
var store = blobs("img.blob")
var level = require("level");
var db = level("img.db", {valueEncoding:"json"});
var through = require("through2");

var server = http.createServer((req,res)=>{
    if(req.url==="/"){
        db.createReadStream()
    .pipe(through.obj(function (row,enc,next){   

        next(null, `<div>
            <h1>${row.value.time}</h1>
            <img src = "image/${row.key.split('!')[1]}"/>
        </div>`);
    }))
    .pipe(res)
    }
    else if(/^\/image\//.test(req.url)){
        var hash = req.url.replace(/^\/image\//, '');
        res.setHeader("content-type","image/jpg");
        store.createReadStream(hash).pipe(res)
    }
    else{
        res.end("Not found ")
    }
})
server.listen(5000, ()=>{console.log("listening at port 500")});
