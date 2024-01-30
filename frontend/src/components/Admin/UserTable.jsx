import { Card, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserBlockMutation,useUsersFetchMutation } from "../../slices/adminApislice";
import Loader from "../Loader";
import { toast } from "react-toastify";
 
const TABLE_HEAD = ["Name", "email", "mobile","Actions"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
   
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
   
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
   
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
   
  },
];
 
export function UserTable({users,setUserChange,userchage}) {
  


  

 const [userBlock,{isLoading}] = useUserBlockMutation()
 const[getUsers,{isLoadingg}] = useUsersFetchMutation()




let userss= users
  

const blockuser = async(userId)=>{
  
  try{
   await userBlock({userId})
   const response=  await getUsers()
   setUserChange(prevUserChange => !prevUserChange);
  
  }catch(error){
    toast.error("Server Error")
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
                  {head}
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
                  {user.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.mobile}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center items-center">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Info
                </Typography>
                {user.is_blocked===0?
                <Typography  as="a"  variant="small"  color="blue-gray" className="font-medium">
                  {isLoading?<Loader/>:
                <button onClick={()=>{blockuser(user._id);} } className="bg-red-500 px-1 py-1 rounded text-white">Block</button>
                  
                  
                  }
               </Typography>:<Typography  as="a"  variant="small"  color="blue-gray" className="font-medium">

                {isLoading?<Loader/>:
                 <button onClick={()=>{blockuser(user._id);} }  className="bg-primaryColor px-1 py-1 rounded text-white">Unblock</button>

                }
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