const r = require('rethinkdb')

let Messages = require('../models/Messages-models');

// @GET /
// Get all messages
exports.apiGetMessages = async (req, res) => {
    let message = new Messages()
    const result = await message.getMessages()

    return res.json(result)
}

// @POST /
// Add or insert a message
exports.apiAddMessage = async (req, res) => {
    let message = new Messages(req.body)
    console.log(message)
    const result = message.addMessage()

    return res.json(result)

}