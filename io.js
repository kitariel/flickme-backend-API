const {
  addUser,
  userLeft,
  getCurrentUser,
  getOnlineUsers,
} = require("./socket-io_utils/user");
const { formatMsg, getRoomMessagesFn } = require("./socket-io_utils/message");

module.exports = (io) => {
  const admin = "Admin";

  // check if connected to server with socket io
  io.on("connection", (socket) => {
    console.log(`new connection from: ${socket.id}`);

    socket.on("userJoined", async (newUser, callback) => {
        const { error, user } = addUser({ id: socket.id, ...newUser });

        // If username is taken, run alert error sa client
        if (error) return callback(error);

        // Join specific room
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
            users: getOnlineUsers(user.room),
        });

        // no-room-chatroom
        // io.emit('usersOnline', { users: getOnlineUsers() });

        callback();
    });

    // Listen for chat messages
    socket.on('sendMessage', messageData => {
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', messageData )
    })

    // Listen when someone is typing a message
    // socket.on('isTyping', name => {
    //     const user = getCurrentUser(socket.id)

    //     socket.broadcast.to(user.room).emit('isTyping', name);
    // });

    // User disconnects
    socket.on("disconnect", () => {
      const user = userLeft(socket.id);

      if (user) {
        io.to(user.room).emit(
          "message",
          formatMsg(admin, `${user.username} has disconnected.`)
        );

        io.to(user.room).emit("usersOnline", {
          room: user.room,
          users: getOnlineUsers(user.room),
        });
      }
    });
  });
};
