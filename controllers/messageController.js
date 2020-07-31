const r = require('rethinkdb')

let Message = require('../models/MessageModel');

// @GET /
// Get all messages
exports.apiGetMessages = async (req, res) => {
    let message = new Message()

    const result = await message.getMessages()
    res.json(result)
    console.log(result)
}

// @POST /
// Add or insert a message
exports.apiAddMessage = async (req, res) => {

    let message = new Message(req.body)
    const result = message.addMessage()

    return res.json(result)

}