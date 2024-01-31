import Booking from "../models/bookingModel.js";
import StatusCodes from "../utils/statusCodes.js";
import User  from '../models/userModel.js'

const bookingHistory = async (req, res) => {
  const { _id } = req.user;
  try {
    const bookings = await Booking.find({ user: _id })
      .populate("user")
      .populate("doctor");
 
    res.status(200).json({ bookings, success: true });
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getbookings = async (req, res) => {
  try {

    const { _id } = req.doctor;
    const bookings = await Booking.find({ doctor: _id }).populate("user");
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchbookingsAdmin = async (req, res) => {
  try {

    const bookings = await Booking.find().populate("user").populate("doctor");
 
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const SeenAppoinment = async(req,res)=>{
  try{
   const ids =  req.body.ids
   const updated = await Booking.updateMany({_id:{$in:ids}},{$set:{is_seen:true}})
   res.status(StatusCodes.OK)
  }catch(error){
    res.status(500).json({message:"Internal Server Error"})
  }
}
const notification = async (req,res)=>{
  try{
   const notification = await Booking.find({is_seen:false})

   res.status(201).json({notification})
  }catch(error){
    res.status(500).json({message:"Internal Server Error"})
  }
}
const updateBooking = async (req, res) => {
  try {
    const { _id } = req.doctor;
   let updatedBooking ;
   let updatedBookings;
    const { bookingId } = req.body;
    const { status } = req.body;
   
    if(status==="completed"){
     updatedBooking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        { $set: { status: status,is_seen:false } }
      );
    }else{
      updatedBookings = await Booking.findOneAndUpdate(
        { _id: bookingId },
        { $set: { status: status } }
      );
    }
   
    if (updatedBooking || updatedBookings) {
      res.status(200).json({ message: "Booking Cancelled" });
    } else {
      res.status(500).json({ message: "Update Failed" });
    }

 
  } catch (error) {
    res.status(500).json({ message: "Interal Server Error" });
  }
};

const bookingDetials = async (req,res)=>{
  try{
  const  {bookingDetials,paymentId} =req.body
  console.log(paymentId,'payment')

console.log("heool")
const doctor = await User.findOne({_id:bookingDetials.doctor})
  const booking = await Booking.findOneAndUpdate({_id:bookingDetials._id},{$set:{paymentToDoctor:"paid",paymentIdfromAdmin:paymentId}})
console.log(booking,'bookingdetials@controller')
  res.status(StatusCodes.OK).json({booking,doctor})
  }catch(error){
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"})
  }
}

export { bookingHistory, getbookings, updateBooking, fetchbookingsAdmin,SeenAppoinment,notification,bookingDetials };
