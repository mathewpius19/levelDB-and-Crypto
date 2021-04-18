var level = require("level");
var db = level("posts.db", {valueEncoding:"json"})
var to = require("to2");

var name = process.argv[2];
db.createReadStream({
    gt:"post-time!", 
    lt:"post-time!~"
})
.pipe(to.obj((row,enc,next)=>{
    var id = row.key.split('!').slice(-1)[0];
    // var id1 = row.key.split('!')[-1];
    // console.log(id, id1);
    db.get('post!' + id,((err, doc)=>{
        var name = doc.name;
        var time = doc.time;
        var body = doc.body;
        console.log(time + '<' + name + '>' + body);
        next()
    }))
    
    
    
}))