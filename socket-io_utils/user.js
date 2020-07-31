const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  console.log(user);
  return user;
}

// Get current user
function getCurrentUser(id, users) {
  console.log(users);
  // return users.find((user) => user.id === id);
}

module.exports = {
  userJoin,
  getCurrentUser,
};
