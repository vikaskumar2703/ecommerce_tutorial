import Product from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
import Order from "../models/orderModels.js";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

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

//get products
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
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(201).send({
      success: true,
      message: "Single Product listed successfully",
      product,
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

// filter products
export const filterProductController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length) {
      args.category = checked;
    }
    const products = await Product.find(args);
    res.status(201).send({
      success: true,
      message: "Filter products listed successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in filtering of products",
      error,
    });
  }
};

//search Product controller
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in searching of products",
      error,
    });
  }
};

// get similar products
export const similarProductController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(201).send({
      success: true,
      message: "Similar Products listed successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in filtering of products",
      error,
    });
  }
};

// generate a  braintree client token

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).send(response);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in generating transaction token ",
      error,
    });
  }
};

// make transaction controller

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in checkout ",
      error,
    });
  }
};
