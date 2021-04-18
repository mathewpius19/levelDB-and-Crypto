var level = require("level");
var db = level('live.db');
var liveFeed = require("level-livefeed");
var to = require("to2");

liveFeed(db)
.pipe(to.obj((row,enc,next)=>{
    console.log(row);
    next();
}))

setInterval(()=>{
    db.put("hello!" + Date.now(), function(err){
        if(err) console.error(err);
    })
},500)

