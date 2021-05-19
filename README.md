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

----------------------------------------------------------------------------------------------------------------------------------------

# CRYPTOGRAPHY

# Hashes

``` js
var createHash = require("crypto").createHash
var createHash = require("createHash")
var stream = createHash (algorithm)
```
algorithms:

* shal
* sha256
* sha512
* md5

# If we want to develop a method to keep a secret message that no advarsaries can read, there are couple of ways we can use:

# Symmetric Ciphers :

* requires a shared secret (like password)

# asymmetric cryptography:
* public/private key pair
* encrypt with someones public key after which they can decrypt with their private key to see the message.

# Random Number Generator

secure entropy needed for generating keys, nonces(random numbers):
``` js
window.cryto.getRandomValues(new Uint8Array(8))
```

If your RNG is bad, your crypto is also bad.

# Using sodium to generate keypairs

```js 
var sodium = require("chloride");
console.log(sodium.crypto_sign_keypair())
console.log(sodium.crypto_box_keypair())
```

# combined vs detached 
* combined mode : output contains the orginal message + signature
* detached mode : output contains only the signature

# sodium authenticated with encryption combined 
symmetric cipher with message authentication code (MAC) to prevent tampering

```js
var msg = crypto.randomBytes(16)
var nonce = crypto.randomBytes(24)
var key = crypto.randomBytes(32)
var cipherText = sodium.crypto_secretbox_easy(msg,nonce,key) // u encrypt the message here and send it.
var clearText = sodium.crypto_secretbox_open_easy(cipherText, nonce, key) // u get back the msg here after decryption 
```

# merkle DAGS

hash very document.
point to every other document by storing the hash in the doc itself

eg: git, ipfs

Advantages/security proofs of merkle DAGS:
* tamper-proof - changing a single doc changes the hash that points at it.
* Docs can be authenticated with signing.

# Kappa Architecture
enterprise architecture
* immutable, append only logs are how data is stored.
* if you want to make a change of a previously entered doc, add a new one mentioning the changes.
* good for p2p.
 
 * Replicate log.db and log2.db into one by using dupsh on linux command line.
   > dupsh 'node duplicate.js log.db' 'node duplicate.js log2.db'


# hyperlog-index

build materialized views on top of a hyperlog 