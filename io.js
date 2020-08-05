const UsersModel = require('./models/Users-models')
const {
  addUser,
  userLeft,
  getCurrentUser,
  getOnlineUsers,
} = require("./socket-io_utils/user");
const { formatMsg, getRoomMessagesFn } = require("./socket-io_utils/message");
const User = require('./models/Users-models');


let userId = null
module.exports = (io) => {
  const admin = "Admin";

  // check if connected to server with socket io
  io.on("connection", (socket) => {
    console.log(`new connection from: ${socket.id}`);
    socket.on("userJoined", async (newUser, callback) => {
          console.log(`userJoined: ${socket.id}`)
        //debug why is always keep getting the last user_id log out
        userId = newUser.id
        const { error, user } = await addUser({socketid:socket.id ,...newUser });

        let userAll = new UsersModel(data = null)
        const dataTemp = await userAll.getAll()
        // console.log(dataTemp.data)
        // If username is taken, run alert error sa client
        // console.log("user")
        // console.log(user)


        if (error) return callback(error);
        socket.join(user.room);

        // Send Welcome message to current user
        socket.emit(
            "message",
            formatMsg(admin, `Welcome to our chatroom, ${user.username}!`)
        );

        // Broadcast message to everyone except the user
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMsg(admin, `${user.username} has joined the chatroom.`)
        );

        // Get all messages in current room
        socket.emit('getRoomMessages', await (getRoomMessagesFn(user.room)))

        // no-room-chatroom
        // io.emit('usersOnline', { users: getOnlineUsers() });
        // Display all users in room
        io.to(user.room).emit("usersOnline", {
            room: user.room,
            users: await getOnlineUsers(user.room),
        });

        // no-room-chatroom
        // io.emit('usersOnline', { users: getOnlineUsers() });

        callback();
    });

    // Listen for chat messages
    socket.on('sendMessage', async (messageData) => {
        const user = await getCurrentUser(messageData.userId)
        // console.log("Here +>>>")
        // console.log(user)
        io.to(user.room).emit('message', messageData )
    })

    // Listen when someone is typing a message
    // socket.on('isTyping', name => {
    //     const user = getCurrentUser(socket.id)

    //     socket.broadcast.to(user.room).emit('isTyping', name);
    // });

    // User disconnects
    socket.on("disconnect", async () => {


      // if(userId != null){
      const user = await userLeft(socket.id);
      const dataUser = user[0]
      // console.log('-?>>>>>>>>>>>>>>>')
      // console.log(dataUser)
      if (dataUser) {
        
        io.to(dataUser.room).emit(
          "message",
          formatMsg(admin, `${dataUser.username} has disconnected.`)
        );

        io.to(user.room).emit("usersOnline", {
          room: dataUser.room,
          users: await getOnlineUsers(dataUser.room),
        });
      }

    });
  });
};
