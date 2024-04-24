import express from "express";
import { isAdmin, validateToken } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product
router.post(
  "/create-product",
  validateToken,
  isAdmin,
  formidable(),
  createProductController
);

// get all product
router.get("/get-product", getProductController);

// get all product
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product
router.put(
  "/update-product/:pid",
  validateToken,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
