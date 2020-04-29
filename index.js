const express = require('express');
const app = express()
const state = require('./src/server/state')
const wiki = require('./src/server/wiki')
const word = require('./src/server/word')

const _WEB_ = require('./src/server/.config.json')

const http = require('http').createServer(app);
var io = require('socket.io')(http);



app.get('/',(req, res)=> {
    app.use(express.static("src/client/"))
    res.sendFile(__dirname+'/src/client/index.html')
});
io.on('connection', (socket) => {
    console.log('O usuario:',socket.id,'foi conectado')
    socket.on('termo',async t => {
        socket.on('disconnect',()=> {
            state.del(socket.id)
            })
            console.log(`termo digitado: ${t}`)
            socket.emit('msg',{
                name:'User',
                msg:t
    
            })
        obj = {pes:t,content:null,wiki:false}
        socket.emit('msg',{
            name:'Server',
            msg:'Fazendo pesquisa na Wiki....'

        })
        await state.Create(socket.id,JSON.stringify(obj))
       let pesquisa =  await wiki.Wiki(t,socket.id).catch(error=> {
        socket.emit('msg',{
            name:'Server',
            msg:error

        })
       })
       if(pesquisa){
       socket.emit('msg',{
        name:'Server',
        msg:'Pesquisa feita com sucesso...'

    })
       o = {pes:t,content:pesquisa,wiki:true}
       await state.Create(socket.id,JSON.stringify(o))
       socket.emit('msg',{
        name:'Server',
        msg:'Criando o arquivo word...'

    })
    setTimeout(async() => {
        let txt =  await state.load(socket.id)
        let j = JSON.parse(txt)
        word.word(j.content,t)
        socket.emit('msg',{
            name:'Server',
            msg:`<a href="/download/${socket.id}">Baixe aqui o seu arquivo word </a>`
    
        })
        app.get('/download/'+socket.id, (req,res)=>{
            res.download(__dirname+'/Trabalho de '+j.pes+'.docx')
        })
       }, 1000);
       socket.emit('msg',{
        name:'Server',
        msg:'Arquivo word criado com sucesso'

    })
}
    })
    socket.on('disconnect',()=> {
    console.log('o usuario:',socket.id,'foi desconectado')
    })
})

http.listen(Number(_WEB_.port),String(_WEB_.ip),()=>{ 
    console.clear();
    console.log('Server iniciado com sucesso') 
    console.log('rodando no ip '+_WEB_.ip +':'+ _WEB_.port)
})