import React, { useState,useRef, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from '../slices/userApislice';
import { useNavigate,Navigate } from 'react-router-dom';
import {  useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { useOtprequestMutation,useSubmitotpMutation } from '../slices/userApislice';

export default function Login() {
 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[login,{isloading}] = useLoginMutation()
  const [otpRequest,{isLoading}] = useOtprequestMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userInfo}  =useSelector((state)=>state.auth)
 const [tab,setTab] = useState('login')
 const [otp,setOtp]= useState('')
 const [otpemail,setotpEmail] = useState('')
 const [responseOtp,setresponseOtp]= useState()
 const [submitotp] =useSubmitotpMutation()

  
    useEffect(()=>{
      if(userInfo){
      navigate('/')
        
      }else{
        navigate('/login')
      }
    },[userInfo,navigate])
   
  
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
      toast.error(error.data.message)
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
    toast.error("Server Error")
  }
 }

  return (
    <section className='px-5 lg:px-0'>
      <div className="w-full max-w-[590px] mx-auto rounded-lg   shadow-lg md:p-10">
      <h2 className='text-headingColor  text-center  text-[22px] leading-9 font-bold mb-10'>Hello

      <span className='text-primaryColor'> Welcome</span><span > Back 🎉</span>
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
           {/* <span className=' cursor-pointer text-primaryColor font-semibold text-[12px] ' >Forgot password ?</span> */}


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
           {/* <span className=' cursor-pointer text-primaryColor font-semibold text-[12px] ' >Forgot password ?</span> */}
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
