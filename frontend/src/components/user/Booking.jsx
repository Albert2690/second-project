import React, { useEffect,useState } from 'react'
import DocotrList from '../DocotrList'
import Experience from '../Doctors/Experience'
import { usePatientBookingsMutation } from '../../slices/userApislice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
function Booking() {
  const { userInfo } = useSelector((state) => state.auth);

  const { userJwt } = userInfo.result;
  const [booking,setBooking]= useState([])
const [bookinHistory,{isLoading}] = usePatientBookingsMutation()
  useEffect(()=>{
    console.log("diiii")
    const fetch=async()=>{
      console.log('hello')

      try{
        const result = await bookinHistory({userJwt})
        console.log('hellooo')
        console.log(result.data.bookings,'boo')
        setBooking(result.data.bookings)

      }catch(error){
        console.log(error)
        toast.error("Server Error")
      }
    }

   fetch()

  },[userJwt])
  console.log(booking,'bookin')

  return (
    <DocotrList booking={booking}  />
    
    
  )
}

export default Booking