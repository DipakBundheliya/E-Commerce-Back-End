const Product = require("../model/Product");

exports.createProduct = async (req, resp) => {
  const product = new Product(req.body);
  try {
    const data = await product.save();
    resp.status(201).json(data);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.fetchProductsByFilter = async (req, resp) => {
  let condition = {}; // this used for filter deleted product for user& not in case of admin

  if (!req.query.admin) {
    condition = { deleted: { $ne: true } };
  }

  let query = Product.find(condition);
  let totalProductQuery = Product.find(condition);

  // logic from video

  //  we have to try with multiple categories

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductQuery = totalProductQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductQuery = totalProductQuery.find({ brand: req.query.brand });
  }
  // we have to do sort based on discounted price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductQuery = totalProductQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }

  const totalDocs = await totalProductQuery.countDocuments();

  if (req.query._page && req.query._limit) {
    const pageNum = req.query._page;
    const pageLimit = req.query._limit;
    query = query.skip(pageLimit * (pageNum - 1)).limit(pageLimit);
  }

  try {
    const doc = await query.exec();
    resp.set("X-Total-Count", totalDocs);
    resp.status(201).json(doc);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.fetchProductById = async (req, resp) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    resp.status(200).json(product);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.updateProduct = async (req, resp) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    resp.status(200).json(product);
  } catch (err) {
    resp.status(400).json(err);
  }
};
