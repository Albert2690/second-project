import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {

  const tokenFromRequest = req.body.userJwt;

  if (tokenFromRequest) {
    try {
      const decodedToken = jwt.verify(
        tokenFromRequest,
        process.env.JWT_SECRETKEY_USER
      );

      const requestUser = await User.findById(decodedToken.userId).select(
        "-password"
      );

      if (requestUser) {
        req.user = requestUser;
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

export default authenticateUser;
