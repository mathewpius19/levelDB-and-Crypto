var c = require("chloride")
const fs = require("fs")

var keyPairs = c.crypto_sign_keypair()

var jsonData = JSON.stringify({publicKey : keyPairs.publicKey.toString("hex"), secretKey: keyPairs.secretKey.toString("hex")})
console.log(jsonData);

fs.writeFileSync("key.json", jsonData, (error)=>{
    if(error)
    console.error(error);
    console.log("data written successfully");

}
)