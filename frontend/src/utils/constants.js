const baseUrl = import.meta.env.VITE_APP_BASE_URL


export const user_registration =`${baseUrl}/users/register`
export const userLogin =`${baseUrl}/users/login`
export const userLogout =`${baseUrl}/users/logout`
export const getUserProfile =`${baseUrl}/users/profile`
export const ProfileUpdate =`${baseUrl}/users/profile-update`
export const getDoctors = `${baseUrl}/users/doctors`
export const DoctorDetials = `${baseUrl}/users/doctor-detials`
export const otprequest = `${baseUrl}/users/otpLogin`
export const otpverify = `${baseUrl}/users/otp-verify`
export const appoinment = `${baseUrl}/users/booking`
export const paymenturl = `${baseUrl}/users/payment`
export const paymentdetials = `${baseUrl}/users/payment-detials`
export const Patientbookings = `${baseUrl}/users/patient-bookings`
export const bookings = `${baseUrl}/users/bookings`









// ===============Admin Apis===============//

export const adminLogin  = `${baseUrl}/admin/login`
export const userFetch  = `${baseUrl}/admin/users`
export const blockUser = `${baseUrl}/admin/blockUser`
export const doctorFetch  = `${baseUrl}/admin/doctors`
export const doctorApprove  = `${baseUrl}/admin/doctor-approve`
export const adminLogout  = `${baseUrl}/admin/logout`
export const blockDoctor = `${baseUrl}/admin/blockDoctor`
export const addService = `${baseUrl}/admin/add-service`
export const listService = `${baseUrl}/admin/list-service`
export const fetchServices = `${baseUrl}/admin/services`
export const editserviceurl = `${baseUrl}/admin/edit-service`
export const fetchbookingsAdmin = `${baseUrl}/admin/bookings`
export const bookingNotification = `${baseUrl}/admin/booking-seen`
export const getnotification = `${baseUrl}/admin/booking-notification`
export const doctorPayment = `${baseUrl}/admin/payment-doctor`
export const getBookingDetials = `${baseUrl}/admin/booking-detials`





// ================Doctor Api's ==============//

export const doctorLogin = `${baseUrl}/doctor/login`
export const getDoctor = `${baseUrl}/doctor/profile`
export const updateDoctorProfile = `${baseUrl}/doctor/profile-update`
export const TimeSlotUpdate = `${baseUrl}/doctor/profile-timeslot`
export const doctorotprequest = `${baseUrl}/doctor/otp-login`
export const doctorotpverify = `${baseUrl}/doctor/otp-verify`
export const fetchbookings = `${baseUrl}/doctor/bookings`
export const cancelbooking = `${baseUrl}/doctor/update-booking`
export const getUser= `${baseUrl}/doctor/getuser`


// ================Message Api's ==============//

export const fetchDoctorChats = `${baseUrl}/chat/getChats`
export const fetchdoctormessages = `${baseUrl}/message/getmessages`
export const createmessage = `${baseUrl}/message/create-message`
export const updateMessage = `${baseUrl}/message/seen-message`










