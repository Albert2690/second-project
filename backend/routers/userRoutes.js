import express from 'express'
import { login,register,logout,updateProfile,getProfile, getDoctors,getbookingsUser, DoctorDetials,otplogin,bookingSlot,otpverify } from "../controllers/userController.js";
const router = express.Router();
import authenticateUser from '../middlewares/userAuthMiddleware.js';
import { paymentInitiated,sessionStatus } from '../controllers/paymentController.js';
import { bookingHistory, getbookings } from '../controllers/bookingController.js';
import is_blocked from '../middlewares/isBlocked.js';

router.post('/login',login)
router.post('/register',register)
router.post('/logout',logout)
router.post('/profile',authenticateUser,is_blocked,getProfile)
router.put('/profile-update',authenticateUser,is_blocked,updateProfile)
router.get('/doctors',getDoctors)
router.post('/doctor-detials',DoctorDetials)
router.post('/otpLogin',otplogin)
router.post('/otp-verify',otpverify)
router.post('/booking',authenticateUser,is_blocked,bookingSlot)
router.post('/payment',authenticateUser,is_blocked,paymentInitiated)
router.post('/payment-detials',authenticateUser,is_blocked,sessionStatus)
router.post('/patient-bookings',authenticateUser,is_blocked,bookingHistory)
router.get('/bookings',getbookingsUser)

export default router