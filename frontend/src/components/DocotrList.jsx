import React from "react";
import DoctorCard from "./DoctorCard";
import Loader from "./Loader";
import img01 from "../assets/images/doctor-img01.png";

function DocotrList({ doctors, booking, isLoading }) {
  console.log(doctors, "herr");
  console.log(booking, "her");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:flex justify-around mt-[30px] lg:mt-[50px]">
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : doctors ? (
        doctors.map((item, index) => (
          <DoctorCard key={index} doctor={doctors} item={item} index={index} />
        ))
      ) : (
        booking.map((item, index) => (
          <DoctorCard key={index} item={item} index={index} />
        ))
      )}
   
    </div>
  );
}

export default DocotrList;
