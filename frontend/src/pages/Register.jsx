import React, { useState, useRef, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApislice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaMobile } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";


export default function Register() {
  // const [formData, setFormData] = useState({
  //   email:'',
  //   password:'',
  //   confirmPassword:'',

  // });

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (name.length <= 3) {
      toast.error("Name Should be more than 3 Characters");
    } else if (email === "") {
      toast.error("Email field should not be empty ");
    } else if (password.length < 5) {
      toast.error("OOPS....! Password is too short");
    } else if (password !== confirmPassword) {
      toast.error("Passwords are not matching");

     } else if (mobile.length!==10) {
        toast.error("Invalid Mobile Number");
    } else {
      try {
       
       
        const response = await register({ name, email, password, role, mobile });
        
        if (!response.error) {
          
          setTimeout(()=>{
            toast.success("Registration Completed Successfully")
          },2000)
          navigate("/login");
         
        }else {
          toast.error(response.error.data.message);
        
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[590px] mx-auto rounded-lg   shadow-lg md:p-10">
        <h2 className="text-headingColor  text-center  text-[22px] leading-9 font-bold mb-10">
          Hello
          <span className="text-primaryColor"> Welcome</span>
          <span> 🎉</span>
        </h2>
        <form onSubmit={handleSubmit} className="py-5 md:py-0">
          <div className="py-5 relative">
            <MdEmail className="w-7 h-6 absolute top-8 left-14  " />

            <input
              type="text"
              name="name"
              placeholder="Enter Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-[80%] text-center  px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md  cursor-pointer"
             
            />
          </div>

          <div className="py-5 relative">
            <MdEmail className="w-7 h-6 absolute top-8 left-14  " />

            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-[80%] text-center  px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="py-5 relative">
            <Si1Password className="w-7 h-6 absolute top-8 left-14" />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full md:w-[80%] text-center  px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
             
            />
          </div>

          <div className="py-5 relative">
            <Si1Password className="w-7 h-6 absolute top-8 left-14" />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="w-full md:w-[80%] text-center  px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
             
            />
          </div>
          <div className="py-5 relative">
            
            <FaMobile className="w-7 h-6 absolute top-8 left-14" />
            <input
              type="text"
              name="mobile"
              placeholder="Enter Your mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full md:w-[80%] text-center  px-4 py-3 border-b border-solid botder-[#0066ff61] focus:outline-none
              focus:border-primaryColor text-[18px] text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
             
            />
          </div>
          <div className="py-5 ml-[58px] flex gap-4 items-center ">
            <label className="text-textColor md:text-md text-sm ">
              Choose a Role
            </label>
            <select
              className="focus:outline-none 'text-textColor md:text-md text-sm  "
              id="yourSelect"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              name="role"
            >
              <option value="user">user</option>
              <option value="doctor">doctor</option>
            </select>
          </div>
          {/* {isLoading&&<Loader/>} */}
        
          
        
          <div className="flex justify-center">
            {isLoading?<Loader/>:
            <button className="btn " type="submit">
            Submit
          </button>
          
          }
            
          </div>
          <div className="flex justify-center mt-5 ">
            <span>Don't have an Account ?</span>{" "}
            <Link to={"/register"}>
              <span className="text-primaryColor">Sign up</span>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer style={{ zIndex: 999 }} />
    </section>
  );
}
