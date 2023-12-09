const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, resp) => {
  try {
    const brands = await Brand.find({});
    resp.status(200).json(brands);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.createBrand = async (req, resp) => {
  const brand = new Brand(req.body);
  try {
    const brands = await brand.save();
    resp.status(200).json(brands);
  } catch (err) {
    resp.status(400).json(err);
  }
};
