var level = require("level");
var db = level("batch.db", {valueEncoding:"json"});
var to = require("to2");

db.createReadStream() // {reverse:true} -> we can get it in reverse order
                     // ({gt: "n5"}) -> gives you values greater than n5
    .pipe(to.obj(function(row, enc, next){
        console.log(row)
        next()
    }))


//result looks like this

// [
//     { key: 'n0', value: 0 },
//     { key: 'n1', value: 1000 },
//     { key: 'n2', value: 2000 },
//     { key: 'n3', value: 3000 },
//     { key: 'n4', value: 4000 },
//     { key: 'n5', value: 5000 },
//     { key: 'n6', value: 6000 },
//     { key: 'n7', value: 7000 },
//     { key: 'n8', value: 8000 },
//     { key: 'n9', value: 9000 }
//   ]