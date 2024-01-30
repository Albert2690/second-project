import jwt from 'jsonwebtoken'

const destroyToken = (res)=>{
    const jwtToken = null
    const cookieOption={
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        samesite:'strict',
        maxAge: new Date(0)
    }
    res.cookie('adminJwt',jwtToken,cookieOption)
}


export default destroyToken