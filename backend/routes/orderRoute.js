import express from "express";
import { order,allOrders } from "../controller/orderController.js";
import {verifyToken} from "../middleware/verifyToken.js"
const router = express.Router();
router.get("/orderList",verifyToken,order);
router.get("/all-orders",verifyToken,allOrders)

export default router;