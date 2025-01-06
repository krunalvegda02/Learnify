import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/database/db.js";

dotenv.config({
  path: "./.env",
});

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
