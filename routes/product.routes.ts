import express from "express";
const router = express.Router();

import {
  addProduct,
  getProductDetails,
  getProductLists,
  updatedProduct,
  deleteProduct,
} from "../controllers/product.controller";
import permissionAuthentication from "../middleware/permission";

// ALL user ROUTES
router.get("/:id", permissionAuthentication("view"), getProductDetails);
router.get("/", permissionAuthentication("view"), getProductLists);
router.post("/add", permissionAuthentication("add"), addProduct);
router.put("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

export default router;
