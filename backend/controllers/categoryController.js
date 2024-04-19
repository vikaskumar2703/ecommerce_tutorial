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
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Category updated succeesfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: " Error in updating category",
      error,
    });
  }
};

//get all category
export const getCategoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(201).send({
      success: true,
      message: "Category listed succeesfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: " Error in getting all category",
      error,
    });
  }
};

//get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(400).send({
        success: false,
        message: " Category not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Single Category listed successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: " Error in getting single category",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete(id);
    if (!category) {
      return res.status(400).send({
        success: false,
        message: " Category not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Category Deleted successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: " Error in deleting single category",
      error,
    });
  }
};
