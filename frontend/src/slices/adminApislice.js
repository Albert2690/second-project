import { apiSlice } from "./apiSlice";
import { adminLogin,userFetch,blockUser,doctorFetch,
    doctorApprove,adminLogout,blockDoctor,addService ,
    listService,fetchServices,fetchbookingsAdmin,editserviceurl,
    bookingNotification,getnotification,doctorPayment,getBookingDetials


} from "../utils/constants";



const adminApislice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        AdminLogin:builder.mutation({ 
            query:(data)=>({
                url:adminLogin,
                method:'POST',
                body:data
            })
        }),
        UsersFetch : builder.mutation ({
            query:()=>({
                url:userFetch,
                method:'GET',
                
            })
        }),
        UserBlock : builder.mutation({
            query:(data)=>({
                url:blockUser,
                method:'PUT',
                body:data
            })
        }),
        DoctorFetch : builder.mutation({
            query : ()=>({
             url: doctorFetch,
             method:'GET',
             
            })
        }),
        DoctorApprove : builder.mutation({
            query: (data)=>({
                url:doctorApprove,
                method:"PUT",
                body:data
            })
        }),
        AdminLogout : builder.mutation({
            query:(data)=>({
                url:adminLogout,
                method:'POST',
                body:data
            })
        }),
        DoctorBlock : builder.mutation({
            query: (data)=>({
                url : blockDoctor,
                method: "PUT",
                body:data
            })
        }),
        AddService : builder.mutation({
            query:(data)=>({
                url:addService,
                method:"POST",
                body:data
            })
        }),
        ListService:builder.mutation({
            query:(data)=>({
                url:listService,
                method:"POST",
                body:data
            })
        }),
        getServices:builder.mutation({
            query:(data)=>({
                url:fetchServices,
                method:"POST",
                body:data
            })
        }),
        fetchbookings:builder.mutation({
            query:()=>({
                url:fetchbookingsAdmin,
                method:'GET',
            
            })
        }),
        editService:builder.mutation({
            query:(data)=>({
                url:editserviceurl,
                method:"PUT",
                body:data
            })
        }),
        bookingNotification:builder.mutation({
            query:(data)=>({
                url:bookingNotification,
                method:"PUT",
                body:data
            })
        }),
        getbookingNotification:builder.mutation({
            query:(data)=>({
                url:getnotification,
                method:"POST",
                body:data
            })
        }),
        paymentDoctor:builder.mutation({
            query:(data)=>({
                url:doctorPayment,
                method:"POST",
                body:data
            })
        }),
        getBookingDetials:builder.mutation({
            query:(data)=>({
                url:getBookingDetials,
                method:"POST",
                body:data
            })
        })
    })
})


 export const {useAdminLoginMutation,useUsersFetchMutation,useUserBlockMutation,
            useDoctorFetchMutation,useDoctorApproveMutation,useAdminLogoutMutation,
            useDoctorBlockMutation,useAddServiceMutation,useListServiceMutation,
            useGetServicesMutation,useFetchbookingsMutation,useBookingNotificationMutation,
            useGetbookingNotificationMutation,usePaymentDoctorMutation,useGetBookingDetialsMutation
        } 
= adminApislice