const users = []

const addUser = ({id, name, room}) => {

    name = name.trim()
                .toLowerCase()
    room = room.trim()
                .toLowerCase()

// Verifica se o usuário ja existe dentro daquela sala
    const existingUser = users.find((user) => user.room === room && user.name === name)

// Se existir, irá exibir um erro
    if(existingUser){
        return {error: 'Este nome de Usuário ja é existente'}
    }

// Irá adicionar o usuário ao array "users"
    const user = {id, name, room}

    users.push(user)

    return {user}
}

const removeUser = (id) =>{

//Verifica se existe um usuário com este ID
    const index = users.findIndex((user) => user.id === id)

// Se existir, irá remover o usuário
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom}