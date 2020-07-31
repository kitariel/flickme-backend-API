var express = require('express');
var apiRouter = express.Router();

const userController = require('../controllers/userController')

apiRouter.get('/', userController.apiGetUsers)
apiRouter.post('/', userController.apiAddUser)

module.exports = apiRouter;
