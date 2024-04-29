import express from "express";
import { isAdmin, validateToken } from "../middleware/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  filterProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  searchProductController,
  similarProductController,
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

// get single product
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

router.post("/product-filters", filterProductController);

// search product
router.get("/search-product/:keyword", searchProductController);

//get similar products
router.get("/similar-products/:cid/:pid", similarProductController);

router.get("/client-token", validateToken, braintreeTokenController);

router.post("/checkout", validateToken, braintreePaymentController);

export default router;
