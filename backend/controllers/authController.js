import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/authUtils.js";
import Order from "../models/orderModels.js";

//@desc Register a user
//@route POST /api/v1/auth/register
//@access public
export const registerController = async (req, res) => {
  try {
    const { name, email, pass, phone, address, answer } = req.body;

    // Validate fields in user input
    if (!name || !email || !pass || !phone || !address || !answer) {
      return res.send({ message: "All fields are mandatory!" });
    }
    // Check for an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: " User already Exists",
      });
    }
    const hashedPassword = await hashPassword(pass);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    if (user) {
      return res.status(201).send({
        success: true,
        message: "User registered successfully",
        user,
      });
    } else {
      return res.status(400).send({
        success: true,
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in registration",
      error,
    });
  }
};

// @desc login a user
// @route POST /api/v1/auth/login
// @access public
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }
    const user = await User.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      //if authentication successful , use jwt to send a signed token to user that can be used to authenticate further user requests
      //parts of JWT - user header , "payload ", signature by server
      //create a signed token ; requirements : payload as object , secret key , expiry time
      const token = jwt.sign(
        {
          username: user.name,
          _id: user._id,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      return res.status(201).send({
        success: true,
        message: "Login successfull",
        user,
        token,
      });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "User or password does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while logging",
      error,
    });
  }
};

// @desc forgot password controller
// @route POST /api/v1/auth/forgot-password
// @access public
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "wrong email or answer" });
    }
    const hashedPassword = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while reseting password",
      error,
    });
  }
};

// @desc test controller
// @route POST /api/v1/auth/test
// @access private - admin only
export const testController = async (req, res) => {
  res.status(201).send({
    message:
      "Token validated successfully + Protected Route can be accessed by admin with token",
  });
};

// @desc get order controller
// @route GET /api/auth/orders
// @access private - user only

export const getOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// @desc get all orders controller
// @route GET /api/auth/all-orders
// @access private - admin only

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders orders",
      error,
    });
  }
};
