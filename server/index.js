//Import
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

//Importa as funções para controle de usuário
const { addUser, removeUser, getUser, getUserInRoom} = require('./user')

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
    //Quando o usuario se conectar é passado os dados de nome e sala para o server-side
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id:socket.id, name, room})

        if(error) return callback(error)

    //Envia uma mensagem ao usuário quando ele entra na sala e envia uma mensagem geral dizendo que um novo usuário se juntou a sala
        socket.emit('message', {user: 'admin', text:`${user.name}, bem vindo a sala ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name} entrou na sala`})

        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message', {user: user.name, text: message})

        callback()
    })

    //Quando um usuário se desconectar será mostrado essa mensagem
    socket.on('disconnect', ()=>{
        console.log('Um usuário se desconectou')
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))
