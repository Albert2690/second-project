import Chat from "../models/chatmodel.js";
import StatusCodes from "../utils/statusCodes.js";
import { Types } from "mongoose";

const createChat = async (req, res) => {
  try {
    const newchat = await Chat.create({
      members: [req.body.senderId, req.body.recieverId],
    });

    if (newchat) {
      res.status(StatusCodes.CREATED).json({ success: true });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR) 
      .json({ message: "Internal Server Error" });
  }
};

const userChats = async (req, res) => {
  const { id } = req.body;
  const idd = id.toString();

  try {
    const userChatss = await Chat.find({ members: { $in: [idd] } });

    if (userChatss) {
      res.status(StatusCodes.OK).json({ chats: userChatss });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const findChats = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.body.firstId, req.body.secondId] },
    });

    if (chat) {
      res.status(StatusCodes.OK).json({ chat });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Internal Server Erorr");
  }
};

export { createChat, userChats, findChats };
