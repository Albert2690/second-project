import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authencticateAdmin = async (req, res, next) => {

  const tokenFromRequest = req.body.adminJwt;

  if (tokenFromRequest) {
    try {
      const decodedToken = jwt.verify(
        tokenFromRequest,
        process.env.JWT_SECRETKEY_DOCTOR
      );

      const requestUser = await User.findById(decodedToken.doctorId).select(
        "-password"
      );

      if (requestUser) {
        req.doctor = requestUser;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Authentication failed.Invalid Token" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Authentication Failed.No Token is Found" });
  }
};

export default authencticateAdmin;
