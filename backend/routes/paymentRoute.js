import express from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { payment, webhooks } from "../controller/paymentController.js";
const router = express.Router();
router.post("/checkout",verifyToken,payment)
router.post("/webhook",webhooks) //api/webhook
export default router;