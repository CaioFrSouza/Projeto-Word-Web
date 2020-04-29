const Algorithmia = require('algorithmia')
const state = require('./state')

const _API_KEY_ = require('./.config.json').Api_Key

const Wiki = async (tearm,t) =>  new Promise  (async (resolve,reject) => {
  
  const input = {
        "articleName":String(tearm),
        "lang": "pt"
      };
      Algorithmia.client(_API_KEY_)
        .algo("web/WikipediaParser/0.1.2?timeout=300") // timeout is optional
        .pipe(input)
        .then(function(output) {
          if(output.result!=undefined){
          const semLinhasBrancasEMarkDown = removeBlankLinesAndMarkdown(output.result.content);
          const semDatasEmParenteses = removeDatesInParentheses(semLinhasBrancasEMarkDown)
        resolve(semDatasEmParenteses) }
        else reject('Termo nao encontrado ou undefined')
      });
})
function removeBlankLinesAndMarkdown(text) {
  const allLines = text.split('\n')

  const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
    if (line.trim().length === 0 || line.trim().startsWith('=')) {
      return false
    }

    return true
  })

  return withoutBlankLinesAndMarkdown.join(' ')
}


function removeDatesInParentheses(text) {
return String(text).replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
}
async function test  (id) {
  // let tearm = await state.load(id)
  m = await wiki(id,t)
  // await state.Create(id,{

  // })
}

module.exports = {
    Wiki
}
