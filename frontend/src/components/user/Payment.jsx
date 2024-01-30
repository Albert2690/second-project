import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useBookingMutation,usePaymentMutation,useGetBookingsMutation } from '../../slices/userApislice';
import { useSelector } from 'react-redux';
import Loader from '../Loader';


function Payment({slot,date,doctor}) {
    const pay = 'proceed to payment '
    const { userInfo } = useSelector((state) => state.auth);
    const [bookings,setBookings] = useState([])
    const [success,setSuccess]=useState('')
    const [status,setStatus]=useState(false)

    const { userJwt } = userInfo.result;
    const [fetchbookings, { isloading }] = useGetBookingsMutation();
    const [payment,{isLoading}] = usePaymentMutation()
    const bookingDetials ={
        date:date,
        time:slot,
        doctor:doctor,
        fee:doctor.fee
    }

    useEffect(()=>{
      const fetch = async()=>{
        try{
       const result = await fetchbookings()
       setBookings(result.data.bookings)
        }catch(error){
          toast.error("Server Error")
        }
      }
      fetch()
    },[success,status])


    const handleSubmit = async () => {
    
    setStatus(!status)


        if (date === "" || slot === "") {
          toast.error("Please Select a slot");
          return;
        }

        const existing = bookings.find((item)=>item.doctor===doctor._id && item.timeSlot.date===date && item.timeSlot.slot===slot)
        if(existing){
         return toast.error('existing')
        }
        try {
         
         const response = await payment({  userJwt,
                date,
                slot:slot,
                doctor: doctor._id,
                fee: doctor.fee+200,})

                if(response.data.success){
                  setSuccess(response.data)
                    localStorage.setItem('bookingDetials',JSON.stringify(bookingDetials))
                    window.location.href = response.data.url
                }else{
                  toast.error(response.error.message)
                }
      
        } catch (error) {
          toast.error("server error occured");
        }
      };
  return (
   
    <div className=' max-w-[350px]  md:mt-0 md:flex    rounded-lg  shadow-lg mx-11'>
      <div className='flex flex-col gap-3 p-6 '>
      <h1 className='text-headingColor text-xl font-bold mb-7  border-b'>Booking Fee</h1>
      <div className="flex justify-start">
        <span className='text-headingColor font-semibold text-md'>Doctor :</span>
        <span className='text-headingColor font-semibold text-md' >Dr.{doctor.name}</span>

      </div>
      <span className="text-headingColor font-semibold text-md">Rs: {doctor.fee+200}/-</span>
    
      <span className='my-3 font-semibold text-md'> Time Slot :</span>
     
       <ul className=''>
  <li className='flex   gap-11 mb-[30px]' >
      <div>
          <p className="text-textColor mt-3 leading-5">{date}</p>
      </div>
      <p className="text-textColor mt-3 leading-5">{slot}</p>
      

  </li>
  </ul> 
  
  <button onClick={()=>handleSubmit()} className='bg-gradient-to-r from-blue-300 to-cyan-200 py-2 px-3 text-semibold my-3 rounded flex justify-center '>{isLoading?<Loader/>:pay}</button>
  

      </div>
      
     
    </div>
 
  )
}

export default Payment