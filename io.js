const io = require("socket.io")(); // yes, no server arg here; it's not required
// attach stuff to io

const formatMessage = require("./socket-io_utils/message");
const { userJoin, getCurrentUser } = require("./socket-io_utils/user");

io.on("connection", (socket) => {
  console.log("new web socket comnnection");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit("chatFromServer", formatMessage("chatbot", "Welcome"));

    // Broadcast when a user conencts
    socket.broadcast.emit(
      "chatFromServer",
      formatMessage("chatbot", `user has joined the chat`)
    );
  });

  // Listen for chat message from client
  socket.on("chatFromClient", (message) => {
    console.log(message);
    const user = getCurrentUser(socket.id);
    // const fromUser = user.username;
    socket.broadcast
      .to(user.room)
      .emit("chatFromServer", formatMessage(fromUser, message));
  });

  // This runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("chatFromServer", formatMessage("chatbot", "A user has left the chat"));
  });
});

module.exports = io;
