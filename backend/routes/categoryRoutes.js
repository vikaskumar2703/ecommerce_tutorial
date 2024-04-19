import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, validateToken } from "../middleware/authMiddleware.js";
//Create a router object ; It provides a way to group related routes together and define middleware for those routes separately

const router = express.Router();

router.post(
  "/create-category",
  validateToken,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  validateToken,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", getCategoryController);

router.get("/single-category/:slug", singleCategoryController);

router.delete(
  "/delete-category/:id",
  validateToken,
  isAdmin,
  deleteCategoryController
);

export default router;
