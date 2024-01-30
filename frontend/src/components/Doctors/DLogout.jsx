import React from 'react'
import { useAdminLogoutMutation } from '../../slices/adminApislice'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../slices/doctorAuth'

function DLogout() {
    const [AdminlogoutApi,{isLoading}]= useAdminLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutCall = async (e)=>{
        e.preventDefault()
        try{
            console.log("started")
            dispatch(logout())
            console.log("hello")
            navigate('/doctor/login')

        }catch(error){
            console.log(error)
        }
    }
  return (
    
    <button onClick={logoutCall} className="bg-red-500 px-2 py-1 rounded-full font-[500] w-full text-sm text-white flex items-center justify-center">
      Logout
    </button>
  
  )
}

export default DLogout