import User from "../models/userModel.js";
import StatusCodes from "../utils/statusCodes.js";
const is_blocked = async (req,res,next)=>{
    try{
  const {_id} = req.user
  const authenticatedUser = await User.findOne({_id:_id,is_blocked:0})
  if(authenticatedUser){
    next()
  }else{
   res.status(StatusCodes.UNAUTHORIZED).json({message:"Authentication Failed...!",error:true})
  }
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error",error:true})
    }
}

export default is_blocked