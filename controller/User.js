const { User } = require("../model/User");

exports.fetchUserById = async (req, resp) => {
  try {
    const users = await User.findById(
      req.params.id,
      "name email id role addresses orders"
    );
    resp.status(200).json(users);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.updateUser = async (req, resp) => {
  try {
    const product = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    resp.status(200).json(product);
  } catch (err) {
    resp.status(400).json(err);
  }
};
