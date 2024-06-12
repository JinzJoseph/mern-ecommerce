import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadproduct,getProducts,updateProduct ,deleteProduct,categoryproduct,getCategoryWiseProducts,getSingleProduct,searchProducts} from "../controller/productContoller.js";

const router = express.Router();
router.post("/uploadproduct",verifyToken,uploadproduct)
router.get("/getproducts",getProducts)
router.put("/updateProduct/:productId",verifyToken,updateProduct)
router.delete("/deleteproduct/:productId",verifyToken,deleteProduct);
router.get("/getcategoryproduct",categoryproduct)
router.get("/getcategortywiseproduct/:category",getCategoryWiseProducts);
router.get("/getproduct/:productId",getSingleProduct);
router.get("/searchproduct/:searchQuery",searchProducts)
export default router;