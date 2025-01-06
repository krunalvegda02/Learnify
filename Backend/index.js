import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";

dotenv.config({
  path: "./.env",
});

const app = express();

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connnection failed: ", error);
  });
