import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
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

export default router;
