let Users = require("../models/Users-models");

const dotenv = require("dotenv");
dotenv.config();

exports.apiCreateUsers = function (req, res) {
  let users = new Users(req.body);
  users
    .create()
    .then(() => {
      res.json("succesfully added user");
    })
    .catch((e) => {
      res.json(e);
      console.log(e);
    });
};

exports.apiGetUsers = async function (req, res) {
  try {
    let users = new Users(req.body);
    // const result = await postCollection.run(connection);
    // res.json(result._responses[0].r);

    users.getUsers().then((results) => {
      res.json(results);
    });
  } catch (e) {
    res.json("error");
  }
};
