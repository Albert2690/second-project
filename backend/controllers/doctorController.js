import User from "../models/userModel.js";
import generateDoctortoken from "../utils/jwtconfig/Doctorjwtconfig/generateDoctorToken.js";
import generateOTP from "../utils/generateOtp.js";
import sendEmail from "../utils/nodemailer.js";
import StatusCodes from "../utils/statusCodes.js";
import Message from "../models/messageModel.js";
const approveDoctor = async(req,res)=>{
    try{
        
        const doctorId = req.body.userId
        const doctor = await User.findOne({_id:doctorId})
        if(doctor.status==='pending'){
            doctor.status = 'Approved'
            await doctor.save()
            res.status(200).json({message:"Approved Successfully",success:true})
        }else{
            res.status(404).json({message:"Doctor Not found"})
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

const blockDoctor = async(req,res)=>{
    try {
        const doctorId = req.body.userId
        
        const updatedoctor = await User.findOne({_id:doctorId})
        if(updatedoctor.is_blocked===0){
            await User.findOneAndUpdate({_id:doctorId},{$set:{is_blocked:1}})
           
            res.status(200).json({message:"updated"})
        }
        else {
            await User.findOneAndUpdate({_id:doctorId},{$set:{is_blocked:0}})
           
            res.status(200).json({message:"updated"})

        }

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}


const Login = async(req,res)=>{
    try{
        const {email,password}= req.body
       
        const doctor = await User.findOne({email:email,role:'doctor'})
        
        if(doctor){
            const doctorId = doctor._id
            const authdoctor = doctor.matchPassword (password,doctor.password)
            if(authdoctor){
            
                const jwtoken =   generateDoctortoken(res,doctorId)
               
                
                const result ={
                    name:doctor.name,
                    email:doctor.email,
                    doctorJwt:jwtoken,
                    doctorId
                }
                res.status(200).json({result})
            
            }else{
                res.status(401).json({message:"Invalid Email or Password"})
            }
        }else{
           
            res.status(404).json({message:'Doctor Not Found'})
        }
    }catch(error){
        res.status(500).json({message:"Internal server Error"})
    }
}

const getDoctor = async (req,res)=>{
    try{
      const doctor= req.doctor
      res.status(200).json({doctor:doctor})
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
const updateTime = async(req,res)=>{
    try{
       const {_id}= req.doctor._id
       const selectedSlots = req.body.chosen
       const doctor = await User.findOneAndUpdate({_id:_id},{$set:{timeSlots:selectedSlots}})
       if(doctor){
        res.status(200).json({message:"Updated successfully",success:true})
       }
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updateProfile = async(req,res)=>{
    try{
       const {_id} = req.doctor
     
       const doctor = await User.findOne({_id:_id,role:'doctor'})
       const {name,email,mobile,fee,age,gender,bio,specialization,qualification,experience,about} = req.body.doctor
        const photo = req.body.image?req.body.image:doctor.image
        const certificate  =req.body.certificate? req.body.certificate:doctor.certificate
      
       const doctorDetials = await User.findOneAndUpdate({_id:_id},
        {$set:{name:name,email:email,fee:fee,


        mobile:mobile,specialization:specialization,

        qualification:qualification,experience:experience,bio:bio,

        gender:gender,age:age,about:about,image:photo,certificate:certificate
    }})
    if(doctorDetials){
        res.status(200).json({message:"Profile updated successfully",success:true})
    }

    }catch(error){
        res.status(500).json({message:"Internal server Error"})
    }
}
const otplogin = async(req,res)=>{
    try{
   const {email}= req.body
   
   const doctor = await User.findOne({email:email,role: 'doctor'})
   if(doctor){
       const otp =  generateOTP()
       const subject = 'Medicare Login'
       const text = `This is your otp for medicare account login ${otp} and you are an idiot🐒🐒 `
      const result = sendEmail(email,subject,text)
      if(result){
        res.status(200).json({message:"Email sent Successfully",success:true,otp})
      }else{
        res.status(403).json({message:"Email  sending failed"})
      }
   }else{
    res.status(404).json({message:"doctor not found"}) 
   }
    }catch(error){
        res.status(500).json({message:"Internal server Error"})
    }
}
const getUser = async (req, res) => {
    try {
  
     console.log(req.body.chatId,'chatId')
      const messages = await Message.find({chatId:req.body.chatId,is_seen:false})
      console.log(messages,'@messagea')
      const user = await User.findOne({_id:req.body.userId})
  
     if(user){
     }
  
      res.status(StatusCodes.OK).json({ user: user,messages });
    } catch (error) {
      res.status(500).json({ message: "Internal server Error" });
    }
  };

const doctorotpverify = async (req,res)=>{
    try{

    const {otp,formotp,email}= req.body
    if(otp!==formotp){
       return res.status(401).json({message:"Entered Code is incorrect"})
        
    }else{
        const user = await User.findOne({email:email,role:'doctor'})
        if(user){
            const jwtoken =   generateDoctortoken(res,user._id)
                const result ={
                    name:user.name,
                    email:user.email,
                    doctorJwt:jwtoken
                }
                res.status(200).json({result,success:true})
        }else{
            res.status(404).json({message:"User not Found"})
        }
    }
    }catch(error){
        res.status(500).json({message:"Internal Server Error "})
    }
}
export {approveDoctor,blockDoctor,Login,getDoctor,updateProfile,updateTime,getUser,otplogin,doctorotpverify}