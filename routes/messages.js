const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

const messageController = require('../controllers/messages-controller')

router.get('/', messageController.apiGetMessages)
router.post('/', messageController.apiAddMessage)

module.exports = router;