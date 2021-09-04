const http = require('http')
const express=require('express')
const socketio = require('socket.io')
const { Socket } = require('dgram')
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom}= require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port= process.env.PORT || 3000

app.use(express.static('src/public'))


io.on('connection',(socket)=>{
    socket.on('join',(options,callback)=>{
        const {error,user} = addUser({_id: socket.id, ...options})

        if(error){
            return callback(error)
        }

        socket.join(user.room)
        
        socket.emit('Message',generateMessage("Welcome "+user.username))
        socket.broadcast.to(user.room).emit('Message',generateMessage(`${user.username} has joined`))

        io.to(user.room).emit('roomData',{room: user.room, users: getUsersInRoom(user.room)})
        
        
        callback()
    })
    
    socket.on('sendMessage',(message,callback)=>{
        const filter=new Filter()
        
        if(filter.isProfane(message)){
            return callback('ignored')
        }
        
        const user = getUser(socket.id)
        if(user)
        io.to(user.room).emit('receiveMessage',{username: user.username,...generateMessage(message)})
        callback()
    })

    socket.on('sendLocation',({latitude,longitude},callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',{username : user.username,...generateMessage(`https://www.google.com/maps?q=${latitude},${longitude}`)})
        callback()
    })
    
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('Message',generateMessage(user.username+" has Left"))
            io.to(user.room).emit('roomData',{room: user.room, users: getUsersInRoom(user.room)})
        }
    })
})


server.listen(port,()=>{
    console.log("Server running on port "+port)
})