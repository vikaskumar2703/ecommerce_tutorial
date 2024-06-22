import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
  getOrdersController,
  getAllOrdersController,
} from "../controllers/authController.js";
import { isAdmin, validateToken } from "../middleware/authMiddleware.js";
//Create a router object ; It provides a way to group related routes together and define middleware for those routes separately
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/test", validateToken, isAdmin, testController);

router.get("/user-auth", validateToken, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", validateToken, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/orders", validateToken, getOrdersController);

router.get("/get-orders", validateToken, isAdmin, getAllOrdersController);

export default router;
