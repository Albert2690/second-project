import { Card, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateBookingMutation } from "../../slices/DoctorApislice";
import { usePaymentDoctorMutation } from "../../slices/adminApislice";
import Loader from "../Loader";
import { toast } from "react-toastify";
import propType from 'prop-types'

const TABLE_HEAD = [
  "User",
  "Doctor",
  "Day",
  "Time",
  "USer-Payment",
  "Payment to Doctor",
  "Status",
  "Actions",
];



export function AppoinmetsTable({ users, setUserChange }) {

  const { doctorInfo } = useSelector((state) => state.doctor);

  const { doctorJwt } = doctorInfo.result;
  console.log(users,'bookings?')
  const [Doctorpayment,{isloadingg}] = usePaymentDoctorMutation()
  const [updatebooking, { isLoading }] = useUpdateBookingMutation();

  const paymentToDoctor = async(booking)=>{
    try{
      console.log('here inside payment ')
   const result = await Doctorpayment({booking})
   localStorage.setItem('Booking',JSON.stringify(booking))

   window.location.href = result.data.url
    }catch(error){
      console.log(error)
      toast.error("Server Error")
    }
  }

  let userss = users;

  console.log(userss, "usersss");
  return (
    <div className="  ">
      <Card className=" overflow-scroll">
        <table className=" min-w-max text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-cyan-300 p-5 "
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 items-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <div className="my-2"></div>
          <tbody>
            {userss.map((user) => (
              <tr key={user._id} className="odd:bg-gray-200">
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                   {user.user.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     Dr.{user.doctor.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.timeSlot.date}
                  </Typography>
                </td>

                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.timeSlot.slot}
                  </Typography>
                </td>
                <td className="p-4">

                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {user.userPayment === "pending" && (
                    <span className="text-red-500">{user.userPayment}</span>
                  )}
                  {user.userPayment === "paid" && (
                    <span className="text-green-500">{user.userPayment}</span>
                  )}
                </Typography>
                </td>

                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.paymentToDoctor === "pending" && (
                      <span className="text-red-500">
                        {user.paymentToDoctor}
                      </span>
                    )}
                    {user.paymentToDoctor === "paid" && (
                      <span className="text-green-500">
                        {user.paymentToDoctor}
                      </span>
                    )}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.status === "pending" && (
                      <span className="text-blue-500">{user.status}</span>
                    )}
                    {user.status === "completed" && (
                      <span className="text-green-500">{user.status}</span>
                    )}
                    {user.status === "cancelled" && (
                      <span className="text-red-500">{user.status}</span>
                    )}
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center items-center">
                   
                    {user.status === "completed" && user.paymentToDoctor === 'pending' ? (
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <>
                            <button
                              onClick={()=>paymentToDoctor(user)}
                              className="bg-blue-500 px-1 py-1 rounded text-white"
                            >
                              Pay
                            </button>
                          </>
                        )}
                      </Typography>
                    ) : (
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        ...
                    
                      </Typography>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

AppoinmetsTable.prototype={
  users:propType.shape({
    profit:propType.number,
    is_cancelled:propType.bool
  })
}