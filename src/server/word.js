const fs     = require('fs')
const officegen = require('officegen')

const date   = new Date()

const word =  async(texto,pes) => new Promise ((resolve,reject) => {
    const year     = date.getFullYear()
    const dados    = require('./.config.json')
    const quest    = pes
    const pesquisa = texto
    let docx  =  officegen ({
        type : 'docx',
        pageSize : 'A4',
        pageMargins :{ top: '3cm' , right: '2cm', bottom: '2cm', left: '3cm' }
    })

    const QuebraDeLinhaEmMasss = (n) => {
        for (let i = 0;i<n ; i++){
            pObj.addLineBreak()
        }}

    let pObj = docx.createP ()
    let pObj1 = docx.createP ()
    const centerArial = {
        align : 'center',
        font_face : 'Arial',
        font_size : 12,
    }
    const justifyArial = {
        align : 'center',
        font_face : 'Arial',
        font_size : 12,
    }
    pObj.options.align = 'center'
    pObj.addText(dados.inst,{align : 'center',font_face : 'Arial',font_size : 12,bold:true})
    QuebraDeLinhaEmMasss(4)
    pObj.addText(String('Trabalho de '+quest).toUpperCase(), centerArial)
    pObj.addLineBreak()
    pObj.addText(String('Nome: '+dados.nome).toUpperCase(), centerArial )
    pObj.addLineBreak()
    pObj.addText(String('Nº '+dados.numero+' Série: '+dados.serie).toUpperCase(),centerArial)
    QuebraDeLinhaEmMasss(35)
    pObj.addText('São Paulo',centerArial)
    pObj.addLineBreak()
    pObj.addText(''+year,centerArial)
    pObj.addLineBreak()
    pObj1.options.align = 'justify'
    pObj1.addText(''+pesquisa,justifyArial)
    let out = fs.createWriteStream('Trabalho de '+quest+'.docx')
    console.log('arquivo em word criado ;) ')
out.on('error', function(err) {
    console.log(err)
  })

return docx.generate(out)
})

module.exports = {
    word
}