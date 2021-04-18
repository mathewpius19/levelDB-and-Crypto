var level = require("level");
var db = level('browser.db', {valueEncoding:"json"});
var html = require('yo-yo');

var root = document.body.appendChild(document.createElement('div'))
var count = '?';
update();
db.get("count", ((err,value)=>{
    count = value || 0;
    update()
}))

function update(){
    html.update(root, html`<div>
    <h1>${count}</h1>
    <button onclick=${onClick}>CLICK ME! </button>
    </div>`)
    function onClick(ev){
        count++
        db.put("count", count, (err)=>{
            if(err) console.error(err)
            else 
            update();
        })
    }
    
}