import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDoctorDetialsMutation } from "../slices/userApislice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useBookingMutation } from "../slices/userApislice";
import Swal from "sweetalert2";
import Payment from "../components/user/Payment";
function Booking() {
  const { userInfo } = useSelector((state) => state.auth);

  const { userJwt } = userInfo.result;
  const { id } = useParams();
  const [slot, setSlot] = useState();
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("");
  const [booking, setBooking] = useState("");
  const [fetchDoctor, { isLoading }] = useDoctorDetialsMutation();
  // const [bookings, { isloading }] = useBookingMutation();
  
  const [doctor, setDoctor] = useState("");

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${day}-${month}-${year}`;
  }
  useEffect(() => {
    const fetch = async (id) => {
      try {
        const response = await fetchDoctor({ id });
         console.log(response.data.doctor.timeSlots,'timeslotss')
        
        const AvailableSlots = response.data.doctor.timeSlots.map((element) => {
          return {
            date: element.date, // Keep the date unchanged
            slots: element.slots.filter((item) => item.is_booked === false ),
          };
        });
        const AvailableSlotss = AvailableSlots.filter((item)=>item.slots.length>0)
        const Datee = new Date();
        const datee = formatDate(Datee);
        const timeslots = AvailableSlotss.filter((item) => item.date > datee);
          
        setSlots(timeslots);

        setDoctor(response.data.doctor);
      } catch (error) {
        toast.error("Server Error");
      }
    };
    fetch(id);
  }, []);


  const handleSlot = (date, time) => {
    setSlot(time);
    setDate(date);
  };

 
  console.log(slots, "slotss");
  return (
    <section className="px-5   md:mt-0 md:py-0 lg:px-0">
      <div className="grid md:grid-cols-3">
        <div className="w-full md:col-span-2 flex justify-center mx-[20px] rounded-lg">
          <form className="my-11" action="">
        
            <div>
              <h2 className="text-heading font-semibold">Available Slots</h2>
              {/*  */}
            </div>
            <div className="py-5 relative grid grid-cols-2 md:grid-cols-3 md:mr-5 lg:grid-cols-4 gap-5">
              {slots.length > 0 &&
                slots.map((selection, index) => (
                  <div className="relative felx justify-center " key={index}>
               
                   <div className="text-headingColor font-semibold felx justify-center text-center px-3 py-4 mb-11 bg-gray-200 rounded-md  ">
                    {selection.date}
                  </div>
                   
                    {selection.slots.map((item, slotIndex) => (
                      <div
                        key={slotIndex}
                        onClick={() => handleSlot(selection.date, item.time)}
                        className="bg-gradient-to-r my-5 relative from-blue-300 to-cyan-200 py-3 px-5 rounded-md cursor-pointer text-headingColor font-semibold border border-solid text-[20px]"
                      >
                     
                        {item.time}
                      </div>
                    ))}
                  </div>
                ))}
              {slots.length === 0 && (
                <div className="h-[350px] flex justify-center ">
                  <h2 className="text-center font-semibold text-[18px">
                    No slots Available{" "}
                  </h2>
                </div>
              )}
            </div>

            <div className="my-7">
              <h2 className="text-heading font-semibold">Selected Slot</h2>
              {date && slot ? (
                <>
                  <div className="text-headingColor max-w-[250px] font-semibold felx justify-center text-center px-3 py-4 mb-5 mt-11 bg-gray-200 rounded-md  ">
                    {date}
                  </div>
                  <div className="bg-gradient-to-r max-w-[250px]  relative from-blue-300 to-cyan-200 py-3 px-5 rounded-md text-headingColor font-semibold border border-solid text-[20px]">
                    {slot}
                  </div>
                </>
              ) : (
                <h2 className="text-heading  mt-5">No slots Available</h2>
              )}

              {/*  */}
            </div>

           
          </form>
        </div>
        <div className="md:col-span-1  md:mt-7 ">
          <Payment slot={slot} date={date} doctor={doctor} />
        </div>
      </div>
    </section>
  );
}

export default Booking;
