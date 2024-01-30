import React, { useState,useRef, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Navigate } from 'react-router-dom';
import {  useDispatch,useSelector } from 'react-redux';
import { useDoctorloginMutation,useDoctorOtpRequestMutation,useDoctorsubmitotpMutation } from '../../slices/DoctorApislice';
import { setCredentials } from '../../slices/doctorAuth';
import Loader from '../../components/Loader';



export default function DoctorLogin() {
 
  const [tab,setTab] = useState('login')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[login,{isLoading}] = useDoctorloginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {doctorInfo}  =useSelector((state)=>state.doctor)
  const [otpemail,setotpEmail]= useState('')
  const [otp,setOtp] = useState('')
 const [responseOtp,setresponseOtp]= useState()
 const [submitotp,{isloaading}] =useDoctorsubmitotpMutation()


 const [otpRequest,{isLoadingg}]= useDoctorOtpRequestMutation()
  
    useEffect(()=>{
      if(doctorInfo){
      navigate('/doctor')
        
      }else{
        navigate('/doctor/login')
      }
    },[doctorInfo,navigate])
   
  
  const handlesubmit = async (e)=>{
    e.preventDefault()
    if(email ===''){
      toast.error("Please Enter Your Email")
    }else if (password===''){
      toast.error("Please Enter Your Password")
    }else{
      try{
          const response = await login({email,password}).unwrap()
          if(response){
            dispatch(setCredentials({...response}))
            navigate('/')
            
          }else{
            toast.error("User Email or Password is incorrect")
          }

      }catch(error){
        toast.error(error.data.message)
      }
    }
  }

  const handleOtp = async(e)=>{
    e.preventDefault()
    
    if(otpemail ===''){
     return toast.error("Please Enter Your Email")
    }else if (otp===''){
     return toast.error("Please Enter otp")
    }else if(otp!==responseOtp){
     return toast.error('Otp is incorrect')
    }
    else{
      try{
        const result = await submitotp({otp:responseOtp,formotp:otp,email:otpemail,})
          if(result.data.success){
            toast.success("Logined Successfully")
            // const resultt =result.data.result
            dispatch(setCredentials({...result.data}))
            navigate('/')
            
          }else{
            toast.error(" OTP is incorrect")
          }
  
      }catch(error){
        toast.error("server Error")
      }
    }
  }
   const sendotp = async(e)=>{
    if(otpemail===''){
      toast.error("Please enter Email")
      return
    }
    e.preventDefault()
    try{
      const response =await otpRequest({email:otpemail})
      if(response.data.success){
        toast.success('Otp Sent succesfully')
        setresponseOtp(response.data.otp)
      }
    }catch(error){
    }
   }
  

  return (

    <section className='px-5 lg:px-0'>
      <div className="w-full max-w-[590px] mx-auto rounded-lg   shadow-lg md:p-10">
      <h2 className='text-headingColor  text-center  text-[22px] leading-9  font-bold mb-10'>Welcome

      <span className='text-primaryColor ml-2'> Back</span><span className='ml-2' >Doctor 🎉</span>
      </h2>
          {tab==='login' &&         
      
      <form  onSubmit={handlesubmit} className='py-5 md:py-0' >
            <div className='py-5 relative'>
              
              <MdEmail  className='w-7 h-6 absolute top-8 left-14  '/>
              
           
              
              <input type="text" 
              name='email' 
              placeholder='Enter Your Email' 
              value={email}  
              onChange={(e)=>setEmail(e.target.value)}
              className='w-full md:w-[80%] text-center md:mx-12 px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer'
              required
              />
            </div>
            <div className='py-5 relative'>
            <Si1Password className='w-7 h-6 absolute top-8 left-14' />
              <input type="password" 
              name='password' 
              placeholder='Enter Your Password' 
              value={password}  
              onChange={(e)=>setPassword(e.target.value)}
              className='w-full md:w-[80%] text-center md:mx-12 px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer'
              required
              />
            </div>
           
            <div className="flex justify-center">

            {isLoading?
            <Loader />:
            <button className='btn ' type='submit'>Submit</button>
          }
            </div>
           
           <div className="flex justify-center gap-5 mt-5 mx-4 ">
           <span onClick={()=>setTab('otplogin')} className=' cursor-pointer text-primaryColor font-semibold text-[12px] ' >Login by OTP ?</span>


           </div>
            <div className='flex justify-center mt-5 mx-4 '>
            <span>Don't have an Account ?</span> <Link to={'/register'}><span className='text-primaryColor'>Sign up</span></Link>

            </div>
           

          </form> }
    {tab==='otplogin' &&           
    <form  onSubmit={(e)=>handleOtp(e)} className='py-5 md:py-0' >
            <div className='py-5 relative'>
              
              <MdEmail  className='w-7 h-6 absolute top-8 left-14  '/>
              
           
              
              <input type="text" 
              name='email' 
              placeholder='Enter Your Email' 
              value={otpemail}  
              onChange={(e)=>setotpEmail(e.target.value)}
              className='w-full md:w-[80%] text-center md:mx-12 px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer'
              required
              />
              <span onClick={(e)=>sendotp(e)} className='absolute cursor-pointer text-[12px] text-primaryColor font-semibold top-11 right-2' >Send OTP</span>
            </div>
            <div className='py-5 relative'>
            <Si1Password className='w-7 h-6 absolute top-8 left-14' />
              <input type="text" 
              name='text' 
              placeholder='Enter Your OTP' 
              value={otp}  
              onChange={(e)=>setOtp(e.target.value)}
              className='w-full md:w-[80%] text-center md:mx-12 px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer'
              required
              />
            </div>
           
            <div className="flex justify-center">

            {isLoading?
            <Loader />:
            <button className='btn ' type='submit'>Submit</button>
          }
            </div>
           
           <div className="flex justify-center gap-5 mt-5 mx-4 ">
           <span onClick={()=>setTab('login')} className=' cursor-pointer text-primaryColor font-semibold text-[12px] ' >Login by Password ?</span>

           


           </div>
            <div className='flex justify-center mt-5 mx-4 '>
            <span>Don't have an Account ?</span> <Link to={'/register'}><span className='text-primaryColor'>Sign up</span></Link>

            </div>
           

          </form> }
        </div> 
      <ToastContainer/>
    </section>
  );
}
