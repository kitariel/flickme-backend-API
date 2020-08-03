// const UsersModel = require('../models/Users-models')

const users = [];

const addUser = ({ id, username, room, date }) => {
  // 1 username lang sa whole chat app, not per room kay para if mo balhin ang user, dili na pud ma conflict sa username
  const existingUser = users.find((user) => user.username === username);

  if (!username) return { error: "Username is required." };
  if (existingUser) {
    return {
      error: `${
        username[0].toUpperCase() + username.slice(1)
      } already exists. Please use another username.`,
    };
  }

  const user = { id, username, room, date };
  users.push(user);
  return {user}
};

const userLeft = async (id) => {
    const index = await users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }

    // set isLoggedIn to false when user disconnects
    // let currentUser = new UsersModel(id)
    // const getUserId = await currentUser.getUserById()
    // const result = await getUserId.userUpdateById()
    // console.log(result)
    // return result
}

const getCurrentUser = (id) => users.find((user) => user.id === id);

// room-based chat
const getOnlineUsers = (room) => users.filter((user) => user.room === room);

// no-room-chatroom
// const getOnlineUsers = () => users.filter((user) => user);

module.exports = { addUser, userLeft, getCurrentUser, getOnlineUsers };
