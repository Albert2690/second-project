import  jwt from 'jsonwebtoken'

const generateDoctortoken = (res,doctorId)=>{
    const jwtToken = jwt.sign({doctorId},process.env.JWT_SECRETKEY_DOCTOR,{
        expiresIn:process.env.JWT_TOKEN_DURATION,
    })
    const cookieOption ={
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        samesite:'strict',
        maxAge:30*24*60*60*1000
    }

    res.cookie("doctorJwt",jwtToken,cookieOption)
    return jwtToken
}
export default generateDoctortoken