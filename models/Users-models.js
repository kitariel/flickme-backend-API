r = require("rethinkdb");
const io = require("../io");

const usersCollection = r.db("chat_app").table("users");
const roomsCollection = r.db("chat_app").table("rooms");
const formatMessage = require("../socket-io_utils/message");
const { userJoin, getCurrentUser } = require("../socket-io_utils/user");

let Users = function (data) {
  this.data = data;
};

Users.prototype.create = async function () {
  try {
    const results = await usersCollection.insert(this.data).run(connection);
    console.log(this.data);

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
