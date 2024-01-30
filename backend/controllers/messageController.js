import Message from "../models/messageModel.js";
import StatusCodes from "../utils/statusCodes.js";
import Chat from "../models/chatmodel.js";



const addmessage = async (req, res) => {
  try {
    const { chatId, senderId, text,recieverId } = req.body;
    const currentTimestamp = Date.now();
    const currentDateTime = new Date(currentTimestamp);
    currentDateTime.setSeconds(0);
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { $set: { lastMessageTime: currentDateTime } }
    );

    const message = await Message.create({
      chatId,
      senderId,
      recieverId,
      text,
    });
    if (message) {
      res.status(StatusCodes.CREATED).json({ message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server Error" });
  }
};

const getmessages = async (req, res) => {
  try {
    const { chatId } = req.body;
    const messages = await Message.find({ chatId });
    res.status(StatusCodes.OK).json({ messages });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const updateMessage = async(req,res)=>{
    try{
        console.log(req.body,'@messageontroller')
        if(req.body.reciever){
            const message = await Message.updateMany({chatId:req.body.chatId, recieverId:req.body.reciever},{$set:{is_seen:true}})

        }
  res.status(StatusCodes.OK).json({message:"Messages Updated"})

   
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }

}
export { addmessage, getmessages,updateMessage };
