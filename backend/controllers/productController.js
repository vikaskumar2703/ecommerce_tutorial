import Product from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (
      !name ||
      !quantity ||
      !description ||
      !price ||
      !category ||
      !shipping
    ) {
      return res.status(500).send({ message: "All fields are mandatory!" });
    }
    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo && product) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res
      .status(201)
      .send({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in registration",
      error,
    });
  }
};
