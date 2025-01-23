import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./database/db.js";

// console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);
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
