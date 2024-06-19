import mongoose from "mongoose";
import Product from "./productModel.js";
import User from "./userModels.js";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Shipping", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
