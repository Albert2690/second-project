import { Card, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useEffect,useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateBookingMutation } from "../../slices/DoctorApislice";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import VedioModal from "./VedioModal";
const TABLE_HEAD = ["Name", "Day","Time", "Payment","Appoinment-Status","Message","Actions"];
const socket_url = import.meta.env.VITE_APP_BASE_URLL
 

 
export function AppoinmetTable({users,setUserChange}) {
  
  const {doctorInfo} = useSelector((state)=>state.doctor)

  const socket = useRef(null)
 
  
    const {doctorJwt,name} = doctorInfo.result

  

 const [updatebooking,{isLoading}] = useUpdateBookingMutation()




let userss= users
  

const updateBooking = async (bookingId, status) => {
    try {
      if (status === 'cancelled') {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'To cancel the appointment',
          icon: 'warning',
          showCancelButton: true,
          showLoaderOnConfirm: true,
        });
  
        if (result.isDismissed) {
      
          return;
        }
      }
  
  
      const result = await updatebooking({ doctorJwt, bookingId, status });
          setUserChange(prevUserChange => !prevUserChange);
      
    } catch (error) {
      toast.error('Server Error');
    }
  };
  const setnotfication = (booking)=>{
    try{
   
       if(!socket.current){
        socket.current = io(socket_url);

       }
    
      socket.current.emit("notification", {message:` An Appoinemt has been Completed by Dr. ${name}`,booking:booking});
      toast.success("Notification is sent to admin")

    }catch(error){
      toast.error("Server ERror")
    }
  }
  
  return (
    <div className="  ">
<Card className=" overflow-scroll">
      <table className=" min-w-max text-center">
      <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-cyan-300 p-5 ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 items-center"
                >
                  <span className="text-lg text-black font-bold" >
                  {head}
                     
                  </span>
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <div className="my-2">

        </div>
        <tbody >
          {userss.map((user) => (
            <tr key={user._id} className="odd:bg-gray-200">
              <td className="">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  <span className="text-md text-gray-500 font-bold" >
                  {user.user.name}

                  </span>
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                <span className="text-md text-gray-500 font-bold" >

                  {user.timeSlot.date}
                  </span>

                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                <span className="text-md text-gray-500 font-bold" >

                  {user.timeSlot.slot}
                  </span>

                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                 {user.paymentToDoctor==='pending'&&
                  <span className="text-red-500  text-md font-bold " >{user.paymentToDoctor}</span>
                 
                 }
                   {user.paymentToDoctor==='paid'&&
                  <span className="text-green-500 text-md font-bold" >{user.paymentToDoctor}</span>
                 
                 }
                </Typography>
              </td>
              <td className="p-4">
              
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.status==='pending'&& 
                  <span className="text-blue-500 text-md font-bold" >{user.status}</span>
                  }
                   {user.status==='completed'&& 
                  <span className="text-green-500 text-md font-bold" >{user.status}</span>
                  }
                   {user.status==='cancelled'&& 
                  <span className="text-red-500 text-md font-bold" >{user.status}</span>
                  }
                </Typography>
              </td>

              <td className="p-4">
              
               <td className="p-4">
                <Link to={'/doctor/messages'} >
                <div className="flex items-center justify-center rounded-2xl cursor-pointer text-indigo-700 bg-indigo-100 h-10 w-10">
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
                </Link>
               
              </td>
            </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center items-center">
                {/* <button onClick={()=>{setnotfication(user);} } className="bg-red-500 px-1 py-1 rounded text-md font-bold text-white">notify</button> */}
               
                {user.status==='pending'?
                <Typography  as="a"  variant="small"  color="blue-gray" className="font-medium">
                  {isLoading?<Loader/>:
                  <>

                <button onClick={()=>{updateBooking(user._id,'cancelled');} } className="bg-red-500 px-1 py-1 rounded text-md font-bold text-white">Cancel</button>
                <button onClick={()=>{updateBooking(user._id,'completed'),setnotfication(user);} } className="bg-blue-500 px-1 py-1 rounded text-md ml-2 font-bold text-white">Completed</button>
                  
                </>
                  }
               </Typography>:<Typography  as="a"  variant="small"  color="blue-gray" className="font-medium">
                
                <span className="font-bold">...</span>

               
                </Typography>
               
              }
                
                </div>
              
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </div>
   
  );
}