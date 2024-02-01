import React, { useEffect, useState } from 'react'
import { useFetchMessagesMutation,useNewMessageMutation,useUpdateMessageMutation } from '../../slices/DoctorApislice';
import { toast } from 'react-toastify';
import { format } from "timeago.js";
import { useRef } from 'react';
import { io } from "socket.io-client";
import InputEmoji from 'react-input-emoji';



function UserChatBox({Chat,currentUser,chat,userId,setSendmessage,recieverId,recieveMessage}) {
    // console.log(chat,'userchat@chatbox')
    // console.log(recieveMessage?.chatId,'userchat@chatbox')
    // console.log(Chat,'userchat@chatbox')

    // console.log(userId,'usererrere')
    const socket = useRef();
    const [updateMessage,{isloadinggg}] = useUpdateMessageMutation()

    const [messages,setMessages] =useState([])
    const [Messages, { isloading }] = useFetchMessagesMutation();
    const [createMessage, { isloadingg }] = useNewMessageMutation();
    const [newmessage,setNewmessage]= useState('')


    useEffect(()=>{
        if(recieveMessage!==null && recieveMessage?.chatId === Chat){
            // console.log("data recieved in chat :",recieveMessage)
            setMessages([...messages,recieveMessage])
        }
    },[recieveMessage])

useEffect(()=>{

    const fetchMessages = async()=>{
        try{
            setNewmessage("");
            const result = await Messages({ doctorJwt:currentUser, chatId:Chat });
      
            setMessages(result.data.messages);
            if(userId){
        const resultt = await updateMessage({reciever:userId,chatId:Chat})

            }
        }catch(error){
            console.log(error)
            toast.error("server Error")
        }
    }
   if(Chat) {
    console.log(Chat,'Chat')
    fetchMessages()
   }


},[Chat])

const sendMessage = async (e) => {
    e.preventDefault();
   
    // const chatt = chat.find((items)=>items._id === Chat )
    
    // const recieverId = chatt.members.find((id)=>id!==userId)
  console.log(recieverId,'@chatBoxuser')
    const sendSocket = {
        senderId:userId,
        text:newmessage,
        chatId:Chat,
        recieverId
      }
      setSendmessage(sendSocket)
  
    try {
    
      const { data } = await createMessage({
        text: newmessage,
        senderId: userId,
        recieverId,
        chatId:Chat,
      });
    //  console.log(data,'hi this is neww message')
    if(userId){
      await updateMessage({reciever:userId,chatId:Chat})

    }
      setMessages([...messages, data.message]);
     
      setNewmessage("");
      
      
      
    } catch (error) {
        console.log(error)
      toast.error("server error");
    }
  };


  return (
    <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center ">
                    <div className=" font-bold text-sm b py-4 px-5 shadow rounded-xl">
                      <div>Click a conversation</div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {messages.map((items) =>
                        items.senderId === userId ? (
                          //
                          <div className="col-start-6 col-end-13 p-3 rounded-lg">
                            <div className="flex items-center justify-start flex-row-reverse">
                         
                              <div className="relative mr-3 ">
                                <div className="bg-gradient-to-r from-blue-300 to-cyan-200 text-sm  shadow rounded-xl  py-2 px-4">
                                  {items.text}
                                </div>
                                <div className=" mt-2 px-3 mr-2 text-xs bg-gray-100 border-0 text-gray-500">
                                  {format(items.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-start-1 col-end-8 p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                            
                              <div className="relative mr-3 ">
                                {" "}
                                <div className="bg-white text-sm  shadow rounded-xl  py-2 px-4">
                                  {items.text}
                                </div>
                                <div className=" mt-2 px-3 mr-2 text-xs bg-gray-100 border-0 text-gray-500">
                                  {format(items.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}

                   
                    </div>
                  </div>
                </div>
               
                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div>
                      <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={newmessage}
                          onChange={(e) => setNewmessage(e.target.value)}
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        
                       <InputEmoji
              value={newmessage}
             
              onChange={(e) => setNewmessage(e)}
              
              />


                        </button>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        
                        className="flex items-center justify-center bg-gradient-to-r from-blue-300 to-cyan-200 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      >
                        <span onClick={(e)=>sendMessage(e)}  >send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
            
              </div>
            </div>
  )
}

export default UserChatBox