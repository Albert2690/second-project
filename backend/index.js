import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import {
  notFoundError,
  handler,
} from "./middlewares/errorHandlingMiddleware.js";

import {Server} from 'socket.io'
connectDb();
const router = express.Router();
dotenv.config();
import cookieParser from "cookie-parser";
import userRoute from "../backend/routers/userRoutes.js";
import adminRoute from "../backend/routers/adminRoutes.js";
import doctorRoute from '../backend/routers/doctorRoutes.js'
import chatRoute from '../backend/routers/chatRouter.js'
import messageRoute from '../backend/routers/messageRoutes.js'
import { disconnect } from "mongoose";
import path from 'path'

const app = express();
;
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Enable credentials
  }));
  app.use(express.json());
app.use(cookieParser())


app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use(handler);

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute)
app.use("/api/doctor",doctorRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)

const port = process.env.PORT;

if(process.env.NODE_ENV==="production"){
  console.log(process.env.NODE_ENV);
  console.log("hai")
  const __dirname=path.resolve()
  const parentDir = path.join(__dirname ,'..'); 
  console.log(parentDir)
  app.use(express.static(path.join(parentDir,'/frontend/dist')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(parentDir,'frontend','dist','index.html')))
}else{
app.get('/',(req,res)=>{
    res.send("Server is Ready")
})
}
app.use(notFoundError);


app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

console.log(process.env.CLIENT_URL)
const io = new Server(8800,{

cors :{
  origin:process.env.CLIENT_URL
}
})



let activeUsers = []

io.on('connection',(socket)=>{
  socket.on('new-user-add',(newUserId)=>{
    console.log(newUserId,'at server ')
    if(!activeUsers.some((user)=>user.userId === newUserId)){
      activeUsers.push({
        userId:newUserId,
        socketId:socket.id
      })
    }
    console.log('new-user',activeUsers)
    io.emit('get-users',activeUsers)
  })
 
  socket.on('send-message',(data)=>{ 
    console.log(data,'sendmessage') 
    const {recieverId} = data
    const user = activeUsers.find((user)=> user.socketId !== socket.id)
    if(user){
    console.log('sending from socket to :',recieverId)

 io.to(user.socketId).emit('receive-message',  data , (acknowledge) => {
  console.log('sendingg')
  if (acknowledge) {
    console.log("sent successfully", data); 
  } else {
    console.log("failed to send to", user.socketId);
  }
});
    }
  })

// io.to(user.socketId).emit('receive-message',  data )
//     }
//   })

  socket.on('notification', (data) => {
    console.log(data,data)
    console.log("hello notification")
    io.emit('adminNotification', data);
  });
  socket.on("disconnect",()=>{
    activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
    // console.log("disconnect",activeUsers)
    io.emit('get-users',activeUsers)
  }) 
})