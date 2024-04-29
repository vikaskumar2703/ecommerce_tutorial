import mongoose from "mongoose";
import Product from "./productModel";

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectID,
      ref: Product,
    },
  ],
  payment: {},
  buyer: {
    type: mongoose.ObjectID,
    ref: User,
  },
  status: {
    type: String,
    default: "Not Processed",
    enum: ["Not Processed", "Shipping", "Delivered", "Cancel"],
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
