const fs = require('fs')


async function Create (id,obj){
 return fs.writeFileSync(`src/data/${id}.json`,obj,'utf-8')
}
async function del (id){
 return fs.unlinkSync(`src/data/${id}.json`)
}
async function load (id){
    return fs.readFileSync(`src/data/${id}.json`,'utf-8')
}

module.exports = {Create,del,load}

