import mongoose from "mongoose";


const bookingSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    profit:{
        type:Number
    },
    paymentIdfromUser:{
        type:String
    },
    paymentIdfromAdmin:{
        type:String

    },
    total:{
        type:Number
    },
    timeSlot:{
        date:{
            type:String
        },
        slot:{
            type:String
        }
    },
    is_cancelled:{
        type:Boolean,
        default:false
    },
    is_seen:{
        type:Boolean
       
    },
    status:{
        type:String,
        default:'pending'
    },
    userPayment:{
        type:String
    },
    paymentToDoctor:{
        type:String,
        default:"pending"
    }
})

const Booking = mongoose.model('booking',bookingSchema)

export default Booking