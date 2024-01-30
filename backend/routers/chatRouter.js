import express from "express";
import { createChat,userChats,findChats } from "../controllers/chatController.js";
import authencticateDoctor from "../middlewares/doctorAuth.js";
const router= express.Router()

router.post('/createChat',createChat)
router.post('/getChats',userChats)
router.post('/findChats',findChats)


export default router