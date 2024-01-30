import {useState} from 'react'
import userImg from '../assets/images/doctor-img01.png'

function UserAccount() {

    const [tab,setTab]= useState('')
  return (
   <div className="max-w-[1170px] px-5  mx-auto">
    <div className="grid md:grid-cols-3 gap-10">

    <div className='pb-[50px] px-[30px] bg-gradient-to-r from-blue-300 to-cyan-200 rounded-md shadow-lg' >

        <div className="flex itmes-center mt-7   justify-center">

            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>

                <img src={userImg} alt="" className='w-full h-full rounded-full' />
            </figure>
        </div>
        <div className="text-center mt-4">
          <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">

            Albert Sebastian James
          </h3>
           <p className="text-textColor text-[15px] leading-6 font-medium">
            albert@gmail.com
           </p>
           <p className="text-textColor mt-1 text-[15px] leading-6 font-medium">
            Blood Type:

            <span className="text-textColor ml-1 text-[18px] leading-6">A +ve</span>
           </p>


        </div>

        <div className="mt-[25px] md:mt-[40px]">
            <button className='btn text-[20px] w-full '>Logout</button>
            <button className='btn bg-red-500 w-full'>Delete Account</button>

        </div>
    </div>
    <div className="md:col-span-2 md:px[30px]">
        <div>
        <button onClick={()=>setTab('booking')} className={`  ${tab==='booking' && 'bg-primaryColor text-white'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold border border-solid border-primaryColor text-[16px]`}>Bookings</button>
            
            <button onClick={()=>setTab('profile-setting')} className={` ${tab==='profile-setting' && 'bg-primaryColor text-white'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold border border-solid border-primaryColor text-[16px]`}>Profile Settings</button>
        </div>


    </div>
    </div>
   </div>
  )
}

export default UserAccount