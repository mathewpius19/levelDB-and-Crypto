var level = require("level");
var db = level("users.db");
var batch = require("./data.json");
var to = require("to2");
// db.batch(batch, (err)=>{
//     if(err) console.error(err);
// })

db.createReadStream({gt:"user!",lt:"user!~"})
    .pipe(to.obj((row,enc,next)=>{
        console.log(row);
        next();
}))