var level = require("level");
var db = level("posts.db", {valueEncoding:"json"});
var strftime = require("strftime");
var randomBytes = require("crypto").randomBytes;

var name = process.argv[2]
var msg = process.argv.slice(3).join(' ');
var time = strftime("%F %T");
var id = randomBytes(16).toString("hex");

var batch = [
    {
        type:"put", key:"post!" + id, value:{ name:name, time:time, body:msg}
    },
    {
        type:"put", key:"post-name!" + name + '!' + time + '!' + id, value:0 
    },
    {
        type:"put", key:"post-time!" + time + '!' + name + '!' + id, value:0
    }
]

db.batch(batch, (err)=>{
    console.error(err);
})