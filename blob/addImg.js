var blobs = require("content-addressable-blob-store");
var store = blobs("img.blob")
var level = require("level");
var db = level("img.db", {valueEncoding:"json"});

var w = store.createWriteStream(function (err){
    if(err) return console.error(err)
    var key = 'img!' + w.key;
        var doc = {
            time:Date.now()
        }
    db.put(key, doc, ((err)=>{
        console.error(err);
        
    }))
    console.log(w.key);
})
process.stdin.pipe(w)