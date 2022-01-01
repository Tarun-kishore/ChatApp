const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { Socket } = require('dgram')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom, addRoom, getRooms, getRoom, verifyUser } = require('./utils/users')
const errorMessage = require('./utils/errorPage')
const { Router } = require('express')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

app.use(express.static('src/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "10 mb" }));

app.get('/getRooms', (req, res) => {
    res.send(getRooms().filter((room) => getUsersInRoom(room).length <= 15));
})


app.post('/selectRoom', (req, res) => {
    const isNew = req.body.newRoom && true;
    const room = req.body.newRoom || req.body.oldRoom

    if (isNew) {
        if (getRoom(room)) return res.status(400).send(errorMessage('The room already exist. Please try different name.'));

        const { error } = addRoom(room, req.body.password)
        if (error) return res.send(errorMessage(error))

        const { error : err, user } = addUser(req.body.username, room);
        if (err) return res.send(errorMessage(err))
        return res.redirect(`/chat.html?username=${user.username}&room=${user.room}`)
    }

    const roomTobeJoined = getRoom(room)
    if (!roomTobeJoined) return res.status(404).send(errorMessage('The room does not exist'));

    if (req.body.password !== roomTobeJoined.password) return res.send(errorMessage('Wrong password'))

    const { error :err, user } = addUser(req.body.username, room);
    if (err) return res.send(errorMessage(err))
    res.redirect(`/chat.html?username=${user.username}&room=${user.room}`)
})


io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = verifyUser({ _id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('Message', generateMessage("Welcome " + user.username))
        socket.broadcast.to(user.room).emit('Message', generateMessage(`${user.username} has joined`))

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })


        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('ignored')
        }

        const user = getUser(socket.id)
        if (user)
            io.to(user.room).emit('receiveMessage', { username: user.username, ...generateMessage(message) })
        callback()
    })

    socket.on('sendLocation', ({ latitude, longitude }, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', { username: user.username, ...generateMessage(`https://www.google.com/maps?q=${latitude},${longitude}`) })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('Message', generateMessage(user.username + " has Left"))
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })
})


server.listen(port, () => {
    console.log("Server running on port " + port)
})