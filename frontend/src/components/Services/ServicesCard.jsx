import React from "react";
import { Link } from "react-router-dom";
import { CiCircleChevRight } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";
import { useListServiceMutation } from "../../slices/adminApislice";

function ServicesCard({ items, admin, setList }) {
  const [listService, { isLoading }] = useListServiceMutation();

  const handleListing = async (id) => {
    try {
      const response = await listService({ id });
      setList((prev) => (prev = !prev));
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };
  return (
    <>
      {admin ? (
        <div className=" bg-white relative hover:shadow-lg hover:transform  hover:scale-110 hover:transition-transform hover:duration-550 hover:bg-gradient-to-r from-cyan-100 to-blue-100  rounded-xl  py-[35px]  px-3 lg:px-5">
          {items.is_listed === true ? (
            <button
              onClick={() => handleListing(items._id)}
              className="absolute bottom-2 right-11 font-semibold px-3 text-white text-sm py-1 bg-red-600 rounded "
            >
              UnList
            </button>
          ) : (
            <button
              onClick={() => handleListing(items._id)}
              className="absolute bottom-2 right-11 font-semibold px-3 hover:text-white text-sm py-1 hover:bg-cyan-300 rounded bg-gray-200"
            >
              List
            </button>
          )}
        
          <h2 className="text-[26px] leading-7  text-headingColor text-center font-[700]">
            {items.name}
          </h2>

          <p className="text_para text-textColor text-justify">
            {items.description}
          </p>
          <Link
            to="/doctors"
            className="w-8 h-8  hover:bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full mx-auto my-auto flex items-end  mt-3 border-black  justify-center  hover:border-none ring-1 ring-black hover:ring-0"
          >
            <CiCircleChevRight className="hover:text-white w-8 h-8 flex items-end " />
          </Link>
        </div>
      ) : (
        <div className=" bg-white relative hover:shadow-lg hover:transform  hover:scale-110 hover:transition-transform hover:duration-550 hover:bg-gradient-to-r from-cyan-100 to-blue-100  rounded-xl  py-[35px]  px-3 lg:px-5">
       
          <h2 className="text-[26px] leading-7  text-headingColor text-center font-[700]">
            {items.name}
          </h2>

          <p className="text_para text-textColor text-justify">
            {items.description}
          </p>
          <Link
            to="/doctors"
            className="w-8 h-8  hover:bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full mx-auto my-auto flex items-end  mt-3 border-black  justify-center  hover:border-none ring-1 ring-black hover:ring-0"
          >
            <CiCircleChevRight className="hover:text-white w-8 h-8 flex items-end " />
          </Link>
        </div>
      )}
    </>
  );
}

export default ServicesCard;
