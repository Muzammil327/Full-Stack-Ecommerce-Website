import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      serverSelectionTimeoutMS: 10000, // Timeout after 5 seconds if server selection fails
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Handle SIGINT (Ctrl+C) gracefully
    process.on("SIGINT", async () => {
      await mongoose.disconnect();
      console.log("MongoDB disconnected through app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
