
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/mern-ecommerce');
    console.log("Mongodb connected ");
  } catch (error) {
    console.log("Mongodb Server Issue " + error);
  }
};

export default connectDB;
