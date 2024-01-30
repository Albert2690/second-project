import React from 'react'
import { useLogoutMutation } from '../slices/userApislice'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const [logoutApi,{isLoading}]= useLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutCall = async (e)=>{
        e.preventDefault()
        try{
            console.log("start")
            const response = await logoutApi()
            dispatch(logout())
            console.log("hello")
            navigate('/')

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

export default Logout