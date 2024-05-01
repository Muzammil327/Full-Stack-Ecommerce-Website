import mongoose from "mongoose";
mongoose.connection.setMaxListeners(20); // Increase the limit as needed

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL as string);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
