var level = require("level");
var db = level("log.db");
var hyperlog = require("hyperlog");
var log = hyperlog(db, {valueEncoding:"json"});

var to = require("to2");

process.stdin.pipe(log.replicate()).pipe(process.stdout);