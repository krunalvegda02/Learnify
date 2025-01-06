import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      `\n MOngoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (e) {
    console.log("Database connectivity error:", e);
    process.exit(1);
  }
};

export default connectDB;
