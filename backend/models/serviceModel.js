import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
   
    name:{ 
        type:String,
        require:true,
    
    },
    description:{
        type:String,
        require:true
    },
    is_listed:{
        type:Boolean,
        default:true
    }
})


const Service = mongoose.model('service',serviceSchema)

export default Service 