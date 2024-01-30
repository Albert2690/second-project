import React from 'react'
import { useEffect } from 'react'
import { UserTable } from '../../components/Admin/UserTable'
import UserList from './UserList'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminHome() {
   
  const {adminInfo}  = useSelector ((state)=>state.admin)
  console.log(adminInfo,'albeee')
  const navigate = useNavigate()
  useEffect(()=>{
    if(!adminInfo){
    
      navigate('/admin/login')
      
    }else{
      navigate('/admin')
    }
  },[])
  return (
    <div>

 <UserList />
    </div>
  )
}

export default AdminHome
