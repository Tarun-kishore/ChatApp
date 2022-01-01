const users = [];
const rooms = [];

const addRoom = ( roomName, password ) => {
  roomName.trim().toLowerCase()
  if (!roomName || !password) {
    return { error: "Invalid input" };
  }

  const existingRoom = rooms.find((room) => roomName === room.name);

  if (existingRoom) {
    return { error: "Room already exist" };
  }

  rooms.push({name : roomName, password , numberOfUser : 0 });

  return {};
};

const removeRoom = (roomName) => {
  roomName.trim().toLowerCase()
  const index = rooms.findIndex((room) => {
    return room.name === roomName;
  });

  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  }
};

// const addUserInRoom = (roomName)=>{
//   const requiredRoom = rooms.find((room)=> roomName === room.name);
//   console.log(rooms)
//   requiredRoom.numberOfUser++;
//   console.log(rooms)
// } 

const getRooms = ()=>  rooms.map(room => room.name);

const getRoom = (roomName)=>{
  roomName.trim().toLowerCase();
  return rooms.find((room)=>room.name === roomName)
} 

const addUser = ( username, room ) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validated data
  if (!username || !room) {
    return { error: "Username and room are required" };
  }

  //finding if already exist
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
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

  const user = {  username, room };

  users.push(user);

  return { user };
};

const verifyUser = ({ _id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validated data
  if (!username || !room) {
    return { error: "Username and room are required" };
  }

  //finding if already exist
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //if already exist
  if (!existingUser) {
    return {
      error: "User is not authorized to enter this chat room. User must enter the chatroom through password",
    };
  }

  existingUser._id = _id
  return { user:existingUser };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user._id === id;
  });

  if (index !== -1) {
    const removedUser = users.splice(index, 1)[0];
    const otherUser = getUsersInRoom(removedUser.room);

    if (otherUser.length === 0) {
      removeRoom(removedUser.room);
    }

    return removedUser;
  }
};

const getUser = (id) => {
  return users.find((user) => user._id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addRoom,
  getRooms,
  getRoom,
  verifyUser
};

