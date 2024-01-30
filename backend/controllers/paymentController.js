import { format } from "date-fns";
import stripeModule from "stripe"; 
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import StatusCodes from "../utils/statusCodes.js";

const stripe = stripeModule(process.env.SECRET_KEY);

const paymentInitiated = async (req, res) => {

  try {
  

    const alreadyTakenSlot = await Booking.find({doctor:req.body.doctor})
    if(alreadyTakenSlot){
    const TakenDate=  alreadyTakenSlot.find((item)=>item.timeSlot.date===req.body.date && item.timeSlot.slot===req.body.time)
   if (TakenDate){
    res.status(StatusCodes.CONFLICT).json({message:"Oops.! an unexpected error occur"})
    }
     
    }

    const doctor = await User.findOne({_id:req.body.doctor,role:'doctor'})
    if(doctor){

    
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "INR",
                  product_data: {
                    name: `Dr.${doctor.name}`,
                    description: `At ${req.body.slot} on ${req.body.date}`,
                  },
                  unit_amount: req.body.fee * 100,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            billing_address_collection: 'required', 
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
          });
          


    res.send({ url: session.url,success:true });
}else{
    res.status(404).json({message:"Doctor not found"})
}
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Internal Server Error" });
  }
};


const paymentInitiatedTodoctor = async (req, res) => {

  try {
    console.log(req.body,'controller')
 const {booking} = req.body
 console.log("helloo at here")


    if(booking.doctor){

    console.log("doctorr")
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "INR",
                  product_data: {
                    name: `To Dr.${booking.doctor.name}`,
                    description: `for payment At ${booking.timeSlot.slot} on ${booking.timeSlot.date}`,
                  },
                  unit_amount: booking.doctor.fee * 100,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            billing_address_collection: 'required', 
            success_url: `${process.env.CLIENT_URL}/admin/payment-successDoctor?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/admin/payment-failed`,
          });
          
console.log(session.url)

    res.send({ url: session.url,success:true });
}else{
    res.status(404).json({message:"Doctor not found"})
}
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const sessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
 
  
    res.send({
      status: session.status,
      paymentId:session.id,
      customer_email: session.customer_details.email,
    });
  };

export { paymentInitiated,sessionStatus,paymentInitiatedTodoctor };
