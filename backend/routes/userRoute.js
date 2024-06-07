import express from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { getUsers,updateUser } from "../controller/userController.js";
const router = express.Router();

router.get("/getallusers",verifyToken,getUsers),
router.put("/update/:userId",verifyToken,updateUser)
export default router;