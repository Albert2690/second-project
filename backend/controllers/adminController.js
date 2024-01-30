import User from "../models/userModel.js";
import generateAdmintoken from "../utils/jwtconfig/adminjwt/genarateAdminToken.js";
import destroyToken from "../utils/jwtconfig/adminjwt/destroytoken.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminDetials = await User.findOne({ email: email });
    if (adminDetials) {
      if (adminDetials.role === "admin") {
        const result = await adminDetials.matchPassword(
          password,
          adminDetials.password
        );
        if (result) {
          const resultt = generateAdmintoken(res, adminDetials._id);

          res
            .status(200)
            .json({
              name: adminDetials.name,
              email: adminDetials.email,
              adminJwt: resultt,
              adminId:adminDetials._id,
              success: true,
            });
        } else {
          res.status(401).json({ message: "Password is Incorrect" });
        }
      } else {
        return res.status(401).json({ message: "Sorry Authentication Failed" });
      }
    } else {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const updateUser = await User.findOne({ _id: userId });
    if (updateUser.is_blocked === 0) {
      await User.findOneAndUpdate({ _id: userId }, { $set: { is_blocked: 1 } });

      res.status(200).json({ message: "updated" });
    } else {
      await User.findOneAndUpdate({ _id: userId }, { $set: { is_blocked: 0 } });

      res.status(200).json({ message: "updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $eq: "user" } });
 
    if (users) {
      return res.status(200).json({ users, success: true });
    } else {
      return res.status(404).json({ message: "No Users Found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Interal Server Error" });
  }
};
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: { $eq: "doctor" } });

    if (doctors) {
      return res.status(200).json({ doctors, success: true });
    } else {
      return res.status(404).json({ message: "No doctors Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interal Server Error" });
  }
};

const adminLogout = async (req, res) => {
 
  try {
    destroyToken(res);
   
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login, blockUser, getUsers, getDoctors, adminLogout };
