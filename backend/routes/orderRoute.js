import express from "express";
import { order } from "../controller/orderController.js";
import {verifyToken} from "../middleware/verifyToken.js"
const router = express.Router();
router.get("/orderList",verifyToken,order)

export default router;