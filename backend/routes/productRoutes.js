import express from "express";
import { isAdmin, validateToken } from "../middleware/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  validateToken,
  isAdmin,
  formidable(),
  createProductController
);

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
