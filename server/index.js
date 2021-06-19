//Import
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

//Define a porta onde irá rodar o servidor
const PORT = process.env.PORT || 5000

//Import do router.js
const router = require('./router')

const app = express()
const server = http.createServer(app)

//Config do Cors, se estiver usando o socket.io ver:3
//  Caso contrário não haverá permissão de acesso
corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
}
const io = socketio(server, corsOptions)

//Irá mostrar uma mensagem no console caso algum usuário tenha se conectado ou desconectado
io.on('connection', (socket) => {
    console.log('Um usuário se conectou')

    //Quando o usuario se conectar é passado os dados de nome e sala para o server-side
    socket.on('join', ({name, room}, callback) => {
        console.log(name, room)

    })

//Quando um usuário se desconectar será mostrado essa mensagem
    socket.on('disconnect', ()=>{
        console.log('Um usuário se desconectou')
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))
