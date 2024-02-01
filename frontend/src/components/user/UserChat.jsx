/* eslint-disable react/no-unknown-property */
// import io from "socket.io-client";

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  useFetchChatsMutation,
  useFetchMessagesMutation,
  useNewMessageMutation,
} from "../../slices/DoctorApislice";
import { toast } from "react-toastify";
import UserChatBox from "./UserChatBox";
import UserConversation from "./UserConversation";
import Loader from "../Loader";
import { io } from "socket.io-client";
const socket_url = import.meta.env.VITE_APP_SOCKET_URL;


function UserChat() {
  const [Messages, { isloading }] = useFetchMessagesMutation();
  const [createMessage, { isloadingg }] = useNewMessageMutation();
  const [fetchChat, { isLoading }] = useFetchChatsMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [currentChat, setCurrentChat] = useState("");
  const { userJwt,userId } = userInfo?.result;

  const socket = useRef();
  const [userData, setUserData] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const [reciever,setReciever] = useState('')
  const [messages, setMessages] = useState([]);
  const [firstChat, setFirstChat] = useState([]);
  const [newmessages, setNewmessages] = useState("");
  const [sendmessage,setSendmessage] = useState(null)
  const [recievemessage,setrecievemessage] = useState(null)

console.log(reciever,'@cuserChat')
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchChat({ userJwt, id:userId });
        const copiedChats = [...result.data.chats];
        const sortedChats = copiedChats.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
  
        setChat(sortedChats);

        setFirstChat(result?.data?.chats[0]);
        // setCurrentChat(result?.data?.chats[0]._id)
      } catch (error) {
        toast.error("Internal Server Error");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    socket.current = io(socket_url);
    socket.current.emit("new-user-add",userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userJwt]);


  useEffect(()=>{
    if(sendmessage!==null){
      socket.current.emit('send-message',sendmessage)
    }
  },[sendmessage])

  useEffect(() => {
   

    socket.current.on("receive-message", (data) => {
      if (data.text) {
        setrecievemessage(data)
      }else{

      }
     
    });

    
  }, []);
  

  const chatload =  (chatId,members) => {
   
      setCurrentChat(chatId);
    const recieverId = members.find((id)=>id!==userId)
    setReciever(recieverId)
   
  };
 
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   const chatId = currentChat ? currentChat : firstChat._id;
  //   const chatt = chat.find((items)=>items._id === chatId )
    
  //   const recieverId = chatt.members.find((id)=>id!==userId)
  
  //   const sendSocket = {
  //       senderId:userId,
  //       text:newmessages,
  //       chatId,
  //       recieverId
  //     }
    
  
  //   try {
  //       if(sendSocket){
  //           console.log('sendinhhh')
  //           await socket.current.emit('send-message',sendSocket)
  //       }
  //       await socket.current.on('receive-message',(data)=>{
  //           console.log('helllooiuuuu')
  //           if(data.text){
  //               setrecievemessage(data)
  //               console.log("done")

  //           }
  //           console.log(data,'fgfdsgb')
  //       })
  //     const { data } = await createMessage({
  //       text: newmessages,
  //       senderId:userId,
  //       chatId,
  //     });
  //    console.log(data,'hi this is neww message')
  //     setMessages([...messages, data.message]);
     
  //     setNewmessages("");
      
  //     console.log(chat, "chatidcurent");
      
  //   } catch (error) {
  //       console.log(error)
  //     toast.error("server error");
  //   }
  // };

 

  return (
    <div>
      {isLoading || chat === null? (
        <div className="flex justify-center items-center">
            {isLoading?
            (
          <Loader />

            ):
            (
                <div className='text-lg font-bold '>
                    No Chats found
                </div>
            )
        
        }
        </div>
      ) : (
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
              </div>

              <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {chat?chat.length:0}
                  </span>
                </div>
                {chat?.map((item) => (
                  <div onClick={() => chatload(item._id,item.members)}>
                    <UserConversation data={item} userJwt={userJwt} userId={userId} />
                  </div>
                ))}
              </div>
            </div>
            {
              currentChat ?
            (<UserChatBox Chat={currentChat} currentUser={userJwt} chat={chat}userId={userId}setSendmessage={setSendmessage} recieverId={reciever} recieveMessage={recievemessage} />
            )
            :
            (
              
                <div className="flex items-start mt-20  w-full justify-center ">
                <div className=" font-bold text-sm b py-4 px-5 shadow rounded-xl">
                  <div>Click a conversation to start  a Conversation</div>
                </div>
              </div>
              
            )

            }
          
          </div>
        </div>
      )}
    </div>
  );
}

export default UserChat;
