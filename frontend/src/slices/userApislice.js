import { apiSlice } from "./apiSlice";

import {
  user_registration,
  userLogin,
  userLogout,
  ProfileUpdate,
  getUserProfile,
  getDoctor,
  getDoctors,
  DoctorDetials,
  otprequest,
  otpverify,
  appoinment,
  paymenturl,
  paymentdetials,
  Patientbookings,
  bookings
} from "../utils/constants";

const userApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: user_registration,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: userLogin,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.mutation({
      query: (data) => ({
        url: getUserProfile,
        method: "POST",
        body:data
      }),
    }),
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: ProfileUpdate,
        method: "PUT",
        body: data,
       
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: userLogout,
        method: "POST",
        body: data,
      }),
    }),
    getDoctors:builder.mutation({
      query:()=>({
        url:getDoctors,
        method:'GET',

      })
    }),
    DoctorDetials:builder.mutation({
      query:(data)=>({
        url:DoctorDetials,
        method:'POST',
        body:data
      })
    }),
    otprequest: builder.mutation({
      query:(data)=>({
        url:otprequest,
        method:'POST',
        body:data
      })
    }),
    submitotp:builder.mutation({
      query:(data)=>({
        url:otpverify,
        method:'POST',
        body:data
      })
    }),
    booking:builder.mutation({
      query:(data)=>({
        url:appoinment,
        method:'POST',
        body:data
      })
    }),
    payment:builder.mutation({
      query:(data)=>({
        url:paymenturl,
        method:'POST',
        body:data
      })
    }),
    paymentDetials:builder.mutation({
      query:(data)=>({
        url:paymentdetials,
        method:"POST",
        body:data
      })
    }),
    PatientBookings:builder.mutation({
      query:(data)=>({
        url:Patientbookings,
        method:"POST",
        body:data
      })
    }),
    getBookings:builder.mutation({
      query:()=>({
        url:bookings,
        method:"GET",
        
      })
    })
  }),
  
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileMutation,
  useProfileUpdateMutation,
  useGetDoctorsMutation,
  useDoctorDetialsMutation,
  useOtprequestMutation,
  useSubmitotpMutation,
  useBookingMutation,
  usePaymentMutation,
  usePaymentDetialsMutation,
  usePatientBookingsMutation,
  useGetBookingsMutation
} = userApislice;
