import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

//Import de estilos
import './Chat.css'
//Import de components
import InfoBar from '../InfoBar/infoBar'
import Input from '../Input/input'
import Messages from '../Messages/messages'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const[message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

//Quando o usuario se conectar é emitido os dados de nome e sala para o server-side, utilizando o index 'join'
        socket.emit('join', {name, room}, ()=>{
        
        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    //Função para envio das mensagens
    const sendMessage = (event) => {
        event.preventDefault()

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return(
        <div className = "outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat