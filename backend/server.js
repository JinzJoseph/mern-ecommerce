import express from "express";
import connectDB from "./config/db.js"; // Assuming db.js is located in the config folder
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import addTocartRoute from "./routes/addTocartRoute.js"
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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

dotenv.config();
connectDB();

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",addTocartRoute)
// app.use("/api/comment",commentRoute)