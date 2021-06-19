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
const io = socketio(server)

//Irá mostrar uma mensagem no console caso algum usuário tenha se conectado ou desconectado
io.on('connection', (socket) => {
    console.log('Um usuário se conectou')

    socket.on('disconnect', ()=>{
        console.log('Um usuário se desconectou')
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))
