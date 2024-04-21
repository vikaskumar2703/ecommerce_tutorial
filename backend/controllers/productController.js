import Product from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";

//create product
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
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in product creation",
      error,
    });
  }
};

//get product
export const getProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: "Product listed successfully",
      products,
      productsCount: products.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting all products",
      error: error.message,
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const products = await Product.find({ slug: req.params.slug }).select(
      "-photo"
    );

    res.status(201).send({
      success: true,
      message: "Single Product listed successfully",
      products,
      productsCount: products.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting single products",
      error: error.message,
    });
  }
};

//get product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(201).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        { success: false, message: "Error in getting product photo" },
        error
      );
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(201).send({
      success: true,
      message: "Single Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in deleting product", error });
  }
};

//update product controller
export const updateProductController = async (req, res) => {
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
    const product = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo && product) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in product updation",
      error,
    });
  }
};
