import {useEffect,useState} from 'react'
import { useGetProfileMutation,useProfileUpdateMutation } from '../slices/userApislice'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userImg from '../assets/images/doctor-img01.png'
import Booking from '../components/user/Booking'
import ProfileSettings from '../components/user/ProfileSettings'
import { toast } from 'react-toastify'
import { logout } from '../slices/authSlice'

export default function Profile() {
  const [getprofile,{isLoading}]= useGetProfileMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state)=>state.auth)
  const [tab,setTab]= useState('booking')
 const [user,setUSer] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo && userInfo.result) {
       
        const { userJwt } = userInfo.result;
        
      const userr=  await getprofile({userJwt}); 
     
      if(userr.error){
         toast.error(userr.error.data.message)
         if(userr.error.status===401){
          
          dispatch(logout())
         
          navigate('/login')
         }
      }else{
        setUSer(userr.data.user)
      }
     
      
      }
  
      if (userInfo === null) {
        navigate('/');
      }
    };
   
    fetchData();
  }, [userInfo,getprofile, navigate]);
  
  return (
    
   
    
    
    
        
      
       <div className="max-w-[1170px] px-5  mx-auto my-16 ">
        <div className="grid md:grid-cols-3 gap-10">
    {user && <div className='pb-[50px] px-[30px] h-[500px] bg-gradient-to-r  from-blue-300 to-cyan-200 rounded-md shadow-lg' >
    
    <div className="flex itmes-center mt-7   justify-center">

        <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>

            <img src={user.image} alt="" className='w-full h-full rounded-full' />
        </figure>
    </div>
    <div className="text-center mt-4">
      <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">

       {user.name}
      </h3>
       <p className="text-textColor text-[15px] leading-6 font-medium">
        {user.email}
       </p>
       <p className="text-textColor mt-1 text-[15px] leading-6 font-medium">
        Blood Group:

        <span className="text-textColor ml-1 text-[18px] leading-6">{user.bloodgroup}</span>
       </p>


    </div>

    <div className="mt-[25px] md:mt-[40px]">
        <button className='btn text-[20px] w-full '>Logout</button>
        <button className='btn bg-red-500 w-full'>Delete Account</button>

    </div>
</div>

  }

       
        <div className="md:col-span-2 md:px[30px]">
            <div>
            <button onClick={()=>setTab('booking')} className={`  ${tab==='booking' && 'bg-primaryColor text-white'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold border border-solid border-primaryColor text-[16px]`}>Bookings</button>
                
                <button onClick={()=>setTab('profile-setting')} className={` ${tab==='profile-setting' && 'bg-primaryColor text-white'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold border border-solid border-primaryColor text-[16px]`}>Profile Settings</button>
            </div>

          {tab==='booking' && <Booking  />}
          
          {tab==='profile-setting' && <ProfileSettings/> }
    
        
       </div> 


</div>
         </div>
      )
    }
    
 

