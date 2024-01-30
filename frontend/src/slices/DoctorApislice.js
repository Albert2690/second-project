// import { getDoctor } from "../../../backend/controllers/doctorController";
import { getUserProfile,doctorLogin,getDoctor,updateDoctorProfile,TimeSlotUpdate,cancelbooking,
    fetchbookings, doctorotpverify, doctorotprequest,fetchDoctorChats,
    fetchdoctormessages, getUser,createmessage,updateMessage } from "../utils/constants";
import { apiSlice } from "./apiSlice";


const doctorApislice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        Doctorlogin:builder.mutation({
            query:(data)=>({
                url:doctorLogin,
                method:'POST',
                body:data
            })
        }),
        DoctorProfile:builder.mutation({
            query:(data)=>({
                url:getDoctor,
                method:'POST',
                body:data
            })
        }),
        DoctorProfileUpdate:builder.mutation({
            query:(data)=>({
                url:updateDoctorProfile,
                method:'PUT',
                body:data
            })
        }),
        TimeSlotUpdate:builder.mutation({
            query:(data)=>({
                url:TimeSlotUpdate,
                method:"PUT",
                body:data
            })
        }),
        DoctorOtpRequest:builder.mutation({
            query:(data)=>({
              url:doctorotprequest,
              method:'POST',
              body:data
            })
          }),
          Doctorsubmitotp:builder.mutation({
            query:(data)=>({
              url:doctorotpverify,
              method:'POST',
              body:data
            })
          }),
          fetchBooking:builder.mutation({
            query:(data)=>({
                url:fetchbookings,
                method:"POST",
                body:data
            })
          }),
          updateBooking:builder.mutation({
            query:(data)=>({
            url:cancelbooking,
            method:"PUT",
            body:data
            })
            
          }),
          fetchChats:builder.mutation({
            query:(data)=>({
                url:fetchDoctorChats,
                method:"POST",
                body:data
            })
          }),
          getUser:builder.mutation({
            query:(data)=>({
                url:getUser,
                method:"POST",
                body:data
            })
          }),
          fetchMessages:builder.mutation({
            query:(data)=>({
                url:fetchdoctormessages,
                method:"POST",
                body:data
            })
          }),
          newMessage:builder.mutation({
            query:(data)=>({
                url:createmessage,
                method:"POST",
                body:data
            })
          }),
          updateMessage:builder.mutation({
            query:(data)=>({
              url:updateMessage,
              method:"PUT",
              body:data
            })
          })
          
    })
})



export const {
    
    useDoctorloginMutation,useDoctorProfileMutation,
    useDoctorProfileUpdateMutation,useTimeSlotUpdateMutation,
    useDoctorOtpRequestMutation,useDoctorsubmitotpMutation,
    useFetchBookingMutation,useUpdateBookingMutation,useFetchChatsMutation,
    useGetUserMutation,useFetchMessagesMutation,useNewMessageMutation,useUpdateMessageMutation
    
} = doctorApislice