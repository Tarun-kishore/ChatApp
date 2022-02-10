require("dotenv").config();
require("./db/connection");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { Socket } = require("dgram");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addRoom,
  getRooms,
  getRoom,
  verifyUser,
} = require("./utils/users");
const errorMessage = require("./utils/errorPage");
const { Router } = require("express");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10 mb" }));

app.get("/getRooms", async (req, res) => {
  const rooms = await getRooms();
  res.send(
    rooms.filter(async (room) => (await getUsersInRoom(room).length) <= 15)
  );
});

app.post("/selectRoom", async (req, res) => {
  const isNew = req.body.newRoom && true;
  const room = req.body.newRoom || req.body.oldRoom;
  const existingRoom = await getRoom(room);
  if (isNew) {
    if (existingRoom)
      return res
        .status(400)
        .send(
          errorMessage("The room already exist. Please try different name.")
        );

    const { error } = await addRoom(room, req.body.password);
    if (error) return res.send(errorMessage(error));

    const { error: err, user } = await addUser(req.body.username, room);
    if (err) return res.send(errorMessage(err));
    return res.redirect(
      `/chat.html?username=${user.username}&room=${user.room}`
    );
  }

  const roomTobeJoined = await getRoom(room);
  if (!roomTobeJoined)
    return res.status(404).send(errorMessage("The room does not exist"));

  const match = await roomTobeJoined.comparePass(req.body.password);
  if (!match) return res.send(errorMessage("Wrong password"));

  const { error: err, user } = await addUser(req.body.username, room);
  if (err) return res.send(errorMessage(err));
  res.redirect(`/chat.html?username=${user.username}&room=${user.room}`);
});

io.on("connection", (socket) => {
  socket.on("join", async (options, callback) => {
    const { error, user } = await verifyUser({ _id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("Message", generateMessage("Welcome " + user.username));
    socket.broadcast
      .to(user.room)
      .emit("Message", generateMessage(`${user.username} has joined`));
    const usersInRoom = await getUsersInRoom(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: usersInRoom,
    });

    callback();
  });

  socket.on("sendMessage", async (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("ignored");
    }

    const user = await getUser(socket.id);
    if (user)
      io.to(user.room).emit("receiveMessage", {
        username: user.username,
        ...generateMessage(message),
      });
    callback();
  });

  socket.on("disconnect", async () => {
    const user = await removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "Message",
        generateMessage(user.username + " has Left")
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: await getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log("Server running on port " + port);
});

