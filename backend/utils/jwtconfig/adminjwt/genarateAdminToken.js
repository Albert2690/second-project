import  jwt from 'jsonwebtoken'

const generateAdmintoken = (res,adminId)=>{
    const jwtToken = jwt.sign({adminId},process.env.JWT_SECRETKEY_ADMIN,{
        expiresIn:process.env.JWT_TOKEN_DURATION,
    })
   
    const cookieOption ={
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        samesite:'strict',
        maxAge:30*24*60*60*1000
    }
    res.cookie("adminJwt",jwtToken,cookieOption)
    return jwtToken
}
export default generateAdmintoken