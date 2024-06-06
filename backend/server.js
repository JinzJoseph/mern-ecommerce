import express from "express";
import connectDB from "./config/db.js"; // Assuming db.js is located in the config folder
// import authRoute from "./routes/authRoute.js"
// import userRoute from "./routes/userRoute.js";
// import postRoute from "./routes/postRoute.js";
// import commentRoute from "./routes/commentRoute.js"
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();
connectDB();

// app.use("/api/user",userRoute)
// app.use("/api/auth",authRoute)
// app.use("/api/post",postRoute)
// app.use("/api/comment",commentRoute)