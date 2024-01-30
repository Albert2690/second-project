import React from "react";
import Star from "../assets/images/Star.png";
import { CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor, item, index }) {
  const navigate = useNavigate();
  // const { name, image, specialization, _id, hospital } = item;

  const handleDetial = (id) => {
    navigate(`/detials-doctor/${id}`);
  };

  return (
    <div className="hover:shadow-lg hover:transform  hover:scale-110 hover:transition-transform hover:duration-550 p-2 mb-7 ">
      {doctor ? (
        <>
          <div>
            <img src={item.image} alt="" />
          </div>
          <div className="mt-4 mx-4 leading-9">
            <div></div>
            <div className="flex justify-between">
              <h2 className="text-lg font-[500]">Dr.{item.name}</h2>
              <div className="flex  md:mr-0">
                <img className="w-4 h-4 mt-2" src={Star} alt="" />
                <span>4.2</span>
                <h2 className="h-4 ">(252)</h2>
              </div>
            </div>
            <div className="flex gap-5 md:mt-4 mt-2">
              <span className="px-1 py-1 text-sm rounded-md i md:px-2 md:py-2 bg-gradient-to-r text-white from-blue-300 to-cyan-200">
                {item.specialization}
              </span>
            </div>
            <div className="flex flex-row mt-3 md:mt-0 md:gap-16 gap-5">
              <span className="flex mt-3 justify-start">
                Aster Mims, Calicut
              </span>
              <div className="w-9 h-9 md:mt-3 hover:bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full flex justify-end border-black hover:border-none ring-black hover:ring-0">
                <CiCircleChevRight
                  onClick={() => handleDetial(item._id)}
                  className="hover:text-white w-9 h-9"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <img src={item.doctor.image} alt="" />
          </div>
          <div className="mt-4 mx-4 leading-9">
            <div></div>
            <div className="flex justify-between">
              <h2 className="text-lg font-[500]">Dr.{item.doctor.name}</h2>
           
            </div>
            <div className="flex gap-5 md:mt-4 mt-2">
              <span className="px-1 py-1 text-sm rounded-md i md:px-2 md:py-2 bg-gradient-to-r text-white from-blue-300 to-cyan-200">
                {item.doctor.specialization}
              </span>
              {item.status === "pending" && (
                <span className="px-1 py-1 text-sm rounded-md i text-white md:px-2 md:py-2 bg-blue-500">
                  {item.status}
                </span>
              )}
              {item.status === "completed" && (
                <span className="px-1 py-1 text-sm rounded-md i text-white md:px-2 md:py-2 bg-green-500">
                  {item.status}
                </span>
              )}
              {item.status === "cancelled" && (
                <span className="px-1 py-1 text-sm rounded-md i text-white md:px-2 md:py-2 bg-red-500">
                  {item.status}
                </span>
              )}
            </div>
            <div className="flex flex-row mt-3 md:mt-0 md:gap-16 gap-5">
              <div className=" mt-3">
                <span className="font-semibold">Booking Fee</span>
                <span className="ml-7"> Rs.{item.total}</span>
              </div>

            </div>
            <div className="flex flex-col">
              <div className=" mt-3 ">
                <span className="font-semibold">Date</span>
                <span className="ml-7"> {item.timeSlot.date}</span>
              </div>

              <div className=" mt-3 ">
                <span className="font-semibold">Time</span>
                <span className="ml-3"> {item.timeSlot.slot}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DoctorCard;
