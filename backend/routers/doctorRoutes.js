import express from 'express'
const router = express.Router()
import { getDoctors } from '../controllers/adminController.js'
import { Login,getDoctor,updateProfile, updateTime,otplogin,doctorotpverify, getUser } from '../controllers/doctorController.js'
import { getbookings, updateBooking } from '../controllers/bookingController.js'
import authencticateDoctor from '../middlewares/doctorAuth.js'



router.post('/login',Login)
router.post('/profile',authencticateDoctor,getDoctor)
router.put('/profile-update',authencticateDoctor,updateProfile)
router.put('/profile-timeslot',authencticateDoctor,updateTime)
router.post('/otp-login',otplogin)
router.post('/otp-verify',doctorotpverify)
router.post('/bookings',authencticateDoctor,getbookings)
router.put('/update-booking',authencticateDoctor,updateBooking)
router.post('/getuser',getUser)
  
export default router