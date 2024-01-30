import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    is_blocked: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
    image: {
      type: String,
    },
    qualification: [
      {
        degree: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        university: {
          type: String,
        },
      },
    ],
    experience: [
      {
        position: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        hospital: {
          type: String,
        },
      },
    ],
    certificate: {
      type: String,
    },
    timeSlots: [
      {
        date: {
          type: String,
        },
        slots: [
          {
            time: {
              type: String,
            },
            is_booked: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    fee: {
      type: Number,
    },
    age: {
      type: Number,
    },
    bloodgroup: {
      type: String,
    },
    gender: {
      type: String,
    },
    specialization: {
      type: String,
    },
    bio: {
      type: String,
    },
    about: {
      type: String,
    },
  },
 
  {
    // =========This will automatically add timestamps after each modifications ========
    timestamps: true,
  }
);

// ========== Here the hashing password occurs==========
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    // It wil Skip if the password is not changed and  move to the next middleware
  }
  const salt = await bcrypt.genSalt(10);
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, salt);
});

// ====== This  is for When user login it will check whether the user is authenticated or not by the passwords============
userSchema.methods.matchPassword = async (userPassword, Cpassword) => {
  console.log(userPassword);

  const validPassword = await bcrypt.compare(userPassword, Cpassword);

  return validPassword;
};

const User = mongoose.model("user", userSchema);

export default User;
