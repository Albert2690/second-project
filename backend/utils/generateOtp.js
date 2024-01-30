import otpGenerator from 'otp-generator'

// Generate a 6-digit OTP
const generateOTP = () => {
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    return otp;
};

export default generateOTP
