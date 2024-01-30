import React, { useState,useRef, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminLoginMutation } from '../../slices/adminApislice';
import { useNavigate,Navigate } from 'react-router-dom';
import {  useDispatch,useSelector } from 'react-redux';
import {setAdminCredentials } from '../../slices/adminAuthSlice';
import Loader from '../../components/Loader';


export default function AdminLogin() {
  // State for input values
  // const [formData, setFormData] = useState({
  //   email:'',
  //   password:''

  // });
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[login,{isLoading}] = useAdminLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {adminInfo}  =useSelector((state)=>state.admin)
console.log(adminInfo,'he;llo')
  
    useEffect(()=>{
      if(adminInfo){
      
      navigate('/admin')
        
      }else{
        navigate('/admin/login')
      }
    })
  
  const handlesbmit = async (e)=>{
    e.preventDefault()
    if(email ===''){
      toast.error("Please Enter Your Email")
    }else if (password===''){
      toast.error("Please Enter Your Password")
    }else{
      try{
          const response = await login({email,password}).unwrap()
          console.log(response,'hii')
          if(response.success){
            dispatch(setAdminCredentials({...response}))
            navigate('/admin')
            
          }else{
            toast.error("User Email or Password is incorrect")
          }

      }catch(error){
        console.log(error)
        toast.error(error.data.message)
      }
    }
  }
 

  return (
    <section className='px-5 lg:px-0'>
      <div className="w-full max-w-[590px] mx-auto rounded-lg   shadow-lg md:p-10">
      <h2 className='text-headingColor  text-center  text-[22px] leading-9 font-bold mb-10'>Hello

      <span className='text-primaryColor'> Welcome</span><span > Admin 🎉</span>
      </h2>
          <form  onSubmit={handlesbmit} className='py-5 md:py-0' >
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
         
           
            {/* <div className='flex justify-center mt-5 '>
            <span>Don't have an Account ?</span> <Link to={'/register'}><span className='text-primaryColor'>Sign up</span></Link>

            </div> */}
           

          </form>
        </div> 
      <ToastContainer/>
    </section>
  );
}
