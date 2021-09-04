const users=[]

const addUser = ({_id,username,room})=>{
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validated data
    if(!username || !room){
        return {error:'Username and room are required'}
    }

    //finding if already exist
    const existingUser= users.find((user)=>{
        return user.room === room && user.username === username
    })

    //if already exist
    if(existingUser){
        return {
            error: 'Username already exist in this room'
        }
    }

    const user= {_id,username,room}

    users.push(user)

    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user._id === id
    })

    if(index !==-1){
        return users.splice(index,1)[0]
    }
}


const getUser = (id)=>{
    return users.find((user)=> user._id === id)
}

const getUsersInRoom = (room)=>{
    return users.filter((user)=> user.room === room)
}

module.exports ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}