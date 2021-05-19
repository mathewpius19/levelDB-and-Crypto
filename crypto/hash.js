const h = require("crypto").createHash("sha512", {encoding:"hex"});

h.pipe(process.stdout);
h.write("Hi");
h.end()