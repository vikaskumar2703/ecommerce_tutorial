import Category from "../models/categoryModels.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Category name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: " Category already Exists",
      });
    }
    const category = await Category.create({ name, slug: slugify(name) });
    res
      .status(201)
      .send({ success: true, message: "Category has been created", category });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: " Error in registration",
      error,
    });
  }
};

// upadte category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate({
      name,
      slug: slugify(name),
    });
    res
      .status(201)
      .send({ success: true, message: "Category has been created", category });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: " Error in updating category",
      error,
    });
  }
};
