var level = require("level");
var db = level("log2.db");
var hyperlog = require("hyperlog");
var log = hyperlog(db, {valueEncoding:"json"});

var msg = process.argv[2];
var links = process.argv.slice(3);
//links are the already existing doc hashing, message you want to store
log.add(links, {message:msg, time:Date.now()}, ((err,node)=>{
    if(err) console.error(err)
    else console.log(node);
}) )
