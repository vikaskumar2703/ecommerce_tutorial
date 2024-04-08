import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("bearer")) {
      token = authHeader.split(" ")[1];
      // console.log(`Token :${token}`);
    }
    const decodedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedPayload;
    // console.log(decodedPayload);
    next();
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in token validation",
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user.email);
    const user = await User.findOne({
      email: req.user.email,
    });
    // console.log(user);
    if (user && user.role == 1) {
      // console.log("reached here");
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "unauthorized access admin",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in admin validation",
      error,
    });
  }
};
