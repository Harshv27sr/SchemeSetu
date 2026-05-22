import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/schemesetu');
    console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Mongoose Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
