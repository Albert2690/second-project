import express from 'express'
const router = express.Router()
import { login,blockUser,getUsers,getDoctors,adminLogout } from '../controllers/adminController.js'
import { approveDoctor,blockDoctor } from '../controllers/doctorController.js'
import { addService,listservice,getServices,editService } from '../controllers/serviceController.js'
import { bookingHistory,fetchbookingsAdmin,SeenAppoinment,notification,bookingDetials } from '../controllers/bookingController.js'
import {paymentInitiatedTodoctor}from '../controllers/paymentController.js'



router.post('/login',login)
router.put('/blockUser',blockUser)
router.get('/users',getUsers)
router.get('/doctors',getDoctors)
router.put('/doctor-approve',approveDoctor)
router.post('/logout',adminLogout)
router.put('/blockDoctor',blockDoctor)
router.post('/add-service',addService)
router.post('/list-service',listservice)
router.post('/services',getServices)
router.get('/bookings',fetchbookingsAdmin)
router.put('/edit-service',editService)
router.put('/booking-seen',SeenAppoinment)
router.post('/booking-notification',notification)
router.post('/payment-doctor',paymentInitiatedTodoctor)
router.post('/booking-detials',bookingDetials)



 
export default router