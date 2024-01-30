import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
  try {
    const connection =  await mongoose.connect(process.env.MONGODB)
 console.log('hii')
    console.log(`MongoDB connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.log('hiiu')
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDb;
