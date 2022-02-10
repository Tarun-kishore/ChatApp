const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const roomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

roomSchema.pre("save", async function (next) {
  const room = this;

  if (room.isModified("password")) {
    room.password = await bcrypt.hash(room.password, 8);
  }
  next();
});

roomSchema.methods.comparePass = async function (password) {
  const room = this;

  const isMatch = await bcrypt.compare(password, room.password);

  return isMatch;
};

const Room = mongoose.model("Room", roomSchema);

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    default: null,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
});

const User = mongoose.model("User", userSchema);

const addRoom = async (roomName, password) => {
  roomName.trim().toLowerCase();
  if (!roomName || !password) {
    return { error: "Invalid input" };
  }

  //const existingRoom = rooms.find((room) => roomName === room.name);
  const existingRoom = await Room.findOne({ roomName: roomName });

  if (existingRoom) {
    return { error: "Room already exist" };
  }

  //rooms.push({ name: roomName, password, numberOfUser: 0 });
  const newRoom = new Room({ roomName, password });

  await newRoom.save();

  return {};
};

const removeRoom = async (roomName) => {
  roomName.trim().toLowerCase();
  await Room.deleteOne({ roomName });
};

const getRooms = async () => {
  const rooms = await Room.find({});
  const temp = [];
  rooms.forEach((room) => temp.push(room.roomName));
  return temp;
};

const getRoom = async (roomName) => {
  roomName.trim().toLowerCase();
  const room = await Room.findOne({ roomName });
  return room;
};

const addUser = async (username, room) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validated data
  if (!username || !room) {
    return { error: "Username and room are required" };
  }

  //Getting the room number
  const roomObject = await getRoom(room);
  //finding if already exist
  const existingUser = await User.findOne({
    room: roomObject.id,
    userName: username,
  });

  //if already exist
  if (existingUser) {
    return {
      error: "Username already exist in this room",
    };
  }

  //If 15 users are there in the room then it is already filled
  const numberOfUser = getUsersInRoom(room).length;

  if (numberOfUser >= 15) {
    return {
      error: "Room is already Filled!!",
    };
  }

  const user = { username, room };

  const userObject = new User({
    userName: username,
    socketId: null,
    room: roomObject.id,
  });

  await userObject.save();
  return { user };
};

const verifyUser = async ({ _id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validated data
  if (!username || !room) {
    return { error: "Username and room are required" };
  }

  //Getting the room number
  const roomObject = await getRoom(room);
  //finding if already exist
  const existingUser = await User.findOne({
    room: roomObject.id,
    userName: username,
  });

  //if already exist
  if (!existingUser) {
    return {
      error:
        "User is not authorized to enter this chat room. User must enter the chatroom through password",
    };
  }

  existingUser.socketId = _id;
  await existingUser.save();
  const user = { username, room };
  return { user };
};

const removeUser = async (id) => {
  const user = await User.findOne({ socketId: id });

  const returnObj = {};
  if (user) {
    const removedUser = user;
    returnObj.username = removedUser.userName;
    const removedUserRoom = await Room.findById(user.room);
    returnObj.room = removedUserRoom.roomName;
    await user.remove();
    const otherUser = await getUsersInRoom(removedUserRoom.roomName);

    if (otherUser.length === 0) {
      removeRoom(removedUserRoom.roomName);
    }

    return returnObj;
  }
};

const getUser = async (id) => {
  const user = await User.findOne({ socketId: id });
  const room = await Room.findById(user.room);
  return { username: user.userName, room: room.roomName };
};

const getUsersInRoom = async (room) => {
  const roomObject = await Room.findOne({ roomName: room });
  if (!roomObject) return {};
  const user = await User.find({ room: roomObject.id });

  const temp = [];
  user.forEach((userElement) => temp.push({ username: userElement.userName }));
  return temp;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addRoom,
  getRooms,
  getRoom,
  verifyUser,
};
