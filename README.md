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

# Libraries that can be uses with LevelDB

* SUBLEVELDOWN(npm install subleveldown)

sublevel down lets you organize your key space into sublevels. This allows us to create nested sub-databases with subleveldowns.

eg-----> var subDB = sublevel("nameOfDB", "sublevelName")

* LEVEL-LIVEFEED(npm install level-livefeed)

subscribe to a live feed of changes to the database.

* BROWSERIFY

Can fetch data from db to display on broswer
(check browser.js in browser dir to see code)

# WHAT TO STORE AND WHAT NOT TO STORE IN LEVELDB

* best for tiny documents
* documents can point at binary data by hash
