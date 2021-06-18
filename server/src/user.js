const user = []

const addUser = ({id, name, room}) => {
    name = name.trim()
                .toLowerCase()

    name = name.trim()
                .toLowerCase()

// Verifica se esse nome de usuario já existe sala do chat
    const existingUser = user.find(user) => user.room == room && user.name == nome

    if(!name || !room) return (error: 'Username and room required.')
}