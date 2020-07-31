const r = require('rethinkdb')

let User = require('../models/UserModel');

// @GET /
// Get all users
exports.apiGetUsers = async (req, res) => {
    let user = new User()
    const result = await user.getUsers()
    res.json(result)
}

// @POST /
// Add or insert a user
exports.apiAddUser = async (req, res) => {
    let user = new User(req.body)
    const result = user.addUser()
    return res.json(result)
}