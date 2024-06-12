import express from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { addToCart,countaddToCart } from "../controller/cartController.js";
const router = express.Router();
router.post("/addtocart",verifyToken,addToCart);
router.get("/getcountaddtocart",verifyToken,countaddToCart)

export default router;