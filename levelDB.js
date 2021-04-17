var level = require("level");
var db = level("increment.db", {valueEncoding:"json"});

db.get('count', (err,value)=>{
    var n =(value||0)+1
    db.put('count', n, (err,value)=>{
        if(err) console.error(err)
        else
        console.log(n);
    })
})