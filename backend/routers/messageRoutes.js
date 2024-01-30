import express from 'express'
import { addmessage,getmessages,updateMessage } from '../controllers/messageController.js'
const router = express.Router()

router.post('/create-message',addmessage)
router.post('/getmessages',getmessages)
router.put('/seen-message',updateMessage)

export default router