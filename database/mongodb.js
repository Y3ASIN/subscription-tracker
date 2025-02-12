import mongoose from "mongoose";
import { DB_URI } from "../config/env";

// const DB_URI = process.env.DB_URI;
// console.log(Bun.env.DB_URI);

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to database.");
  } catch (error) {
    console.log("Error connecting to database!", error);
    process.exit(1);
  }
};

export default connectToDB;
