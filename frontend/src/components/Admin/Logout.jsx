import React from 'react'
import { useAdminLogoutMutation } from '../../slices/adminApislice'
import { useSelector,useDispatch } from 'react-redux'
import { Adminlogout } from '../../slices/adminAuthSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ALogout() {
    const [AdminlogoutApi,{isLoading}]= useAdminLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutCall = async (e)=>{
        e.preventDefault()
        try{
           await AdminlogoutApi()
            dispatch(Adminlogout())
            console.log("hello")
            navigate('/admin/login')

        }catch(error){
          toast.error("Server Error")
        }
    }
  return (
    
    <button onClick={logoutCall} className="bg-red-500 px-2 py-1 rounded-full font-[500] w-full text-sm text-white flex items-center justify-center">
      Logout
    </button>
  
  )
}

export default ALogout