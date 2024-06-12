import express from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { addToCart,countAddToCart ,cartView,deleteProduct} from "../controller/cartController.js";
const router = express.Router();
router.post("/addtocart",verifyToken,addToCart);
router.get("/getcountaddtocart",verifyToken,countAddToCart);
router.get("/cartview",verifyToken,cartView)
router.delete("/deleteproduct/:productId",deleteProduct)

export default router;