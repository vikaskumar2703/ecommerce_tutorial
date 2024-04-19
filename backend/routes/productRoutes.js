import express from "express";
import { isAdmin, validateToken } from "../middleware/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
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

//   router.put(
//     "/update-product/:id",
//     validateToken,
//     isAdmin,
//     updateProductController
//   );

//   router.get("/get-product", getProductController);

//   router.get("/single-product/:slug", singleProductController);

//   router.delete(
//     "/delete-product/:id",
//     validateToken,
//     isAdmin,
//     deleteProductController
//   );

export default router;
