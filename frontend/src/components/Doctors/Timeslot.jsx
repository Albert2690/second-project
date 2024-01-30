import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";
import { FcEmptyTrash } from "react-icons/fc";
import { useTimeSlotUpdateMutation,useDoctorProfileMutation } from '../../slices/DoctorApislice';
import { useSelector } from 'react-redux';

export default function Timeslot() {

    const {doctorInfo} = useSelector((state)=>state.doctor)
   
    const {doctorJwt} = doctorInfo.result
    
  const slotss = [
    '10:00 am - 11:00 am',
    '11:00 am - 12:00 pm',
    '12:00 pm - 1:00 pm',
    '1:00 pm - 2:00 pm',
    '2:00 pm - 3:00 pm',
    '3:00 pm - 4:00 pm',
    '4:00 pm - 5:00 pm',
  ];

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
const [getProfile,{isloading}] = useDoctorProfileMutation()
const [chosen, setChosen] = useState([]);
  useEffect(()=>{
    const fetch = async()=>{
        try{
            const result = await getProfile({doctorJwt})
            console.log(result.data.doctor,'dataa')
            const timeslots = result.data.doctor.timeSlots
            let datee = formatDate(new Date())
            let timeslot = timeslots.filter((item)=>item.date>datee)
            console.log(timeslot,'timeslots')
            setChosen(timeslot)
        }catch(error){
            toast.error("Server Error")
        }
    }
    fetch()
  },[])
  const [timeSlotUpdate,{isLoading}] = useTimeSlotUpdateMutation()
  const initialSlotState = {
    date: '',
    slots: [],
  };
  const [Datee,setDate]= useState('')
 


 
  
  const handleDateChange = (date) => {
    const today = new Date(); // Current date
  const selectedDate = new Date(date);

  if (today <= selectedDate) {
    const newdate = formatDate(selectedDate);
        
      
      
    if (!chosen.some((item) => item.date === newdate)) {
      setChosen((prev) => [...prev, {date:newdate, slots: [] }]);
      console.log('heooo')
      
    }
    setDate(newdate)
}else{
    return toast.error("Please select a date at least one day after the current date.");
}
  };

  const handleSlot = (e,date, timeslot) => {
    console.log(timeslot,'timee')
    e.preventDefault()
    const index = chosen.findIndex((items) => items.date === date);
  
    if (index !== -1) {
      const result = chosen[index].slots.findIndex((item) => item === timeslot);
  
      if (result === -1) {
        setChosen((prev) =>
          prev.map((item) =>
            item.date === date
              ? {
                  ...item,
                  slots: [
                    ...item.slots,
                    {
                      time:timeslot, 
                      is_booked: false, 
                    },
                  ],
                }
              : item
          )
        );
      
      
      } else {
        toast.error("This timeslot is already selected");
      }
    } else {
      toast.error("Please Select a date");
    }
  };

  const handleRemoveDate = (e,date)=>{
    e.preventDefault()
    setChosen((prev) =>

    prev.filter((item)=>item.date!==date)
    );
  }

  const handleRemove = (timeslot, date) => {
    setChosen((prev) =>
      prev.map((item) =>
        item.date === date
          ? { ...item, slots: item.slots.filter((slot) => slot.time !== timeslot) }
          : item
      )
    );
  };
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
        const result = await timeSlotUpdate({doctorJwt,chosen:chosen})

       
        if(result.data.success){
            toast.success(result.data.message)
        }else{
            toast.error("Error occured while updating")
        }
    }catch(error){
        toast.error("Server Error")
    }
  }
  
  
  console.log(chosen,'choseb')
  console.log(Datee,'datee')

  return (
    <section className="px-5 mt-[-200px] md:mt-0 md:py-0 lg:px-0">
      <div className="w-full mx-auto rounded-lg">
        <form  onSubmit={(e)=>handleSubmit(e)} className='my-11' action="">
        <div className="py-5 relative">
          <label htmlFor="mobile" className="px-3 py-3 bg-gray-100 rounded-md text-headingColor font-semibold">
            Select Date
          </label>
          <input
            type="date"
            name="mobile"
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-[40%] md:w-[40%] px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[12px] focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
          />
        </div>

        <div className="py-5 relative grid grid-cols-2 md:grid-cols-3 md:mr-5 lg:grid-cols-4 gap-5">

           
          {slotss.map((item, index) => (
            
            <button
              key={index}
              onClick={(e) => handleSlot(e,Datee, item)}
              className="bg-gradient-to-r from-blue-300 to-cyan-200 py-3 px-5 rounded-md text-headingColor font-semibold border border-solid text-[20px]"
            >
              {item}
           
            </button>
          ))}
        </div>

        <div className='my-11 flex justify-start'>
            <h2 className="text-[20px] hover:border-b  hover:bottom-5 hover:border-primaryColor font-semibold text-headingcolor">Selected Slots</h2>
        </div>

        <div className="py-5 relative grid grid-cols-2 md:grid-cols-3 md:mr-5 lg:grid-cols-4 gap-5">
          {chosen.map((selection, index) => (
            <div className='relative felx justify-center ' >
                   <div onClick={(e)=>handleRemoveDate(e,selection.date)} className="absolute cursor-pointer top-2 right-2">
                   <FcEmptyTrash />
                  </div>
              <div className="text-headingColor font-semibold felx justify-center text-center px-3 py-4 mb-11 bg-gray-200 rounded-md  ">{selection.date}</div>
              {selection.slots.map((item, slotIndex) => (
                <div  className="bg-gradient-to-r my-5 relative from-blue-300 to-cyan-200 py-3 px-5 rounded-md text-headingColor font-semibold border border-solid text-[20px]">
                          <div onClick={()=>handleRemove(item.time,selection.date)} className="absolute cursor-pointer top-2 right-2">
                  <FiMinus />
                  </div>
                  {item.time}
            
                </div>
              ))}
            </div>
          ))}
        </div>

                <div className='' >
                <button className='btn' type='submit' >Update</button>

                </div>
        </form>
      </div>
    </section>
  );
              
}
