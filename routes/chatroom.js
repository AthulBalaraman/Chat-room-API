const router = require("express").Router()
const {catchErrors} = require('../handlers/errorHandler')
const chatroomController = require('../controllers/chatroomController')
const {validateToken} = require('../middlewares/JWT')

router.post('/',validateToken,catchErrors(chatroomController.createChatroom))

module.exports = router