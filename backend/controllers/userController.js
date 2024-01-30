import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateUserToken from "../utils/jwtconfig/userJwtConfig/generateUsertoken.js";
import destroyToken from "../utils/jwtconfig/userJwtConfig/destroyToken.js";
import generateOTP from "../utils/generateOtp.js";
import sendEmail from "../utils/nodemailer.js";
import Booking from "../models/bookingModel.js";
import StatusCodes from "../utils/statusCodes.js";
import Chat from '../models/chatmodel.js'

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email: email, role: "user" });

    if (user) {
      const userId = user._id;
      const authuser = user.matchPassword(password, user.password);
      if (authuser) {
        const jwtoken = generateUserToken(res, userId);
        const result = {
          name: user.name,
          email: user.email,
          userJwt: jwtoken,
          userId
        };
        res.status(StatusCodes.OK).json({ result });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email or password is incorrect" });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
  } catch (error) {
   
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
  }
};

const register = async (req, res) => {
  try {
   
    let { name, email, password, role, mobile } = req.body;

    const userdetials = await User.findOne({ email: email });
    if (userdetials) {
      return res
        .status(409)
        .json({ message: "Email Already Registered", error: true });
    }
    const userinfo = await User.findOne({ mobile: mobile });
    if (userinfo) {
      return res
        .status(409)
        .json({ message: "Mobile Number Already Registerd", error: true });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role,
      is_blocked: 0,
      mobile: mobile,
      age: 0,
      gender: "",
      bloodgroup: "",
      specialization: "",
      fee: 0,
      bio: "",
      about: "",
      image: "",
      certificate: "",
    });

    if (user) {
      const registeredUser = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(201).json({ registeredUser, success: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occured" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;


    res.status(StatusCodes.OK).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, mobile, age, bloodgroup, gender } = req.body.user;
    const id = req.user._id;
    const image = req.body.userImage ? req.body.userImage : req.user.image;

    const userUpdate = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          email: email,
          mobile: mobile,
          bloodgroup: bloodgroup,
          gender: gender,
          age: age,
          image: image,
        },
      }
    );

    if (userUpdate) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ message: "Error occured while updating" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {

    destroyToken(res);
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal sever Error Occured" });
  }
};
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
      is_blocked: 0,
      status: "Approved",
    });

    res.status(200).json({ doctors: doctors });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getbookingsUser = async(req,res)=>{
  try{
    const bookings = await Booking.find()
    res.status(StatusCodes.OK).json({bookings})
  }catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"})
  }
}
const DoctorDetials = async (req, res) => {
  try {
    const { id } = req.body;
    const doctor = await User.findOne({ _id: id });
    const availabletimeslots = doctor.timeSlots.map(
      (element) => element.slots.filter((item) => item.is_booked === false) // Use === instead of '==='
    );

  
    if (doctor) {
      res.status(200).json({ success: true, availabletimeslots, doctor });
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const otplogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email, role: "user" });
    if (user) {
      const otp = generateOTP();
      const subject = "Medicare Login";
      const text = `This is your otp for medicare account login ${otp}`;
      const result = sendEmail(email, subject, text);
      if (result) {
        res
          .status(200)
          .json({ message: "Email sent Successfully", success: true, otp });
      } else {
        res.status(400).json({ message: "Email is not sending failed" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

const otpverify = async (req, res) => {
  try {

    const { otp, formotp, email } = req.body;
    if (otp !== formotp) {
      return res.status(401).json({ message: "Entered Code is incorrect" });
    } else {
      const user = await User.findOne({ email: email, role: "user" });
      if (user) {
        const jwtoken = generateUserToken(res, user._id);
        const result = {
          name: user.name,
          email: user.email,
          userJwt: jwtoken,
        };
        res.status(200).json({ result, success: true });
      } else {
        res.status(404).json({ message: "User not Found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};
const bookingSlot = async (req, res) => {
  try {
    const { _id } = req.user;
    const doctorid = req.body.bookingDetials.doctor;
    const fee = req.body.bookingDetials.fee;
    const profit = 200;
    const date = req.body.bookingDetials.date;
    const time = req.body.bookingDetials.time;
    const paymentID = req.body.paymentId;
   
 

   const alreadyTakenSlot = await Booking.find({doctor:req.body.doctor})
   if(alreadyTakenSlot){
   const TakenDate=  alreadyTakenSlot.find((item)=>item.timeSlot.date===req.body.date&&item.timeSlot.time===req.body.time)
  if (TakenDate){
   return res.status(StatusCodes.CONFLICT).json({message:"Oops.! an unexpected error occur"})
   }
    }


    const doctor = await User.findOne({
      _id: doctorid._id,
      "timeSlots.date": date,
      "timeSlots.slots.time": time,
    });
if(doctor){
  const currentTimeSlot=doctor.timeSlots.find((item)=>item.date==date)
  const times=currentTimeSlot.slots.find((item)=>item.time===time)
  times.is_booked=true
  await doctor.save()
}
 
    
  
    const existingBooking = await Booking.findOne({ paymentIdfromUser: paymentID });
    if (!existingBooking) {
      const newbooking = await Booking.create({
        user: _id,
        doctor: doctorid,
        profit: profit,
        total: profit + fee,
        timeSlot: {
          date: date,
          slot: time,
        }, 
        paymentIdfromUser: paymentID,
        userPayment: "paid",
      });
      if (newbooking) {
        const existingChat = await Chat.findOne({ members: { $all: [_id.toString(), doctorid._id] } });
    
        if(!existingChat){
          const newchat  = await Chat.create({
            members:[doctorid._id,_id.toString()]
        })
        }
        res
          .status(201)
          .json({ message: "Booking Completed successfullly", success: true });
      } else {
        res.status(403).json({ message: "Booking Cannot be completed" });
      }
    } else {
      res.status(403).json({ message: "Booking Cannot be completed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  login,
  register,
  logout,
  updateProfile,
  getProfile,
  getDoctors,
  DoctorDetials,
  otplogin,
  bookingSlot,
  otpverify,
  getbookingsUser
};
