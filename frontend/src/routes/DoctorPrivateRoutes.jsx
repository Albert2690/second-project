import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
function DoctorPrivateRoutes() {

    const {doctorInfo} = useSelector((state)=>state.doctor)
    console.log("heleooe")
    console.log(doctorInfo)

  return (
    <>
         {doctorInfo?<Outlet /> : <Navigate to={'/doctor/login'} replace />}
         {
            
         }

    </>
  
  )
}

export default DoctorPrivateRoutes