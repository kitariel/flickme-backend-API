r = require("rethinkdb");
const io = require("../io");

const usersCollection = r.db("chat_app").table("users");
const roomsCollection = r.db("chat_app").table("rooms");
const formatMessage = require("../socket-io_utils/message");
const { userJoin, getCurrentUser } = require("../socket-io_utils/user");

let Users = function (data) {
  this.data = data;
};

// Users.prototype.create = function () {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await usersCollection.insert(this.data).run(connection);
//       console.log(this.data);
//       resolve("succesfully added users");
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
// };

// const onlineUsers = this.data.username;

const moderator = "chatbot";

Users.prototype.create = async function () {
  try {
    const results = await usersCollection.insert(this.data).run(connection);
    console.log(this.data);

    io.on("connection", (socket) => {
      console.log("new web socket comnnection");

      socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        socket.emit("chatFromServer", formatMessage(moderator, "Welcome"));

        // Broadcast when a user conencts
        socket.broadcast
          .to(user.room)
          .emit(
            "chatFromServer",
            formatMessage(moderator, `${user.username} has joined the chat`)
          );
      });

      // Listen for chat message from client
      socket.on("chatFromClient", (message) => {
        console.log(message);
        const user = getCurrentUser(socket.id);
        const fromUser = user.username;
        socket.broadcast
          .to(user.room)
          .emit("chatFromServer", formatMessage(fromUser, message));
      });

      // This runs when client disconnect
      socket.on("disconnect", () => {
        io.emit(
          "chatFromServer",
          formatMessage(moderator, "A user has left the chat")
        );
      });
    });

    return results;
  } catch (e) {
    console.log(e);
  }
};

Users.prototype.getUsers = async function () {
  try {
    const results = await usersCollection.run(connection);
    // console.log("success");
    const getUser = results._responses[0].r;

    if (getUser) {
      return getUser;
    }
  } catch (e) {
    return "There was an error";
  }
};

module.exports = Users;
