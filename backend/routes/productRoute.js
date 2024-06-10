import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadproduct,getProducts,updateProduct ,deleteProduct,categoryproduct} from "../controller/productContoller.js";

const router = express.Router();
router.post("/uploadproduct",verifyToken,uploadproduct)
router.get("/getproducts",getProducts)
router.put("/updateProduct/:productId",verifyToken,updateProduct)
router.delete("/deleteproduct/:productId",verifyToken,deleteProduct);
router.get("/getcategoryproduct",categoryproduct)
export default router;