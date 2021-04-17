var level = require('level')
var db = level('batch.db', { valueEncoding: 'json' })
var batch = []
for (var i = 0; i < 10; i++) {
  batch.push({ type:"put",key: 'n' + i, value: i*1000 })
}
db.batch(batch, function (err) {
  if (err) console.error(err)
})