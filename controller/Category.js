const { Category } = require("../model/Category");

exports.fetchCategories = async (req, resp) => {
  try {
    const categories = await Category.find({});
    resp.status(200).json(categories);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.createCategory = async (req, resp) => {
  const category = new Category(req.body);
  try {
    const categories = await category.save();
    resp.status(200).json(categories);
  } catch (err) {
    resp.status(400).json(err);
  }
};
