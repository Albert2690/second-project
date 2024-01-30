import React from 'react'
import { useState,useEffect } from 'react'
import doctorimg from '../../assets/images/doctor-img02.png'
import staricon from '../../assets/images/Star.png'
import About from '../../components/Doctors/About'
import Feedback from '../../components/Doctors/Feedback'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDoctorDetialsMutation } from '../../slices/userApislice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import Error from '../Error'


export default function DoctorDetials() {
const navigate = useNavigate()
const [doctorDetials,{isLoading}] = useDoctorDetialsMutation()
const [doctor,setDoctor] = useState('')
  const {id} = useParams()
  const [tab,setTab] = useState('about')

  useEffect(()=>{
  const fetch= async(id)=>{
  try{
const result = await doctorDetials({id})

if(result.data.success){
  setDoctor(result.data.doctor)
}else{
  toast.error("Doctor Not found")
}

  }catch(error){
    navigate('/*')
  }

  }
  fetch(id)
  },[doctorDetials])

  const navigateBooking = (id)=>{

    navigate(`/appoinment-doctor/${id}`)

  }

  return (
   <section>
    {
      isLoading && !doctor?(
        <Loader/>
      ):(
        <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctor.image} alt="" />
              </figure>
  
              <div className=''>
                <span className="bg-gradient-to-r from-blue-300 to-cyan-200 py-1 px-6 lg:py-2 lg:px-7  text-[12px] leading-4 lg:text-[16px]  lg:leading-7 font-semibold rounded">
                  {doctor.specialization}
                </span>
                <h2 className=" text-headingColor font-semibold mt-4 leading-7">Dr.{doctor.name}</h2>
                <div className="flex items-center gap-1 md:gap-3">
                  <span className='w-4 h-4 leading-5 '>
                    <img src={staricon} alt="" />
                    
                  </span>
                  <span className='text-sm md:text-[14px] font-semibold text-headingColor'>4.2</span>
                  <span className='text-sm md:text-[14px] text-headingColor'>(256)</span>
                </div>
              </div>
              
            </div>
            <div className="border-b mt-5 border-solid  flex ">
              <button onClick={()=>setTab('about')} className={` ${tab==='about'&& 'border-b border-black border-7 '}py-2 px-5 mr-7  text-textColor font-[400]`} >About</button>
              <button onClick={()=>setTab('feedback')} className={` ${tab==='feedback'&& 'border-b border-black border-7 '}py-2 px-5 mr-7 text-textColor font-[400]`}>Feedback</button>
              
            </div>
            {tab==='about'&&<About doctor={doctor} />}
            {tab==='feedback'&&<Feedback/>}
          </div>
          <div className="md:col-span-1">
            <div className='  md:mt-0 md:flex  rounded-lg  shadow-lg mx-auto'>
              <div className='flex flex-col gap-3 p-6 '>
              <h1 className='text-headingColor text-lg font-semibold '>Booking Fee</h1>
              <span className="text-headingColor font-semibold text-md">Rs: {doctor.fee+200}/-</span>
              {/* <span className='my-3 font-semibold text-md'>Available Time Slots :</span>
              <div className="flex justify-end">
                <span>Saturday</span>
                <span>2 pm - 3 pm</span>
  
              </div>
               <ul className=''>
          <li className='flex     md:gap-11 mb-[30px]' >
              <div>
                  <p className="text-textColor mt-3 leading-5">staurday :</p>
              </div>
              <p className="text-textColor mt-3 leading-5">2:30 pm - 3:00 pm</p>
              
  
          </li>
          </ul>  */}
          {/* <Link to={'/'}className='bg-gradient-to-r from-blue-300 to-cyan-200 py-2 px-3 text-semibold my-3 rounded justify-center flex' > */}
          
          <button onClick={()=>navigateBooking(doctor._id)} className='bg-gradient-to-r from-blue-300 to-cyan-200 py-2 px-3 text-semibold my-3 rounded justify-center flex'>Book Appoinment</button>
          
          {/* </Link> */}
  
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
      )
    }

   </section>
  )
}
