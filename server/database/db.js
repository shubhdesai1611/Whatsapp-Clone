import mongoose from "mongoose";
import dotenv from "dotenv";

// initializing dotenv
dotenv.config();

//dotenv usage
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@clone-whatsapp.7adeilo.mongodb.net/?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`DATABASE CONNECTION ERROR: ${error.message}`);
  }
};

export default Connection;
