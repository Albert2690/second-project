import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Profile from '../pages/Profile'
import Services from  '../pages/Services'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Error from '../pages/Error'
import Doctors from '../pages/Doctors/Doctors'
import AdminHome from '../pages/AdminPages/adminHome'
import AdminLogin from '../pages/AdminPages/AdminLogin'
import DoctorsDetials from '../pages/Doctors/DoctorDetials'
import {Routes,Route} from 'react-router-dom'
import UserList from '../pages/AdminPages/UserList'
import DoctorList from '../pages/AdminPages/DoctorList'
import UserAccount from '../pages/userAccount'
import DoctorPrivateRoutes from './DoctorPrivateRoutes'
import DoctorProfile from '../pages/Doctors/DoctorProfile'
import DoctorLogin from '../pages/Doctors/DoctorLogin'
import DoctorHome from '../pages/Doctors/DoctorHome'
import OtpLogin from '../pages/OtpLogin'
import Booking from '../pages/Booking'
import PaymentSuccess from '../pages/PaymentSuccess'
import ServicesManagment from '../pages/AdminPages/ServicesManagment'
import Appoinments from '../pages/Doctors/Appoinments'
import AdminAppoinments from '../pages/AdminPages/AdminAppoinments'
import Doctormessage from '../pages/Doctors/Doctormessage'
import Messages from '../pages/Messages'
import Vediocall from '../pages/Vediocall'
import PaymentSuccessAdmin from '../pages/AdminPages/PaymentSuccessAdmin'
import PaymentFailedAdmin from '../pages/AdminPages/paymentFailedAdmin'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
     

      <Route path='/login' element={<Login/>} />
      
      <Route path='/otp-login' element={<OtpLogin/>} />

      <Route path='/register' element={<Register/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/get-doctors' element={<Doctors/>} />
      <Route path='/detials-doctor/:id' element={<DoctorsDetials/>} />
      <Route path='/appoinment-doctor/:id' element={<Booking/>} />
      <Route path='/payment-success' element={<PaymentSuccess />}/>
      <Route path='/message' element={<Messages />}/>
      <Route path= '/room/:roomId/:doctorId/:name' element={<Vediocall/>} />

      <Route path='/*' element={<Error/>} />
     



      {/* Admin Routess */}

      <Route path='/admin' element={<AdminHome/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/users' element ={<UserList/>}/>
      <Route path='/admin/doctors' element ={<DoctorList/>}/>
      <Route path='/admin/services-managment' element ={<ServicesManagment/>}/>
      <Route  path='/admin/appoinments' element={<AdminAppoinments/>} />
      <Route  path='/admin/payment-successDoctor' element={<PaymentSuccessAdmin/>} />
      <Route  path='/admin/payment-failed' element={<PaymentFailedAdmin/>} />



      




        {/* Doctor Routes */}
        <Route path='' element={<DoctorPrivateRoutes/>} >
        <Route path='/doctor/profile' element ={<DoctorProfile />} />
        <Route path='/doctor' element={<DoctorHome />} />
        </Route>
        <Route path='/doctor/login' element ={<DoctorLogin />} />
        <Route  path='/doctor/appoinments' element={<Appoinments/>} />
        <Route path='/doctor/messages' element={<Doctormessage/>} />

    </Routes>
  )
}
