var sublevel = require("subleveldown");
var level = require("level");
var db = level('sub.db');

var adb = sublevel(db,'a');
var bdb = sublevel(db,'b');

adb.get('count', ((err,value)=>{
    var n = Number(value||0)+1;
    adb.put('count',n, ((err)=>{
        if(err) console.error(err);
        else console.log('a:count', n);
    }))
}))

bdb.get('count', ((err,value)=>{
    var n = Number(value||0)+10;
    bdb.put('count', n,((err)=>{
        if(err) console.error(err);
        else console.log('b:count', n);
    }))
}))

