var express = require('express');
var apiRouter = express.Router();

const messageController = require('../controllers/messageController')

apiRouter.get('/', messageController.apiGetMessages)
apiRouter.post('/', messageController.apiAddMessage)

module.exports = apiRouter;