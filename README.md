# levelDB-and-Crypto
Notes from levelDB and cryptography

# LEVEL DB 

--- An embedded key/value database.

# EMBEDDED VS STANDALONE

Embedded - In process library eg: levelDB, SQLite 
StandAlone - Separate service eg mysql, postgreSQL

# INSTALL 

---- npm install level ----

# USAGE

---- var level = require ("level")
-----var db = level ("whatever.db", {valueEncoding:"json"});

# LEVEL METHODS

db.get()
db.put()
db.del()
db.batch()
db.createReadStream()

# ATOMICITY

It means either all transactions fail or succeed.

# CONSISTENCY

Consistency is important to enforce ATOMICITY

Suppose user signs up:

1) we might need to create a record when they sign up.
2) we might need to create a record when they sign in.

# BATCH

db.batch ([
    {key:"foo", value:"123"},
    {key:"bar", valur:"456"}
], function(err){}....) // this either adds all data together or it doesnt, therefore respecting ATOMICITY

# CREATE_READ_STREAM

`db.createReadStream(opts)`:
 
 Returns  a readable objectMode stream

 *opts.gte = greater than or equal to
 *opts.gt  = greater than
 *opts.lte = less than or equal to
 *opts.lt = less than
 *opts.limit = maximum number of results
 *opts.reverse = higher keys before lower keys