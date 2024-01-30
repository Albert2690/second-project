import React from 'react'
import { useEffect,useState,useRef } from 'react'
import { toast } from 'react-toastify'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useDoctorProfileMutation,useGetUserMutation,useFetchMessagesMutation } from '../../slices/DoctorApislice'
import { useGetProfileMutation } from '../../slices/userApislice';
import Loader from '../Loader';

function UserConversation({data,userJwt}) {

 const [userProfile,{isLoading}] = useGetProfileMutation()
 const [userFetch,{isloading}] =useGetUserMutation()
 const [sendingUser,setSendingUser] = useState('')
 const [user,setUser]= useState('')

    useEffect(()=>{

        const fetchuser = async()=>{
            try{
           const result = await userProfile({userJwt})
          
           setSendingUser(result.data.user)
          const userId = data.members.find((id)=>id !== result.data.user._id)
       
     const resultt = await userFetch({userJwt,userId:userId})
    
     setUser(resultt.data.user)
          
            }catch(error){
                toast.error("Server Error")
            }
        }


         fetchuser()
          
      

        
    },[])
   



  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto">
           {isLoading || isloading?
        
        
        (
        <div className="flex justify-center items-center" >
        <Loader/>

        </div>
        
        ):
        (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
        {user.image?
       
      <img className="flex items-center justify-center h-8 w-8  rounded-full"
      src={user.image} alt=""
       />:
       <div className="flex items-center font-semibold text-textColor justify-center h-8 w-8 bg-gray-200 rounded-full">
       {user?.name?.charAt(0).toUpperCase()}
     </div>
       
    }
     
      <div className="ml-2 text-sm font-semibold">Dr. {user.name}</div>
    </button>
        )
}
    
  </div>
  )
}

export default UserConversation