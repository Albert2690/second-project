import React from 'react'
import Register from '../../pages/Register'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { FaMobile } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Loader';
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { Link } from "react-router-dom";
import Experience from '../Doctors/Experience';
import { useProfileUpdateMutation,useGetProfileMutation } from '../../slices/userApislice';
import uploadImageCloudinary from '../../../utils/uploadCloudinary';
import { useRadioGroup } from '@mui/material';

function ProfileSettings() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
  
    const [email, setEmail] = useState("");
    const [bloodgroup, setBloodgroup] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState('');

  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth);
    const [profile,{isLoadingg}] = useGetProfileMutation()
    const [user,setUser]= useState('')

    const {userJwt} = userInfo.userInfo.result

    const bloodGroups = [
        'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-','A+ve','A-ve','B+ve','O+ve','B-ve','AB-ve','O-ve','AB+ve'
      ];
  
    useEffect(()=>{
      if(userJwt){
        const fetchdata = async(userJwt)=>{
          try{
         let  userDetials=    await profile({userJwt})


            setUser(userDetials.data.user)
         
          }catch(error){
            toast.error("Server Error")
          }
        }
        fetchdata(userJwt)
      }
     
    },[userInfo])
  
    const [profileUpdate, { isLoading }] = useProfileUpdateMutation();
   

    const handleFileInputChange = async(e)=>{
        const file = e.target.files[0]
        const data = await uploadImageCloudinary(file)
       
        setImage(data.url)
    }
    function isCharacter(value) {
      return /^[a-zA-Z]$/.test(value);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (user.name.length <= 3) {
        toast.error("Name Should be more than 3 Characters");
      } else if (user.email === "") {
        toast.error("Email field should not be empty ");
      } else if (user.age>110) {
        toast.error("Enter A valid Age");
      } else if (user.age<18) {
        toast.error("Minimum Age Should be 18");
  
       }else if(isCharacter(user.age)){
        toast.error("Age should be in number")
       }
       
       
       else if (user.gender==='') {
            toast.error("Please Select A gender");

    } else if (user.mobile.length!==10) {
          toast.error("Invalid Mobile Number");
      }else if(!bloodGroups.includes(user.bloodgroup)){   
        toast.error("Enter a valid blood group")
      }
       else {
        try {
       
          const response = await profileUpdate({user,userImage:image, userJwt });
          navigate('/profile')
       
          
          if (!response.error) {
            
            setTimeout(()=>{
              toast.success("Registration Completed Successfully")
            },2000)
            navigate("/login");
           
          }else {
          
            toast.error(response.error.data);
          
          }
        } catch (error) {
          toast.error("Error");
        }
      }
    };
  
    return (
      <section className="px-5 lg:px-0">
        <div className="w-full max-w-[590px] mx-auto rounded-lg   shadow-lg md:p-10">

        
          <h2 className="text-headingColor  text-center   text-[22px] leading-9 font-bold mb-10">
            Edit 
            <span className="text-primaryColor ml-1 ">Profile</span>
           
          </h2>
          <form onSubmit={handleSubmit} className="py-5 md:py-0">
            <div className="py-5 relative">
              <MdEmail className="w-7 h-6 absolute top-8 left-0  " />
  
              <input
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
                value={user.name}
                onChange={(e) => setUser((prev)=>({...prev,name:e.target.value}))}
                className="w-[80%] md:w-[60%]  ml-9  px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-primaryColor text-[14px] font-semibold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md  cursor-pointer"
               
              />
            </div>
  
            <div className="py-5 relative">
              <MdEmail className="w-7 h-6 absolute top-8 left-0  " />
  
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                value={user.email}
                onChange={(e) => setUser((prev)=>({...prev,email:e.target.value}))}
                className="w-[80%] md:w-[60%]  ml-9 px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-primaryColor text-[14px] font-semibold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                required
              />
            </div>
  
            <div className="py-5 relative">
              <Si1Password className="w-7 h-6 absolute top-8 left-0" />
              <input
                type="text"
                name="blood-group"
                placeholder="Enter Your Blood group"
                value={user.bloodgroup}
                onChange={(e) => setUser((prev)=>({...prev,bloodgroup:e.target.value}))}
                className="w-[80%] md:w-[60%]  ml-9  px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-primaryColor text-[14px] font-semibold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
               
              />
            </div>
  
            <div className="py-5 relative">
              <Si1Password className="w-7 h-6 absolute top-8 left-0" />
              <input
                type="text"
                name="age"
                placeholder="Enter Your age"
                value={user.age}
                onChange={(e) => setUser((prev)=>({...prev,age:Number(e.target.value)}))}
                className="w-full md:w-[60%] ml-9  px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-primaryColor text-[14px] font-semibold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
               
              />
            </div>
            <div className="py-5 relative">
              
              <FaMobile className="w-7 h-6 absolute top-8 left-0" />
              <label htmlFor="Mobile">
              <input
                type="text"
                name="mobile"
                placeholder="Enter Your mobile"
                value={user.mobile}
                onChange={(e) => setUser((prev)=>({...prev,mobile:e.target.value}))}
                className="w-[80%] md:w-[60%]  ml-9 px-3  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-primaryColor text-[14px] font-semibold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
               
              />
              </label>
             
            </div>
            <div className="py-5 mx-5  ">

             
            <div>
    
   
    <label className="text-textColor md:text-md text-start ml-[-20px] text-sm ">
     Gender
    </label>
    <select
      className="focus:outline-none 'text-textColor md:text-md text-sm  "
      id="yourSelect"
      value={user.gender}
      onChange={(e) => setUser((prev)=>({...prev,gender:e.target.value}))}
      name="gender"
    >
        <option value="">Select</option>
      <option value="user">Male</option>
      <option value="doctor">Female</option>
    </select>
    </div>

           
            </div>

            <div className="relative w-[130px] h-[50px]">
                 <input type="file"  
                 name='photo'
                 id='customFile'
                 onChange={handleFileInputChange}
                 accept='.jpg, .png'
                 className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                 />
                <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                  >
                    Upload Image
                  </label>
                 </div>

                <Experience />

           
            {/* {isLoading&&<Loader/>} */}
          
            
          
            <div className="flex justify-center">
              {/* {isLoading?<Loader/>: */}
              
              <button className="btn " type="submit">
              Update
            </button>
            
    
              
            </div>
           
          </form>
        </div>
        <ToastContainer style={{ zIndex: 999 }} />
      </section>
    );
}

export default ProfileSettings